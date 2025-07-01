"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import BlogDetails from "../components/BlogDetails/BlogDetails";
import BlogCover from "../components/BlogCover/BlogCover";
import BlogNews from "../components/BlogNews/BlogNews";
import Weblog from "../components/Weblog/Weblog";
import Footer from "../components/Footer/Footer";
import "../styles/page.scss";

export default function Blog() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState<number | undefined>(
    undefined
  );
  const { t } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoize sectionIds to prevent re-creation on every render
  const sectionIds = useMemo(
    () => [
      "blog-details",
      "blog-cover",
      "weblog",
      "blog-news",
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

  // Move handleBlogClick BEFORE sections useMemo
  const handleBlogClick = useCallback(
    (blogId: number, targetSection?: string) => {
      setActiveBlogId(blogId);

      if (targetSection) {
        const targetIndex = sectionIds.findIndex((id) => id === targetSection);
        if (targetIndex !== -1) {
          goToSection(targetIndex);
        }
      }
    },
    [sectionIds, goToSection]
  );

  // Handle slide click from BlogNews
  const handleSlideClick = useCallback((slideId: number) => {
    console.log("Blog slide clicked:", slideId);
    // You can add navigation logic here if needed
  }, []);

  // Handle slide click from Weblog
  const handleWeblogSlideClick = useCallback((slideId: number) => {
    console.log("Weblog slide clicked:", slideId);
    // You can add navigation logic here if needed
  }, []);

  // Add this callback function before the sections useMemo
  const handleBackToTop = useCallback(() => {
    console.log('Back to top called'); // Add this for debugging
    goToSection(0); // Navigate to the first section (blog-details)
  }, [goToSection]);

  // Now define sections with the functions available
  const sections = useMemo(
    () => [
      {
        id: "blog-details",
        component: (
          <BlogDetails
            onBlogClick={handleBlogClick}
            activeBlogId={activeBlogId}
          />
        ),
        name: t("blog.title"),
      },
      {
        id: "blog-cover",
        component: <BlogCover />,
        name: "Blog Cover",
      },
      {
        id: "blog-news",
        component: (
          <BlogNews
            onSlideClick={handleSlideClick}
            autoplayDelay={4000}
            onBackToTop={handleBackToTop} // Add this prop
          />
        ),
        name: t("blog.news.title"),
      },
      {
        id: "weblog",
        component: (
          <Weblog
            onSlideClick={handleWeblogSlideClick}
            autoplayDelay={4000}
            onBackToTop={handleBackToTop} // Add this prop
          />
        ),
        name: t("weblog.title"),
      },
      { 
        id: "footer", 
        component: <Footer />, 
        name: t("navbar.blog") 
      },
    ],
    [t, activeBlogId, handleBlogClick, handleSlideClick, handleWeblogSlideClick, handleBackToTop] // Add handleBackToTop to dependencies
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
            {section.component}
          </section>
        ))}
      </div>
    </div>
  );
}