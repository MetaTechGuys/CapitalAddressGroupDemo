'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import './CompanyDetails.scss';

interface CompanyDetailsProps {
  activeCompanyId: number;
  className?: string;
  onBackToCompanies?: () => void;
}

export default function CompanyDetails({ activeCompanyId, className = '', onBackToCompanies }: CompanyDetailsProps) {
  const { t } = useLanguage();

  // Company details data - matches the IDs from Companies component
  const companyDetails = {
    1: {
      titleKey: "companyDetails.construction.title",
      descriptionKey: "companyDetails.construction.description",
      backgroundImage: "/images/construction-bg.webp"
    },
    2: {
      titleKey: "companyDetails.investment.title",
      descriptionKey: "companyDetails.investment.description",
      backgroundImage: "/images/investment-bg.webp"
    },
    3: {
      titleKey: "companyDetails.petrochemical.title",
      descriptionKey: "companyDetails.petrochemical.description",
      backgroundImage: "/images/petrochemical-bg.webp"
    },
    4: {
      titleKey: "companyDetails.industrial.title",
      descriptionKey: "companyDetails.industrial.description",
      backgroundImage: "/images/industrial-bg.webp"
    },
    5: {
      titleKey: "companyDetails.energy.title",
      descriptionKey: "companyDetails.energy.description",
      backgroundImage: "/images/energy-bg.webp"
    },
    6: {
      titleKey: "companyDetails.trading.title",
      descriptionKey: "companyDetails.trading.description",
      backgroundImage: "/images/trading-bg.webp"
    },
    7: {
      titleKey: "companyDetails.tourism.title",
      descriptionKey: "companyDetails.tourism.description",
      backgroundImage: "/images/tourism-bg.webp"
    },
    8: {
      titleKey: "companyDetails.cosmetic.title",
      descriptionKey: "companyDetails.cosmetic.description",
      backgroundImage: "/images/cosmetic-bg.webp"
    }
  };

  const currentDetails = companyDetails[activeCompanyId as keyof typeof companyDetails] || companyDetails[1];

  const handleBackToCompanies = () => {
    if (onBackToCompanies) {
      onBackToCompanies();
    }
  };

  return (
    <div className={`company-details ${className}`}>
      {/* Background Image */}
      <div 
        className="company-details__background"
        style={{ backgroundImage: `url(${currentDetails.backgroundImage})` }}
      >
        <div className="company-details__overlay"></div>
      </div>

      {/* Content */}
      <div className="company-details__content">
        <div className="company-details__content-inner">
          <h2 className="company-details__title">
            {t(currentDetails.titleKey)}
          </h2>
          <p className="company-details__description">
            {t(currentDetails.descriptionKey)}
          </p>
          <div className="company-details__actions">
            <button className="company-details__cta">
              {t('companyDetails.learnMore') || 'Learn More'}
            </button>
          </div>
        </div>
      </div>

      {/* Back Button - Fixed Position */}
      <button 
        className="company-details__back-btn"
        onClick={handleBackToCompanies}
        aria-label={t('companyDetails.backToCompanies') || 'Back to Companies'}
      >
        <svg 
          className="company-details__back-arrow" 
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
    </div>
  );
}