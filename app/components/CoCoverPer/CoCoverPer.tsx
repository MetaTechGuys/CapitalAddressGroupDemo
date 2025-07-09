import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './CoCoverPer.scss';

const CoCoverPer = () => {
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
    <section className="co-cover-per">
      <div className="co-cover-per__image-container">
        <Image 
          src="/images/co-cover-per-bg.webp" 
          alt="Capital Address Group Personal Cover" 
          className="co-cover-per__image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
        <div className="co-cover-per__overlay"></div>
      </div>
      
      <div className="co-cover-per__content">
        <div className="co-cover-per__text">
          <div className="co-cover-per__badge">
            <span className="co-cover-per__badge-text">{t('coverPer.welcome')}</span>
          </div>
          
          <h1 className="co-cover-per__title">
            {t('coverPer.mainTitle')}
          </h1>
          
          <p className="co-cover-per__subtitle">
            {t('coverPer.subtitle')}
          </p>
          
          <p className="co-cover-per__description">
            {t('coverPer.description')}
          </p>
          
          <div className="co-cover-per__stats">
            <div className="co-cover-per__stat">
              <span className="co-cover-per__stat-number">{t('coverPer.projectsCompletedNumber')}</span>
              <span className="co-cover-per__stat-label">{t('coverPer.projectsCompleted')}</span>
            </div>
            <div className="co-cover-per__stat">
              <span className="co-cover-per__stat-number">{t('coverPer.yearsExperienceNumber')}</span>
              <span className="co-cover-per__stat-label">{t('coverPer.yearsExperience')}</span>
            </div>
            <div className="co-cover-per__stat">
              <span className="co-cover-per__stat-number">{t('coverPer.satisfiedClientsNumber')}</span>
              <span className="co-cover-per__stat-label">{t('coverPer.satisfiedClients')}</span>
            </div>
          </div>
          
          <div className="co-cover-per__actions">
            <Link href="/services" className="co-cover-per__btn co-cover-per__btn--primary">
              {t('coverPer.exploreServices')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </Link>
            <Link href="/contact" className="co-cover-per__btn co-cover-per__btn--secondary">
              {t('coverPer.getInTouch')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="co-cover-per__scroll-indicator">
        <div className="co-cover-per__scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        <span className="co-cover-per__scroll-text">{t('coverPer.scrollToDiscover')}</span>
      </div>
    </section>
  );
};

export default CoCoverPer;