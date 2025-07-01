import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './News.scss';

const News = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const newsItems = [
    {
      id: 1,
      title: t('news.premiumServices'),
      description: t('news.premiumServicesDesc'),
      image: "/images/news-1.webp",
      category: t('news.services'),
      link: "/services",
      featured: true,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: t('news.marketTrends'),
      description: t('news.marketTrendsDesc'),
      category: t('news.marketAnalysis'),
      link: "/news/market-trends-2024",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: t('news.investmentOpportunities'),
      description: t('news.investmentOpportunitiesDesc'),
      category: t('news.investment'),
      link: "/news/investment-opportunities",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: t('news.trustedPartner'),
      description: t('news.trustedPartnerDesc'),
      image: "/images/news-2.webp",
      category: t('news.aboutUs'),
      link: "/about",
      featured: true,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
  ];

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <section className="news">
      {/* Bookmark Label */}
      <div className="news__bookmark">
        <span className="news__bookmark-text">{t('news.title')}</span>
      </div>

      <div className="news__container">
        <div className="news__grid">
          {newsItems.map((item, index) => (
            <article 
              key={item.id} 
              className={`news__item ${item.featured ? 'news__item--featured' : ''} ${index === 0 ? 'news__item--first' : ''} ${index === newsItems.length - 1 ? 'news__item--last' : ''}`}
              style={{
                background: item.gradient
              }}
            >
              {item.featured && item.image ? (
                // Featured items with side-by-side layout
                <>
                  <div 
                    className="news__item-image"
                  >
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div 
                      className="news__item-overlay"
                    ></div>
                    <span className="news__item-category">{item.category}</span>
                  </div>
                  
                  <div className="news__item-content">
                    <div className="news__item-meta">
                    </div>
                    
                    <h3 className="news__item-title">{item.title}</h3>
                    <p className="news__item-description">{item.description}</p>
                    
                    <Link href={item.link} className="news__item-link">
                      {t('news.readMore')}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                // Non-featured items with gradient background
                <>
                  <div className="news__item-gradient-header">
                    <span className="news__item-category">{item.category}</span>
                  </div>
                  
                  <div className="news__item-content">
                    <div className="news__item-meta">
                    </div>
                    
                    <h2 className="news__item-title">{item.title}</h2>
                    <p className="news__item-description">{item.description}</p>
                    
                    <Link href={item.link} className="news__item-link">
                      {t('news.readMore')}
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
        
        <div className="news__footer">
          <Link href="/aboutus" className="news__view-all">
            {t('news.viewAllNews')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
