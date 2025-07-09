import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './CoPerson.scss';

interface PersonItem {
  id: string;
  image: string;
  title: string;
  description: string;
  alt: string;
}

const CoPerson = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const personItems: PersonItem[] = [
    {
      id: 'leadership',
      image: '/images/person1.webp',
      title: t('person.leadership.title'),
      description: t('person.leadership.description'),
      alt: t('person.leadership.alt')
    },
    {
      id: 'innovation',
      image: '/images/person2.webp',
      title: t('person.innovation.title'),
      description: t('person.innovation.description'),
      alt: t('person.innovation.alt')
    },
    {
      id: 'expertise',
      image: '/images/person3.webp',
      title: t('person.expertise.title'),
      description: t('person.expertise.description'),
      alt: t('person.expertise.alt')
    },
    {
      id: 'collaboration',
      image: '/images/person4.webp',
      title: t('person.collaboration.title'),
      description: t('person.collaboration.description'),
      alt: t('person.collaboration.alt')
    },
    {
      id: 'dedication',
      image: '/images/person5.webp',
      title: t('person.dedication.title'),
      description: t('person.dedication.description'),
      alt: t('person.dedication.alt')
    },
    {
      id: 'growth',
      image: '/images/person6.webp',
      title: t('person.growth.title'),
      description: t('person.growth.description'),
      alt: t('person.growth.alt')
    },
    {
      id: 'integrity',
      image: '/images/person7.webp',
      title: t('person.integrity.title'),
      description: t('person.integrity.description'),
      alt: t('person.integrity.alt')
    },
    {
      id: 'passion',
      image: '/images/person8.webp',
      title: t('person.passion.title'),
      description: t('person.passion.description'),
      alt: t('person.passion.alt')
    }
  ];

  return (
    <section className="co-person">
      <div className="co-person__container">

        <div className="co-person__grid">
          {personItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`co-person__item co-person__item--${index + 1}`}
            >
              <div className="co-person__image-container">
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="co-person__image"
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
                <div className="co-person__image-overlay"></div>
              </div>
              
              <div className="co-person__content">
                <h3 className="co-person__title">{item.title}</h3>
                <p className="co-person__description">{item.description}</p>
                
                <div className="co-person__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    {index === 0 && (
                      // Leadership icon - crown
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1 1.4L12 8l-3.1 2L6.8 8.6L7.7 14z"/>
                    )}
                    {index === 1 && (
                      // Innovation icon - lightbulb
                      <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17h8v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7z"/>
                    )}
                    {index === 2 && (
                      // Expertise icon - graduation cap
                      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                    )}
                    {index === 3 && (
                      // Collaboration icon - handshake
                      <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7.16 8-12.5C23 5.81 19.19 2 14.5 2h-3z"/>
                    )}
                    {index === 4 && (
                      // Dedication icon - heart
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    )}
                    {index === 5 && (
                      // Growth icon - trending up
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    )}
                    {index === 6 && (
                      // Integrity icon - shield
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    )}
                    {index === 7 && (
                      // Passion icon - flame
                      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.67-.2 3.88-.72 1.8-2.39 4.96-4.01 4.96z"/>
                    )}
                    {index === 8 && (
                      // Excellence icon - star
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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

export default CoPerson;
