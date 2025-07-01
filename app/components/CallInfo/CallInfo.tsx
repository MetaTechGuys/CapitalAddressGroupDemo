import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './CallInfo.scss';

interface ContactItem {
  label: string;
  value: string;
  icon?: string;
  logo?: string;
  href?: string;
  type?: 'phone' | 'email' | 'address' | 'link';
}

interface SocialMedia {
  name: string;
  logo: React.ReactNode;
  url: string;
  alt: string;
}

interface CallInfoProps {
  title?: string;
  description?: string;
  phoneNumbers?: ContactItem[];
  emails?: ContactItem[];
  addresses?: ContactItem[];
  socialMedia?: SocialMedia[];
}

const CallInfo: React.FC<CallInfoProps & { onBackToContactDetails?: () => void }> = ({
  title,
  description,
  phoneNumbers,
  emails,
  addresses,
  socialMedia,
  onBackToContactDetails
}) => {
  const { t } = useLanguage();

  const defaultPhoneNumbers: ContactItem[] = [
    {
      label: t('callInfo.phone.main'),
      value: '+98 21 1234 5678',
      icon: '📞',
      href: 'tel:+982112345678',
      type: 'phone'
    },
    {
      label: t('callInfo.phone.support'),
      value: '+98 21 8765 4321',
      icon: '📱',
      href: 'tel:+982187654321',
      type: 'phone'
    }
  ];

  const defaultEmails: ContactItem[] = [
    {
      label: t('callInfo.email.general'),
      value: 'info@company.com',
      icon: '✉️',
      href: 'mailto:info@company.com',
      type: 'email'
    },
    {
      label: t('callInfo.email.support'),
      value: 'support@company.com',
      icon: '💬',
      href: 'mailto:support@company.com',
      type: 'email'
    }
  ];

  const defaultAddresses: ContactItem[] = [
    {
      label: t('callInfo.address.main'),
      value: t('callInfo.address.mainValue'),
      icon: '📍',
      type: 'address'
    },
    {
      label: t('callInfo.address.branch'),
      value: t('callInfo.address.branchValue'),
      icon: '🏢',
      type: 'address'
    }
  ];

  const defaultSocialMedia: SocialMedia[] = [
    {
      name: 'Instagram',
      logo: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: 'https://instagram.com/company',
      alt: 'Instagram Logo'
    },
    {
      name: 'LinkedIn',
      logo: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://linkedin.com/company/company',
      alt: 'LinkedIn Logo'
    },
    {
      name: 'Twitter',
      logo: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: 'https://twitter.com/company',
      alt: 'Twitter Logo'
    },
    {
      name: 'Telegram',
      logo: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      url: 'https://t.me/company',
      alt: 'Telegram Logo'
    }
  ];

  const renderContactItem = (item: ContactItem) => {
    const content = (
      <div className="call-info__contact-item">
        {item.icon ? (
          <div className="call-info__contact-icon">{item.icon}</div>
        ) : item.logo ? (
          <Image
            src={item.logo}
            alt={`${item.label} logo`}
            className="call-info__contact-logo"
            width={24}
            height={24}
          />
        ) : null}
        <div className="call-info__contact-info">
          <div className="call-info__contact-label">{item.label}</div>
          <div className={`call-info__contact-value ${item.href ? 'call-info__contact-value--clickable' : ''}`}>
            {item.value}
          </div>
        </div>
      </div>
    );

    if (item.href) {
      return (
        <a key={item.value} href={item.href} className="call-info__contact-value">
          {content}
        </a>
      );
    }

    return <div key={item.value}>{content}</div>;
  };

  return (
    <div className="call-info">
      <div className="call-info__header">
        <h2 className="call-info__title">
          {title || t('callInfo.title')}
        </h2>
        <p className="call-info__description">
          {description || t('callInfo.description')}
        </p>
      </div>

      <div className="call-info__content">
        {/* Phone Numbers Section */}
        <div className="call-info__section">
          <h3 className="call-info__section-title">
            {t('callInfo.sections.phone')}
          </h3>
          <div className="call-info__contact-list">
            {(phoneNumbers || defaultPhoneNumbers).map(renderContactItem)}
          </div>
        </div>

        {/* Email Section */}
        <div className="call-info__section">
          <h3 className="call-info__section-title">
            {t('callInfo.sections.email')}
          </h3>
          <div className="call-info__contact-list">
            {(emails || defaultEmails).map(renderContactItem)}
          </div>
        </div>

        {/* Address Section */}
        <div className="call-info__section">
          <h3 className="call-info__section-title">
            {t('callInfo.sections.address')}
          </h3>
          <div className="call-info__contact-list">
            {(addresses || defaultAddresses).map(renderContactItem)}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="call-info__section">
          <h3 className="call-info__section-title">
            {t('callInfo.sections.social')}
          </h3>
          <div className="call-info__social-grid">
            {(socialMedia || defaultSocialMedia).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="call-info__social-item"
              >
                <div className="call-info__social-logo">
                  {social.logo}
                </div>
                <span className="call-info__social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        
      </div>
      {/* Back to Contact Details Button - Fixed Position */}
      {onBackToContactDetails && (
        <button 
          className="call-info__back-btn"
          onClick={() => {
            console.log('Back button clicked');
            onBackToContactDetails();
          }}
          aria-label="Back to Contact Details"
        >
          <svg 
            className="call-info__back-arrow" 
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
      )}
    </div>
  );
};

export default CallInfo;
