"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  const { currentLanguage, setLanguage, t } = useLanguage();

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
    { code: "zh", name: "中文" },
    { code: "fa", name: "فارسی" },
  ] as const;

  // Navigation menu items with dropdowns
  const menuItems = [
    {
      id: "home",
      label: t("navbar.home"),
      href: "#",
      dropdown: [
        { label: t("navbar.dropdown.home.welcome"), href: "/" },
        { label: t("navbar.dropdown.home.latest_news"), href: "/blog" },
        {
          label: t("navbar.dropdown.home.featured_projects"),
          href: "/featured",
        },
        {
          label: t("navbar.dropdown.home.testimonials"),
          href: "/testimonials",
        },
      ],
    },
    {
      id: "about",
      label: t("navbar.about"),
      href: "#",
      dropdown: [
        { label: t("navbar.dropdown.about.our_story"), href: "/aboutus" },
        { label: t("navbar.dropdown.about.team"), href: "/about/team" },
        {
          label: t("navbar.dropdown.about.mission_vision"),
          href: "/about/mission",
        },
        { label: t("navbar.dropdown.about.careers"), href: "/about/careers" },
        { label: t("navbar.dropdown.about.awards"), href: "/about/awards" },
      ],
    },
    {
      id: "services",
      label: t("navbar.services"),
      href: "#",
      dropdown: [
        {
          label: t("navbar.dropdown.services.real_estate"),
          href: "/services",
        },
        {
          label: t("navbar.dropdown.services.property_management"),
          href: "/projects",
        },
        {
          label: t("navbar.dropdown.services.investment_advisory"),
          href: "/services/investment",
        },
        {
          label: t("navbar.dropdown.services.consulting"),
          href: "/services/consulting",
        },
        {
          label: t("navbar.dropdown.services.valuation"),
          href: "/services/valuation",
        },
      ],
    },
    {
      id: "contact",
      label: t("navbar.contact"),
      href: "#",
      dropdown: [
        { label: t("navbar.dropdown.contact.get_in_touch"), href: "/contactus" },
        {
          label: t("navbar.dropdown.contact.office_locations"),
          href: "/contact/locations",
        },
        {
          label: t("navbar.dropdown.contact.support"),
          href: "/contact/support",
        },
        {
          label: t("navbar.dropdown.contact.partnership"),
          href: "/contact/partnership",
        },
        {
          label: t("navbar.dropdown.contact.schedule_meeting"),
          href: "/contact/meeting",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
      document.body.className =
        savedTheme === "dark" ? "dark-theme" : "light-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close mobile dropdown when closing menu
    if (isMobileMenuOpen) {
      setMobileActiveDropdown(null);
    }
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const selectLanguage = (languageCode: "en" | "de" | "ar" | "zh" | "fa") => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const theme = newTheme ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = newTheme ? "dark-theme" : "light-theme";
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    console.log("Search query:", searchQuery);
    setIsSearchOpen(false);
  };

  // Desktop hover handlers
  const handleMouseEnter = (itemId: string) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Mobile click handlers
  const handleMobileItemClick = (e: React.MouseEvent, itemId: string) => {
    // Check if we're on mobile
    if (window.innerWidth < 768) {
      e.preventDefault();
      // Toggle dropdown for mobile
      setMobileActiveDropdown(mobileActiveDropdown === itemId ? null : itemId);
    } else {
      // On desktop, allow normal navigation
      return;
    }
  };

  const handleMobileDropdownLinkClick = () => {
    // Close mobile menu when clicking on dropdown link
    setIsMobileMenuOpen(false);
    setMobileActiveDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".navbar__language-dropdown")) {
        setIsLanguageDropdownOpen(false);
      }
      if (!target.closest(".navbar__item")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setMobileActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === currentLanguage) || languages[0]
    );
  };

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        isDarkTheme ? "dark" : "light"
      }`}
    >
      <div className="navbar__container">
        <Link href="/" className="navbar__logo">
          <Image
            src="/images/logo.webp"
            alt="Capital Address Group Logo"
            width={180}
            height={80}
            priority
          />
        </Link>

        <ul className={`navbar__menu ${isMobileMenuOpen ? "active" : ""}`}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="navbar__item"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className="navbar__link"
                onClick={(e) => handleMobileItemClick(e, item.id)}
              >
                {item.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  className="navbar__svg navbar__dropdown-arrow"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              <div
                className={`navbar__dropdown ${
                  activeDropdown === item.id ? "active" : ""
                } ${mobileActiveDropdown === item.id ? "mobile-active" : ""}`}
              >
                <div className="navbar__dropdown-content">
                  {item.dropdown.map((dropdownItem, index) => (
                    <Link
                      key={index}
                      href={dropdownItem.href}
                      className="navbar__dropdown-link"
                      onClick={handleMobileDropdownLinkClick}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Search Form */}
        <div className={`navbar__search ${isSearchOpen ? "active" : ""}`}>
          <form onSubmit={handleSearch} className="navbar__search-form">
            <input
              type="text"
              name="search"
              placeholder={t("navbar.search_placeholder")}
              className="navbar__search-input"
              autoFocus={isSearchOpen}
            />
            <button type="submit" className="navbar__search-submit">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="navbar__svg"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="navbar__actions">
          {/* Search Button */}
          <button
            className={`navbar__action-btn navbar__search-btn ${
              isSearchOpen ? "active" : ""
            }`}
            onClick={toggleSearch}
            aria-label={t("navbar.toggle_search")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="navbar__svg"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>

          {/* Language Dropdown */}
          <div className="navbar__language-dropdown">
            <button
              className={`navbar__action-btn navbar__language-btn ${
                isLanguageDropdownOpen ? "active" : ""
              }`}
              onClick={toggleLanguageDropdown}
              aria-label={t("navbar.change_language")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="navbar__svg"
              >
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
              </svg>
              <span className="navbar__language-text">
                {getCurrentLanguage().code.toUpperCase()}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                className="navbar__svg navbar__dropdown-arrow"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {/* Language Dropdown Menu */}
            <div
              className={`navbar__language-menu ${
                isLanguageDropdownOpen ? "active" : ""
              }`}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`navbar__language-option ${
                    currentLanguage === language.code ? "selected" : ""
                  }`}
                  onClick={() => selectLanguage(language.code)}
                >
                  <span className="navbar__language-name">{language.name}</span>
                  <span className="navbar__language-code">
                    ({language.code.toUpperCase()})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            className="navbar__action-btn navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={t("navbar.toggle_theme")}
          >
            {isDarkTheme ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="navbar__svg"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="navbar__svg"
              >
                <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`navbar__toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
