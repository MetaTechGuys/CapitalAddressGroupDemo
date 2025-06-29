import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './Companies.scss';

interface Company {
  id: number;
  nameKey: string;
  logo: string;
  alt: string;
}

interface CompaniesProps {
  onCompanyClick?: (companyId: number) => void;
  activeCompanyId?: number;
}

const Companies: React.FC<CompaniesProps> = ({ onCompanyClick, activeCompanyId = 1 }) => {
  const { t } = useLanguage();

  const companies: Company[] = [
    {
      id: 1,
      nameKey: "companies.construction",
      logo: "/images/company1.webp",
      alt: "Construction Companies Group Logo"
    },
    {
      id: 2,
      nameKey: "companies.investment",
      logo: "/images/company2.webp",
      alt: "Investment Companies Group Logo"
    },
    {
      id: 3,
      nameKey: "companies.petrochemical",
      logo: "/images/company3.webp",
      alt: "Oil and Petrochemical Companies Group Logo"
    },
    {
      id: 4,
      nameKey: "companies.industrial",
      logo: "/images/company4.webp",
      alt: "Industrial Companies Group Logo"
    },
    {
      id: 5,
      nameKey: "companies.energy",
      logo: "/images/company5.webp",
      alt: "Energy Companies Group Logo"
    },
    {
      id: 6,
      nameKey: "companies.trading",
      logo: "/images/company6.webp",
      alt: "Trading Companies Group Logo"
    },
    {
      id: 7,
      nameKey: "companies.tourism",
      logo: "/images/company7.webp",
      alt: "Tourism Companies Group Logo"
    },
    {
      id: 8,
      nameKey: "companies.cosmetic",
      logo: "/images/company8.webp",
      alt: "Cosmetic and Health Companies Group Logo"
    }
  ];

  const handleCompanyClick = (companyId: number) => {
    if (onCompanyClick) {
      onCompanyClick(companyId);
    }
  };

  return (
    <div className="companies">
      <div className="companies__grid">
        {companies.map((company) => (
          <div 
            key={company.id} 
            className={`companies__item ${activeCompanyId === company.id ? 'companies__item--active' : ''}`}
            onClick={() => handleCompanyClick(company.id)}
          >
            <div className="companies__image-container">
              <Image
                src={company.logo}
                alt={company.alt}
                className="companies__image"
                width={200}
                height={120}
                priority
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
            <h3 className="companies__name">{t(company.nameKey)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;