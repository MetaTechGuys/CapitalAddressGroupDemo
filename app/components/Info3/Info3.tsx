import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Info3.scss';

const Info3 = () => {
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
    <section className="info3">
      <div className="info3__image-container">
          <video 
          src="/videos/info3-bg.webm" 
          className="info3__video"
          autoPlay
          muted
          loop
          playsInline
          style={{ objectFit: 'cover' }}
        />
        <div className="info3__overlay"></div>
      </div>
      
      <div className="info3__content">
        <div className="info3__text">
          <div className="info3__badge">
            <span className="info3__badge-text">{t('info3.ourJourney')}</span>
          </div>
          
          <h2 className="info3__title">
            {t('info3.buildingExcellence')}
          </h2>
          
          <p className="info3__subtitle">
            {t('info3.legacyOfTrust')}
          </p>
          
          <p className="info3__description">
            {t('info3.description')}
          </p>
          
          <div className="info3__stats">
            <div className="info3__stat">
              <span className="info3__stat-number">{t('info3.propertiesSoldNumber')}</span>
              <span className="info3__stat-label">{t('info3.propertiesSold')}</span>
            </div>
            <div className="info3__stat">
              <span className="info3__stat-number">{t('info3.yearsExperienceNumber')}</span>
              <span className="info3__stat-label">{t('info3.yearsExperience')}</span>
            </div>
            <div className="info3__stat">
              <span className="info3__stat-number">{t('info3.happyClientsNumber')}</span>
              <span className="info3__stat-label">{t('info3.happyClients')}</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Info3;
