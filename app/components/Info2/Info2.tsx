import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Info2.scss';

const Info2 = () => {
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
    <section className="info2">
      <div className="info2__image-container">
        <Image 
          src="/images/info2-bg.webp" 
          alt="Capital Address Group Info2" 
          className="info2__image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div className="info2__overlay"></div>
      </div>
      
      <div className="info2__content">
        <div className="info2__text">
          <div className="info2__badge">
            <span className="info2__badge-text">{t('info2.ourJourney')}</span>
          </div>
          
          <h2 className="info2__title">
            {t('info2.buildingExcellence')}
          </h2>
          
          <p className="info2__subtitle">
            {t('info2.legacyOfTrust')}
          </p>
          
          <p className="info2__description">
            {t('info2.description')}
          </p>
          
          <div className="info2__stats">
            <div className="info2__stat">
              <span className="info2__stat-number">{t('info2.propertiesSoldNumber')}</span>
              <span className="info2__stat-label">{t('info2.propertiesSold')}</span>
            </div>
            <div className="info2__stat">
              <span className="info2__stat-number">{t('info2.yearsExperienceNumber')}</span>
              <span className="info2__stat-label">{t('info2.yearsExperience')}</span>
            </div>
            <div className="info2__stat">
              <span className="info2__stat-number">{t('info2.happyClientsNumber')}</span>
              <span className="info2__stat-label">{t('info2.happyClients')}</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Info2;
