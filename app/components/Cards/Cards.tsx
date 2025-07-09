import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import './Cards.scss';

interface Card {
  id: string;
  title: string;
  frontText: string;
  backDescription: string;
  buttonText: string;
  buttonLink: string;
  gradient: string;
}

const Cards = () => {
  const { t, currentLanguage: language } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // More comprehensive RTL detection
  const isRTL = language === 'ar' || language === 'fa';

  const cards: Card[] = [
    {
      id: 'card1',
      title: t('cards.card1.title'),
      frontText: t('cards.card1.frontText'),
      backDescription: t('cards.card1.backDescription'),
      buttonText: t('cards.card1.buttonText'),
      buttonLink: '/services/card1',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'card2',
      title: t('cards.card2.title'),
      frontText: t('cards.card2.frontText'),
      backDescription: t('cards.card2.backDescription'),
      buttonText: t('cards.card2.buttonText'),
      buttonLink: '/services/card2',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'card3',
      title: t('cards.card3.title'),
      frontText: t('cards.card3.frontText'),
      backDescription: t('cards.card3.backDescription'),
      buttonText: t('cards.card3.buttonText'),
      buttonLink: '/services/card3',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'card4',
      title: t('cards.card4.title'),
      frontText: t('cards.card4.frontText'),
      backDescription: t('cards.card4.backDescription'),
      buttonText: t('cards.card4.buttonText'),
      buttonLink: '/services/card4',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 'card5',
      title: t('cards.card5.title'),
      frontText: t('cards.card5.frontText'),
      backDescription: t('cards.card5.backDescription'),
      buttonText: t('cards.card5.buttonText'),
      buttonLink: '/services/card5',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'card6',
      title: t('cards.card6.title'),
      frontText: t('cards.card6.frontText'),
      backDescription: t('cards.card6.backDescription'),
      buttonText: t('cards.card6.buttonText'),
      buttonLink: '/services/card6',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 'card7',
      title: t('cards.card7.title'),
      frontText: t('cards.card7.frontText'),
      backDescription: t('cards.card7.backDescription'),
      buttonText: t('cards.card7.buttonText'),
      buttonLink: '/services/card7',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      id: 'card8',
      title: t('cards.card8.title'),
      frontText: t('cards.card8.frontText'),
      backDescription: t('cards.card8.backDescription'),
      buttonText: t('cards.card8.buttonText'),
      buttonLink: '/services/card8',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
    }
  ];

  // Responsive slides to show
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setSlidesToShow(4);
      } else if (width >= 768) {
        setSlidesToShow(3);
      } else if (width >= 480) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Set document direction for RTL
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
  }, [isRTL]);

  const maxSlide = Math.max(0, cards.length - slidesToShow);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          const nextIndex = prev + slidesToShow;
          return nextIndex >= cards.length ? 0 : nextIndex;
        });
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, slidesToShow, cards.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Resume auto-play on mouse leave
  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => {
      const nextIndex = prev + slidesToShow;
      return nextIndex >= cards.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide(prev => {
      const prevIndex = prev - slidesToShow;
      return prevIndex < 0 ? Math.max(0, cards.length - slidesToShow) : prevIndex;
    });
  };

  const getTransformValue = () => {
    const translateValue = (currentSlide * 100) / slidesToShow;
    return isRTL ? `translateX(${translateValue}%)` : `translateX(-${translateValue}%)`;
  };

  return (
    <section className={`cards ${isRTL ? 'cards--rtl' : 'cards--ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="cards__container">
        <div className="cards__header">
          <h2 className="cards__title">{t('cards.mainTitle')}</h2>
          <p className="cards__description">{t('cards.mainDescription')}</p>
        </div>

        <div 
          className="cards__slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cards__slider-wrapper">
            <div 
              ref={sliderRef}
              className="cards__slider-track"
              style={{
                transform: getTransformValue(),
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`cards__item ${hoveredCard === card.id ? 'cards__item--flipped' : ''}`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ 
                    minWidth: `${100 / slidesToShow}%`,
                    maxWidth: `${100 / slidesToShow}%`
                  }}
                >
                  <div className="cards__item-inner">
                    {/* Front Side */}
                    <div 
                      className="cards__item-front"
                      style={{ background: card.gradient }}
                    >
                      <div className="cards__gradient-overlay"></div>
                      <div className="cards__front-content">
                        <h3 className="cards__card-title">{card.title}</h3>
                        <p className="cards__front-text">{card.frontText}</p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="cards__item-back">
                      <div className="cards__back-content">
                        <h3 className="cards__back-title">{card.title}</h3>
                        <p className="cards__back-description">{card.backDescription}</p>
                        <Link href={card.buttonLink} className="cards__back-button">
                          {card.buttonText}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d={isRTL ? "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" : "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"}/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            className="cards__nav cards__nav--prev"
            onClick={prevSlide}
            aria-label={isRTL ? "الشريحة التالية" : "Previous slide"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d={isRTL ? "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" : "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}/>
            </svg>
          </button>

          <button 
            className="cards__nav cards__nav--next"
            onClick={nextSlide}
            aria-label={isRTL ? "الشريحة السابقة" : "Next slide"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d={isRTL ? "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" : "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cards;
