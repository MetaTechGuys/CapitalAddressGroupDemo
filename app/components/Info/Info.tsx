import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Info.scss';

const Info = () => {
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
    <section className="info">
      <div className="info__image-container">
        <Image 
          src="/images/info-bg.webp" 
          alt="Capital Address Group Info" 
          className="info__image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div className="info__overlay"></div>
      </div>
      
      <div className="info__content">
        <div className="info__text">
          <div className="info__badge">
            <span className="info__badge-text">{t('info.ourJourney')}</span>
          </div>
          
          <h2 className="info__title">
            {t('info.buildingExcellence')}
          </h2>
          
          <p className="info__subtitle">
            {t('info.legacyOfTrust')}
          </p>
          
          <p className="info__description">
            {t('info.description')}
          </p>
          
          <div className="info__stats">
            <div className="info__stat">
              <span className="info__stat-number">{t('info.propertiesSoldNumber')}</span>
              <span className="info__stat-label">{t('info.propertiesSold')}</span>
            </div>
            <div className="info__stat">
              <span className="info__stat-number">{t('info.yearsExperienceNumber')}</span>
              <span className="info__stat-label">{t('info.yearsExperience')}</span>
            </div>
            <div className="info__stat">
              <span className="info__stat-number">{t('info.happyClientsNumber')}</span>
              <span className="info__stat-label">{t('info.happyClients')}</span>
            </div>
          </div>
          
          <div className="info__actions">
            <Link href="/about" className="info__btn info__btn--primary">
              {t('info.ourStory')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </Link>
            <Link href="/portfolio" className="info__btn info__btn--secondary">
              {t('info.viewPortfolio')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="info__scroll-indicator">
        <div className="info__scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        <span className="info__scroll-text">{t('info.scrollToExplore')}</span>
      </div>
    </section>
  );
};

export default Info;
