import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './CoCompony.scss';

interface CompanyItem {
  id: string;
  image: string;
  title: string;
  description: string;
  alt: string;
}

const CoCompony = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const companyItems: CompanyItem[] = [
    {
      id: 'vision',
      image: '/images/co1.webp',
      title: t('company.vision.title'),
      description: t('company.vision.description'),
      alt: t('company.vision.alt')
    },
    {
      id: 'mission',
      image: '/images/co2.webp',
      title: t('company.mission.title'),
      description: t('company.mission.description'),
      alt: t('company.mission.alt')
    },
    {
      id: 'values',
      image: '/images/co3.webp',
      title: t('company.values.title'),
      description: t('company.values.description'),
      alt: t('company.values.alt')
    },
    {
      id: 'culture',
      image: '/images/co4.webp',
      title: t('company.culture.title'),
      description: t('company.culture.description'),
      alt: t('company.culture.alt')
    }
  ];

  return (
    <section className="co-company">
      <div className="co-company__container">

        <div className="co-company__grid">
          {companyItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`co-company__item co-company__item--${index + 1}`}
            >
              <div className="co-company__image-container">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="co-company__image"
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
                <div className="co-company__image-overlay"></div>
              </div>
              
              <div className="co-company__content">
                <h3 className="co-company__title">{item.title}</h3>
                <p className="co-company__description">{item.description}</p>
                
                <div className="co-company__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    {index === 0 && (
                      // Vision icon - eye
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    )}
                    {index === 1 && (
                      // Mission icon - target
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    )}
                    {index === 2 && (
                      // Values icon - diamond
                      <path d="M6.5 9L12 2l5.5 7H6.5zm11 1L12 22 6.5 10H17.5z"/>
                    )}
                    {index === 3 && (
                      // Culture icon - people
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10l-1.99-1.01A2.5 2.5 0 0 0 10 8H8.46c-.8 0-1.49.59-1.42 1.37L9.5 16H12v6h8zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
                    )}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoCompony;