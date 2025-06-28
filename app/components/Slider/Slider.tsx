import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = [
    {
      id: 1,
      image: "/images/slide1.webp",
      title: t("slider.luxuryResidential"),
      subtitle: t("slider.luxuryResidentialSub"),
      description: t("slider.luxuryResidentialDesc"),
    },
    {
      id: 2,
      image: "/images/slide2.webp",
      title: t("slider.commercialRealEstate"),
      subtitle: t("slider.commercialRealEstateSub"),
      description: t("slider.commercialRealEstateDesc"),
    },
    {
      id: 3,
      image: "/images/slide3.webp",
      title: t("slider.investmentOpportunities"),
      subtitle: t("slider.investmentOpportunitiesSub"),
      description: t("slider.investmentOpportunitiesDesc"),
    },
    {
      id: 4,
      image: "/images/slide4.webp",
      title: t("slider.modernArchitecture"),
      subtitle: t("slider.modernArchitectureSub"),
      description: t("slider.modernArchitectureDesc"),
    },
    {
      id: 5,
      image: "/images/slide5.webp",
      title: t("slider.waterfrontProperties"),
      subtitle: t("slider.waterfrontPropertiesSub"),
      description: t("slider.waterfrontPropertiesDesc"),
    },
    {
      id: 6,
      image: "/images/slide6.webp",
      title: t("slider.urbanPenthouses"),
      subtitle: t("slider.urbanPenthousesSub"),
      description: t("slider.urbanPenthousesDesc"),
    },
    {
      id: 7,
      image: "/images/slide7.webp",
      title: t("slider.suburbanEstates"),
      subtitle: t("slider.suburbanEstatesSub"),
      description: t("slider.suburbanEstatesDesc"),
    },
    {
      id: 8,
      image: "/images/slide8.webp",
      title: t("slider.golfCommunities"),
      subtitle: t("slider.golfCommunitiesSub"),
      description: t("slider.golfCommunitiesDesc"),
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !mounted) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, mounted]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="slider">
        <div className="slider__container">
          <div className="slider__main">
            <div className="slider__image-container">
              <div className="slider__loading">Loading...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="slider">
      <div className="slider__container">
        {/* Main Slide Display */}
        <div className="slider__main">
          <div className="slider__image-container">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="slider__image"
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
            <div className="slider__overlay"></div>
          </div>

          {/* Overlay Content - Centered */}
<div className="slider__content">
  <div className="slider__text" key={currentSlide}>  {/* Add key prop here */}
    <span className="slider__slide-number">
      {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
    </span>
    <h2 className="slider__title">{slides[currentSlide].title}</h2>
    <h3 className="slider__subtitle">{slides[currentSlide].subtitle}</h3>
    <p className="slider__description">{slides[currentSlide].description}</p>
    <button className="slider__cta">
      {t('slider.exploreProperties')}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
      </svg>
    </button>
  </div>
</div>


          {/* Navigation Arrows */}
          <button
            className="slider__nav slider__nav--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            className="slider__nav slider__nav--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Navigation - Text overlaying images with transparent background */}
        <div className="slider__thumbnails">
          <div className="slider__thumbnails-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slider__thumbnail ${
                  index === currentSlide ? "slider__thumbnail--active" : ""
                }`}
                onClick={() => goToSlide(index)}
              >
                <div className="slider__thumbnail-image">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 20vw, (max-width: 1200px) 15vw, 10vw"
                    priority
                  />
                  <div className="slider__thumbnail-overlay"></div>

                  {/* Text overlay on image */}
                  <div className="slider__thumbnail-content">
                    <h4 className="slider__thumbnail-title">{slide.title}</h4>
                    <p className="slider__thumbnail-subtitle">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          className="slider__play-pause"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress Bar - At the end */}
        <div className="slider__progress">
          <div
            className="slider__progress-bar"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              animationDuration: isAutoPlaying ? "5s" : "none",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
