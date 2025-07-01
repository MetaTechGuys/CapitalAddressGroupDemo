'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './BlogNews.scss';

interface BlogSlide {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: string;
  alt: string;
  link?: string;
  category?: string;
  date?: string;
}

interface BlogNewsProps {
  autoplayDelay?: number;
  onSlideClick?: (slideId: number) => void;
  onBackToTop?: () => void;
}

const BlogNews: React.FC<BlogNewsProps> = ({ 
  autoplayDelay = 4800,
  onSlideClick,
  onBackToTop
}) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const blogSlides: BlogSlide[] = [
    {
      id: 1,
      titleKey: "blognews.slides.slide1.title",
      descriptionKey: "blognews.slides.slide1.description",
      image: "/images/blognews-slide-1.webp",
      alt: "Blog Slide 1",
      category: "blognews.slides.slide1.category",
      date: "2024-01-15"
    },
    {
      id: 2,
      titleKey: "blognews.slides.slide2.title",
      descriptionKey: "blognews.slides.slide2.description",
      image: "/images/blognews-slide-2.webp",
      alt: "Blog Slide 2",
      category: "blognews.slides.slide2.category",
      date: "2024-01-12"
    },
    {
      id: 3,
      titleKey: "blognews.slides.slide3.title",
      descriptionKey: "blognews.slides.slide3.description",
      image: "/images/blognews-slide-3.webp",
      alt: "Blog Slide 3",
      category: "blognews.slides.slide3.category",
      date: "2024-01-10"
    },
    {
      id: 4,
      titleKey: "blognews.slides.slide4.title",
      descriptionKey: "blognews.slides.slide4.description",
      image: "/images/blognews-slide-4.webp",
      alt: "Blog Slide 4",
      category: "blognews.slides.slide4.category",
      date: "2024-01-08"
    },
    {
      id: 5,
      titleKey: "blognews.slides.slide5.title",
      descriptionKey: "blognews.slides.slide5.description",
      image: "/images/blognews-slide-5.webp",
      alt: "Blog Slide 5",
      category: "blognews.slides.slide5.category",
      date: "2024-01-05"
    },
    {
      id: 6,
      titleKey: "blognews.slides.slide6.title",
      descriptionKey: "blognews.slides.slide6.description",
      image: "/images/blognews-slide-6.webp",
      alt: "Blog Slide 6",
      category: "blognews.slides.slide6.category",
      date: "2024-01-03"
    },
    {
      id: 7,
      titleKey: "blognews.slides.slide7.title",
      descriptionKey: "blognews.slides.slide7.description",
      image: "/images/blognews-slide-7.webp",
      alt: "Blog Slide 7",
      category: "blognews.slides.slide7.category",
      date: "2024-01-01"
    },
    {
      id: 8,
      titleKey: "blognews.slides.slide8.title",
      descriptionKey: "blognews.slides.slide8.description",
      image: "/images/blognews-slide-8.webp",
      alt: "Blog Slide 8",
      category: "blognews.slides.slide8.category",
      date: "2023-12-28"
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % blogSlides.length);
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
  }, [isPlaying, autoplayDelay, blogSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogSlides.length) % blogSlides.length);
  };

  const handleSlideClick = (slideId: number) => {
    if (onSlideClick) {
      onSlideClick(slideId);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="blog-news">
      <div className="blog-news__header">
        <h2 className="blog-news__title">
          {t("blognews.title") || "Capital Address Media"}
        </h2>
        <p className="blog-news__subtitle">
          {t("blognews.description") || "Follow the latest news and events"}
        </p>
      </div>

      <div className="blog-news__slider" ref={sliderRef}>
        {/* Render only the current slide */}
        <div className="blog-news__slide blog-news__slide--active">
          <div className="blog-news__image-container">
            <Image
              src={blogSlides[currentSlide].image}
              alt={blogSlides[currentSlide].alt}
              fill
              className="blog-news__image"
              priority
              sizes="100vw"
            />
            <div className="blog-news__overlay"></div>
          </div>
          
          <div className="blog-news__content">
            <div className="blog-news__meta">
              <span className="blog-news__category">
                {t(blogSlides[currentSlide].category || "") || "Category"}
              </span>
              <span className="blog-news__date">
                {blogSlides[currentSlide].date}
              </span>
            </div>
            <h3 className="blog-news__slide-title">
              {t(blogSlides[currentSlide].titleKey) || `Slide ${blogSlides[currentSlide].id} Title`}
            </h3>
            <p className="blog-news__slide-description">
              {t(blogSlides[currentSlide].descriptionKey) || `Description for slide ${blogSlides[currentSlide].id}`}
            </p>
            <button 
              className="blog-news__read-more"
              onClick={() => handleSlideClick(blogSlides[currentSlide].id)}
            >
              {t("blog.clickToNavigate") || "Read More"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="blog-news__nav blog-news__nav--prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <button 
          className="blog-news__nav blog-news__nav--next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button 
          className="blog-news__play-pause"
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
      <div className="blog-news__pagination">
        {blogSlides.map((_, index) => (
          <button
            key={index}
            className={`blog-news__dot ${
              index === currentSlide ? 'blog-news__dot--active' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="blog-news__dot-inner"></span>
          </button>
        ))}
      </div>
      {onBackToTop && (
        <button 
          className="blog-news__back-btn"
          onClick={() => {
            console.log('Back to top button clicked');
            onBackToTop();
          }}
          aria-label="Back to Top"
        >
          <svg 
            className="blog-news__back-arrow" 
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

export default BlogNews;
