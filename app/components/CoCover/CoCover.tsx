import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './CoCover.scss';

const CoCover = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <section className="co-cover">
      <div className="co-cover__image-container">
        <Image 
          src="/images/co-cover-bg.webp" 
          alt="Capital Address Group Cover" 
          className="co-cover__image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
        <div className="co-cover__overlay"></div>
      </div>
      
      <div className="co-cover__content">
        <div className="co-cover__text">
          <div className="co-cover__badge">
            <span className="co-cover__badge-text">{t('cover.welcome')}</span>
          </div>
          
          <h1 className="co-cover__title">
            {t('cover.mainTitle')}
          </h1>
          
          <p className="co-cover__subtitle">
            {t('cover.subtitle')}
          </p>
          
          <p className="co-cover__description">
            {t('cover.description')}
          </p>
          
          <div className="co-cover__stats">
            <div className="co-cover__stat">
              <span className="co-cover__stat-number">{t('cover.projectsCompletedNumber')}</span>
              <span className="co-cover__stat-label">{t('cover.projectsCompleted')}</span>
            </div>
            <div className="co-cover__stat">
              <span className="co-cover__stat-number">{t('cover.yearsExperienceNumber')}</span>
              <span className="co-cover__stat-label">{t('cover.yearsExperience')}</span>
            </div>
            <div className="co-cover__stat">
              <span className="co-cover__stat-number">{t('cover.satisfiedClientsNumber')}</span>
              <span className="co-cover__stat-label">{t('cover.satisfiedClients')}</span>
            </div>
          </div>
          
          <div className="co-cover__actions">
            <Link href="/services" className="co-cover__btn co-cover__btn--primary">
              {t('cover.exploreServices')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </Link>
            <Link href="/contact" className="co-cover__btn co-cover__btn--secondary">
              {t('cover.getInTouch')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="co-cover__scroll-indicator">
        <div className="co-cover__scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        <span className="co-cover__scroll-text">{t('cover.scrollToDiscover')}</span>
      </div>
    </section>
  );
};

export default CoCover;
