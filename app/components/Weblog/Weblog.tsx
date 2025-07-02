'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './Weblog.scss';

interface WeblogSlide {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: string;
  alt: string;
  link?: string;
  category?: string;
  date?: string;
}

interface WeblogProps {
  autoplayDelay?: number;
  onSlideClick?: (slideId: number) => void;
  onBackToTop?: () => void;
}

const Weblog: React.FC<WeblogProps> = ({ 
  autoplayDelay = 4800,
  onSlideClick,
  onBackToTop
}) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const weblogSlides: WeblogSlide[] = [
    {
      id: 1,
      titleKey: "weblog.slides.slide1.title",
      descriptionKey: "weblog.slides.slide1.description",
      image: "/images/weblog-slide-1.webp",
      alt: "Weblog Slide 1",
      category: "weblog.slides.slide1.category",
      date: "2024-01-20"
    },
    {
      id: 2,
      titleKey: "weblog.slides.slide2.title",
      descriptionKey: "weblog.slides.slide2.description",
      image: "/images/weblog-slide-2.webp",
      alt: "Weblog Slide 2",
      category: "weblog.slides.slide2.category",
      date: "2024-01-18"
    },
    {
      id: 3,
      titleKey: "weblog.slides.slide3.title",
      descriptionKey: "weblog.slides.slide3.description",
      image: "/images/weblog-slide-3.webp",
      alt: "Weblog Slide 3",
      category: "weblog.slides.slide3.category",
      date: "2024-01-16"
    },
    {
      id: 4,
      titleKey: "weblog.slides.slide4.title",
      descriptionKey: "weblog.slides.slide4.description",
      image: "/images/weblog-slide-4.webp",
      alt: "Weblog Slide 4",
      category: "weblog.slides.slide4.category",
      date: "2024-01-14"
    },
    {
      id: 5,
      titleKey: "weblog.slides.slide5.title",
      descriptionKey: "weblog.slides.slide5.description",
      image: "/images/weblog-slide-5.webp",
      alt: "Weblog Slide 5",
      category: "weblog.slides.slide5.category",
      date: "2024-01-12"
    },
    {
      id: 6,
      titleKey: "weblog.slides.slide6.title",
      descriptionKey: "weblog.slides.slide6.description",
      image: "/images/weblog-slide-6.webp",
      alt: "Weblog Slide 6",
      category: "weblog.slides.slide6.category",
      date: "2024-01-10"
    },
    {
      id: 7,
      titleKey: "weblog.slides.slide7.title",
      descriptionKey: "weblog.slides.slide7.description",
      image: "/images/weblog-slide-7.webp",
      alt: "Weblog Slide 7",
      category: "weblog.slides.slide7.category",
      date: "2024-01-08"
    },
    {
      id: 8,
      titleKey: "weblog.slides.slide8.title",
      descriptionKey: "weblog.slides.slide8.description",
      image: "/images/weblog-slide-8.webp",
      alt: "Weblog Slide 8",
      category: "weblog.slides.slide8.category",
      date: "2024-01-06"
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % weblogSlides.length);
      }, autoplayDelay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoplayDelay, weblogSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weblogSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + weblogSlides.length) % weblogSlides.length);
  };

  const handleSlideClick = (slideId: number) => {
    if (onSlideClick) {
      onSlideClick(slideId);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="weblog">
      <div className="weblog__header">
        <h2 className="weblog__title">
          {t("weblog.title") || "Capital Address Weblog"}
        </h2>
        <p className="weblog__subtitle">
          {t("weblog.description") || "Explore insights and stories"}
        </p>
      </div>

      <div className="weblog__slider" ref={sliderRef}>
        {/* Render only the current slide */}
        <div className="weblog__slide weblog__slide--active">
          <div className="weblog__image-container">
            <Image
              src={weblogSlides[currentSlide].image}
              alt={weblogSlides[currentSlide].alt}
              fill
              className="weblog__image"
              priority
              sizes="100vw"
              onLoad={handleImageLoad}
            />
            <div className="weblog__overlay"></div>
          </div>
          
          <div className={`weblog__content ${imageLoaded ? 'weblog__content--visible' : ''}`}>
            <div className="weblog__text" key={currentSlide}>
              <div className="weblog__meta">
                <span className="weblog__category">
                  {t(weblogSlides[currentSlide].category || "") || "Category"}
                </span>
                <span className="weblog__date">
                  {weblogSlides[currentSlide].date}
                </span>
              </div>
              <h3 className="weblog__slide-title">
                {t(weblogSlides[currentSlide].titleKey) || `Slide ${weblogSlides[currentSlide].id} Title`}
              </h3>
              <p className="weblog__slide-description">
                {t(weblogSlides[currentSlide].descriptionKey) || `Description for slide ${weblogSlides[currentSlide].id}`}
              </p>
              <button 
                className="weblog__read-more"
                onClick={() => handleSlideClick(weblogSlides[currentSlide].id)}
              >
                {t("weblog.clickToNavigate") || "Read More"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="weblog__nav weblog__nav--prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <button 
          className="weblog__nav weblog__nav--next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button 
          className="weblog__play-pause"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="weblog__pagination">
        {weblogSlides.map((_, index) => (
          <button
            key={index}
            className={`weblog__dot ${
              index === currentSlide ? 'weblog__dot--active' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="weblog__dot-inner"></span>
          </button>
        ))}
      </div>
      {onBackToTop && (
        <button 
          className="weblog__back-btn"
          onClick={() => {
            console.log('Back to top button clicked');
            onBackToTop();
          }}
          aria-label="Back to Top"
        >
          <svg 
            className="weblog__back-arrow" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 19V5M5 12L12 5L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Weblog;
