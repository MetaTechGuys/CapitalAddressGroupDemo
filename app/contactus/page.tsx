"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import ContactDetails from "../components/ContactDetails/ContactDetails";
import ContactCover from "../components/ContactCover/ContactCover";
import ContactForm from "../components/ContactForm/ContactForm";
import CallInfo from "../components/CallInfo/CallInfo";
import Location from "../components/Location/Location";
import Footer from "../components/Footer/Footer";
import "../styles/page.scss";

// Define the form data interface
interface FormData {
  name: string;
  phone: string;
  email: string;
  description: string;
}

export default function ContactUs() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [activeContactId, setActiveContactId] = useState<number | undefined>(
    undefined
  );
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoize sectionIds to prevent re-creation on every render
  const sectionIds = useMemo(
    () => [
      "contact-details",
      "contact-cover",
      "contact-form",
      "call-info",
      "location",
      "footer",
    ],
    []
  );

  // Move goToSection BEFORE sections useMemo
  const goToSection = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= sectionIds.length ||
        index === currentSection ||
        isTransitioning
      ) {
        return;
      }

      if (isMobile) {
        setIsUserScrolling(true);
        const sectionElement = document.getElementById(sectionIds[index]);
        if (sectionElement) {
          setCurrentSection(index);
          sectionElement.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            setIsUserScrolling(false);
          }, 1000);
        }
      } else {
        setIsTransitioning(true);
        setCurrentSection(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }
    },
    [currentSection, isTransitioning, isMobile, sectionIds]
  );

  // Move handleContactClick BEFORE sections useMemo
  const handleContactClick = useCallback(
    (contactId: number, targetSection?: string) => {
      setActiveContactId(contactId);

      if (targetSection) {
        const targetIndex = sectionIds.findIndex((id) => id === targetSection);
        if (targetIndex !== -1) {
          goToSection(targetIndex);
        }
      }
    },
    [sectionIds, goToSection]
  );

  // Now define sections with the functions available
  const sections = useMemo(
    () => [
      {
        id: "contact-details",
        component: (
          <ContactDetails
            onContactClick={handleContactClick}
            activeContactId={activeContactId}
          />
        ),
        name: t("contact.title"),
      },
      {
        id: "contact-cover",
        component: <ContactCover />,
        name: "Contact Cover",
      },
      {
        id: "contact-form",
        component: (
          <ContactForm onBackToContactDetails={() => goToSection(0)} />
        ),
        name: t("form.title"),
      },
      {
        id: "call-info",
        component: <CallInfo onBackToContactDetails={() => goToSection(0)} />,
        name: "Call Info",
      },
      {
        id: "location",
        component: <Location onBackToContactDetails={() => goToSection(0)} />,
        name: t("location.title"),
      },
      { id: "footer", component: <Footer />, name: t("navbar.contact") },
    ],
    [t, activeContactId, handleContactClick, goToSection]
  );

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop scroll and keyboard events
  useEffect(() => {
    if (isMobile) return; // Skip desktop events on mobile

    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isTransitioning) return;

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 30 && currentSection < sections.length - 1) {
          goToSection(currentSection + 1);
        } else if (e.deltaY < -30 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (currentSection > 0) {
            goToSection(currentSection - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          goToSection(0);
          break;
        case "End":
          e.preventDefault();
          goToSection(sections.length - 1);
          break;
      }
    };

    // Touch events for desktop
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const timeDiff = touchEndTime - touchStartTime;
      const diff = touchStartY - touchEndY;

      if (timeDiff < 300 && Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < sections.length - 1) {
          goToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, sections.length, goToSection, isTransitioning, isMobile]);

  // Mobile scroll tracking with Intersection Observer
  useEffect(() => {
    if (!isMobile) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isUserScrolling) return; // Don't update during programmatic scroll

        // Find the entry with the largest intersection ratio
        let maxRatio = 0;
        let activeIndex = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const sectionId = entry.target.id;
            const index = sections.findIndex(
              (section) => section.id === sectionId
            );
            if (index !== -1) {
              activeIndex = index;
            }
          }
        });

        // Only update if we have a significant intersection
        if (maxRatio > 0.3 && activeIndex !== currentSection) {
          setCurrentSection(activeIndex);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Multiple thresholds for better detection
        rootMargin: "-10% 0px -10% 0px", // Reduce the effective viewport slightly
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile, sections, currentSection, isUserScrolling]);

  // Handle form submission with proper typing
  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    try {
      // Add your form submission logic here
      console.log("Contact form submitted:", formData);

      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      // You can add success handling here
      // For example, show a success message or redirect
    } catch (error) {
      console.error("Form submission error:", error);
      throw error; // Re-throw to let the form handle the error
    }
  };

  return (
    <div className={`fullpage-container ${isMobile ? "mobile-scroll" : ""}`}>
      {/* Sections Container */}
      <div
        className="sections-container"
        style={
          !isMobile
            ? {
                transform: `translateY(-${currentSection * 100}vh)`,
                transition: isTransitioning
                  ? "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
                  : "none",
              }
            : {}
        }
      >
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`fullpage-section ${
              index === currentSection ? "active" : ""
            } ${isMobile ? "mobile-section" : ""}`}
            data-section={index}
          >
            {/* Add form submission handler for ContactForm */}
            {section.id === "contact-form" ? (
              <ContactForm
                onSubmit={handleFormSubmit}
                onBackToContactDetails={() => goToSection(0)}
              />
            ) : (
              section.component
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
