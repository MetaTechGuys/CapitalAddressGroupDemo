import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Timeline.scss';

const Timeline = () => {
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
    <section className="timeline">
      <div className="timeline__image-container">
        <Image 
          src="/images/timeline-bg.webp" 
          alt="Capital Address Group Timeline" 
          className="timeline__image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div className="timeline__overlay"></div>
      </div>
      
      <div className="timeline__content">
        <div className="timeline__text">
          <div className="timeline__badge">
            <span className="timeline__badge-text">{t('timeline.ourJourney')}</span>
          </div>
          
          <h2 className="timeline__title">
            {t('timeline.buildingExcellence')}
          </h2>
          
          <p className="timeline__subtitle">
            {t('timeline.legacyOfTrust')}
          </p>
          
          <p className="timeline__description">
            {t('timeline.description')}
          </p>
          
          <div className="timeline__stats">
            <div className="timeline__stat">
              <span className="timeline__stat-number">{t('timeline.propertiesSoldNumber')}</span>
              <span className="timeline__stat-label">{t('timeline.propertiesSold')}</span>
            </div>
            <div className="timeline__stat">
              <span className="timeline__stat-number">{t('timeline.yearsExperienceNumber')}</span>
              <span className="timeline__stat-label">{t('timeline.yearsExperience')}</span>
            </div>
            <div className="timeline__stat">
              <span className="timeline__stat-number">{t('timeline.happyClientsNumber')}</span>
              <span className="timeline__stat-label">{t('timeline.happyClients')}</span>
            </div>
          </div>
          
          <div className="timeline__actions">
            <Link href="/aboutus" className="timeline__btn timeline__btn--primary">
              {t('timeline.ourStory')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </Link>
            <Link href="/portfolio" className="timeline__btn timeline__btn--secondary">
              {t('timeline.viewPortfolio')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="timeline__scroll-indicator">
        <div className="timeline__scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        <span className="timeline__scroll-text">{t('timeline.scrollToExplore')}</span>
      </div>
    </section>
  );
};

export default Timeline;
