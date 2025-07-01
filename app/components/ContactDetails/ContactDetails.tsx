import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './ContactDetails.scss';

interface ContactItem {
  id: number;
  nameKey: string;
  infoKey: string;
  image: string;
  alt: string;
  targetSection?: string; // Add target section for navigation
}

interface ContactDetailsProps {
  onContactClick?: (contactId: number, targetSection?: string) => void;
  activeContactId?: number;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ 
  onContactClick, 
  activeContactId 
}) => {
  const { t } = useLanguage();

  const contactItems: ContactItem[] = [
    {
      id: 1,
      nameKey: "contact.phone.title",
      infoKey: "contact.phone.info",
      image: "/images/call.webp",
      alt: "Phone Contact",
      targetSection: "call-info" // Navigate to call info section
    },
    {
      id: 2,
      nameKey: "contact.email.title",
      infoKey: "contact.email.info",
      image: "/images/contact-form.webp",
      alt: "Email Contact",
      targetSection: "contact-form" // Navigate to contact form section
    },
    {
      id: 3,
      nameKey: "contact.address.title",
      infoKey: "contact.address.info",
      image: "/images/pin.webp",
      alt: "Address Location",
      targetSection: "location" // Navigate to location section
    }
  ];

  const handleContactClick = (contactId: number, targetSection?: string) => {
    if (onContactClick) {
      onContactClick(contactId, targetSection);
    }
  };

  return (
    <div className="contact-details">
      <div className="contact-details__header">
        <h2 className="contact-details__title">
          {t("contact.title")}
        </h2>
        <p className="contact-details__description">
          {t("contact.description")}
        </p>
      </div>

      <div className="contact-details__grid">
        {contactItems.map((item) => (
          <div 
            key={item.id} 
            className={`contact-details__item ${
              activeContactId === item.id ? 'contact-details__item--active' : ''
            }`}
            onClick={() => handleContactClick(item.id, item.targetSection)}
          >
            <div className="contact-details__image-container">
              <Image
                src={item.image}
                alt={item.alt}
                className="contact-details__image"
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
            <h3 className="contact-details__name">{t(item.nameKey)}</h3>
            <div className="contact-details__action">
              <span className="contact-details__action-text">
                {t('contact.clickToNavigate')}
              </span>
              <svg 
                className="contact-details__arrow" 
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

export default ContactDetails;
