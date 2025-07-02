'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import './ProjectDetails.scss';

interface ProjectDetailsProps {
  activeProjectId: number;
  className?: string;
  onBackToProjects?: () => void;
}

export default function ProjectDetails({ activeProjectId, className = '', onBackToProjects }: ProjectDetailsProps) {
  const { t } = useLanguage();

  // Project details data - matches the IDs from Projects component
  const projectDetails = {
    1: {
      titleKey: "projectDetails.residential_complex.title",
      descriptionKey: "projectDetails.residential_complex.description",
      backgroundImage: "/images/complex-bg.webp"
    },
    2: {
      titleKey: "projectDetails.commercial_center.title",
      descriptionKey: "projectDetails.commercial_center.description",
      backgroundImage: "/images/center-bg.webp"
    },
    3: {
      titleKey: "projectDetails.investment_portfolio.title",
      descriptionKey: "projectDetails.investment_portfolio.description",
      backgroundImage: "/images/portfolio-bg.webp"
    },
    4: {
      titleKey: "projectDetails.oil_refinery.title",
      descriptionKey: "projectDetails.oil_refinery.description",
      backgroundImage: "/images/oil-bg.webp"
    },
    5: {
      titleKey: "projectDetails.manufacturing_plant.title",
      descriptionKey: "projectDetails.manufacturing_plant.description",
      backgroundImage: "/images/plant-bg.webp"
    },
    6: {
      titleKey: "projectDetails.solar_farm.title",
      descriptionKey: "projectDetails.solar_farm.description",
      backgroundImage: "/images/solar-bg.webp"
    },
    7: {
      titleKey: "projectDetails.logistics_center.title",
      descriptionKey: "projectDetails.logistics_center.description",
      backgroundImage: "/images/logistics-bg.webp"
    },
    8: {
      titleKey: "projectDetails.resort_development.title",
      descriptionKey: "projectDetails.resort_development.description",
      backgroundImage: "/images/resort-bg.webp"
    }
  };

  const currentDetails = projectDetails[activeProjectId as keyof typeof projectDetails] || projectDetails[1];

  const handleBackToProjects = () => {
    if (onBackToProjects) {
      onBackToProjects();
    }
  };

  return (
    <div className={`project-details ${className}`}>
      {/* Background Image */}
      <div 
        className="project-details__background"
        style={{ backgroundImage: `url(${currentDetails.backgroundImage})` }}
      >
        <div className="project-details__overlay"></div>
      </div>

      {/* Content */}
      <div className="project-details__content">
        <div className="project-details__content-inner">
          <h2 className="project-details__title">
            {t(currentDetails.titleKey)}
          </h2>
          <p className="project-details__description">
            {t(currentDetails.descriptionKey)}
          </p>
          <div className="project-details__actions">
            <button className="project-details__cta">
              {t('projectDetails.learnMore') || 'Learn More'}
            </button>
          </div>
        </div>
      </div>

      {/* Back Button - Fixed Position */}
      <button 
        className="project-details__back-btn"
        onClick={handleBackToProjects}
        aria-label={t('projectDetails.backToProjects') || 'Back to Projects'}
      >
        <svg 
          className="project-details__back-arrow" 
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
