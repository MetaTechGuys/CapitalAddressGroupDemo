import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Careers.scss';

const Careers = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const careerItems = [
    {
      id: 1,
      title: t('careers.joinTeam'),
      description: t('careers.joinTeamDesc'),
      image: "/images/career-1.webp",
      category: t('careers.careerOpportunities'),
      link: "/careers/opportunities",
      featured: true,
      type: "main",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: t('careers.realEstateAgent'),
      description: t('careers.realEstateAgentDesc'),
      category: t('careers.openPositions'),
      link: "/careers/agent-positions",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: t('careers.marketingSpecialist'),
      description: t('careers.marketingSpecialistDesc'),
      category: t('careers.openPositions'),
      link: "/careers/marketing-specialist",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: t('careers.professionalDevelopment'),
      description: t('careers.professionalDevelopmentDesc'),
      image: "/images/career-2.webp",
      category: t('careers.trainingDevelopment'),
      link: "/careers/development",
      featured: true,
      type: "wide",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
  ];

  return (
    <section className="careers">
      {/* Bookmark Label */}
      <div className="careers__bookmark">
        <span className="careers__bookmark-text">{t('careers.title')}</span>
      </div>

      <div className="careers__container">
        <div className="careers__grid">
          {careerItems.map((item) => (
            <article 
              key={item.id} 
              className={`careers__item ${item.featured ? 'careers__item--featured' : ''} ${item.type === 'main' ? 'careers__item--main' : ''} ${item.type === 'wide' ? 'careers__item--wide' : ''}`}
              style={{
                background: item.gradient
              }}
            >
              {item.type === 'main' ? (
                // First item with image above text (vertical layout)
                <>
                  <div className="careers__item-image">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="careers__item-overlay"></div>
                    <span className="careers__item-category">{item.category}</span>
                  </div>
                  
                  <div className="careers__item-content careers__item-content--main">
                    <h3 className="careers__item-title">{item.title}</h3>
                    <p className="careers__item-description">{item.description}</p>
                    
                    <Link href={item.link} className="careers__item-link">
                      {t('careers.exploreCareers')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </Link>
                  </div>
                </>
              ) : item.type === 'wide' ? (
                // Last item with side-by-side layout
                <>
                  <div className="careers__item-image">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="careers__item-overlay"></div>
                    <span className="careers__item-category">{item.category}</span>
                  </div>
                  
                  <div className="careers__item-content">
                    <h3 className="careers__item-title">{item.title}</h3>
                    <p className="careers__item-description">{item.description}</p>
                    
                    <Link href={item.link} className="careers__item-link">
                      {t('careers.learnMore')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                // Middle items with gradient background
                <>
                  <div className="careers__item-gradient-header">
                    <span className="careers__item-category">{item.category}</span>
                  </div>
                  
                  <div className="careers__item-content">
                    <h3 className="careers__item-title">{item.title}</h3>
                    <p className="careers__item-description">{item.description}</p>
                    
                    <Link href={item.link} className="careers__item-link">
                      {t('careers.applyNow')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
        
        <div className="careers__footer">
          <Link href="/careers" className="careers__view-all">
            {t('careers.viewAllPositions')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Careers;
