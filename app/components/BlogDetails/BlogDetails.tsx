import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './BlogDetails.scss';

interface BlogItem {
  id: number;
  nameKey: string;
  infoKey: string;
  image: string;
  alt: string;
  targetSection?: string; // Add target section for navigation
}

interface BlogDetailsProps {
  onBlogClick?: (blogId: number, targetSection?: string) => void;
  activeBlogId?: number;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ 
  onBlogClick, 
  activeBlogId 
}) => {
  const { t } = useLanguage();

  const blogItems: BlogItem[] = [
    {
      id: 1,
      nameKey: "blog.latest.title",
      infoKey: "blog.latest.info",
      image: "/images/blog-latest.webp",
      alt: "Latest Blog Posts",
      targetSection: "weblog" // Navigate to latest posts section
    },
    {
      id: 2,
      nameKey: "blog.categories.title",
      infoKey: "blog.categories.info",
      image: "/images/blog-categories.webp",
      alt: "Blog Categories",
      targetSection: "blog-news" // Navigate to categories section
    }
  ];

  const handleBlogClick = (blogId: number, targetSection?: string) => {
    if (onBlogClick) {
      onBlogClick(blogId, targetSection);
    }
  };

  return (
    <div className="blog-details">
      <div className="blog-details__header">
        <h2 className="blog-details__title">
          {t("blog.title")}
        </h2>
        <p className="blog-details__description">
          {t("blog.description")}
        </p>
      </div>

      <div className="blog-details__grid">
        {blogItems.map((item) => (
          <div 
            key={item.id} 
            className={`blog-details__item ${
              activeBlogId === item.id ? 'blog-details__item--active' : ''
            }`}
            onClick={() => handleBlogClick(item.id, item.targetSection)}
          >
            <div className="blog-details__image-container">
              <Image
                src={item.image}
                alt={item.alt}
                className="blog-details__image"
                width={60}
                height={60}
                priority
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
            <h3 className="blog-details__name">{t(item.nameKey)}</h3>
            <div className="blog-details__action">
              <span className="blog-details__action-text">
                {t('blog.clickToNavigate')}
              </span>
              <svg 
                className="blog-details__arrow" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;