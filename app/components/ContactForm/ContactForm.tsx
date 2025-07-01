import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './ContactForm.scss';

interface FormData {
  name: string;
  phone: string;
  email: string;
  description: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  description?: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  title?: string;
  description?: string;
  onBackToContactDetails?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, title, description, onBackToContactDetails }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('form.errors.nameRequired');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('form.errors.phoneRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.errors.emailInvalid');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('form.errors.descriptionRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submission logic
        console.log('Form submitted:', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        description: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <div className="form">
        <div className="contact-form__header">
        <h2 className="contact-form__title">
          {title || t('form.title')}
        </h2>
        <p className="contact-form__description">
          {description || t('form.headerDescription')}
        </p>
      </div>
      
      {isSuccess && (
        <div className="contact-form__success">
          {t('form.success')}
        </div>
      )}

      <form className="contact-form__form" onSubmit={handleSubmit}>
        <div className="contact-form__row">
          <div className="contact-form__field">
            <label htmlFor="name" className="contact-form__label">
              {t('form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('form.namePlaceholder')}
              className="contact-form__input"
            />
            {errors.name && (
              <span className="contact-form__error">{errors.name}</span>
            )}
          </div>

          <div className="contact-form__field">
            <label htmlFor="phone" className="contact-form__label">
              {t('form.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t('form.phonePlaceholder')}
              className="contact-form__input"
            />
            {errors.phone && (
              <span className="contact-form__error">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="contact-form__field">
          <label htmlFor="email" className="contact-form__label">
            {t('form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('form.emailPlaceholder')}
            className="contact-form__input"
          />
          {errors.email && (
            <span className="contact-form__error">{errors.email}</span>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor="description" className="contact-form__label">
            {t('form.message')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={t('form.messagePlaceholder')}
            className="contact-form__textarea"
            rows={5}
          />
          {errors.description && (
            <span className="contact-form__error">{errors.description}</span>
          )}
        </div>

        <button
          type="submit"
          className="contact-form__button"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('form.submitting') : t('form.submit')}
        </button>
      </form>

      {/* Back to Contact Details Button - Fixed Position */}
      {onBackToContactDetails && (
        <button 
          className="contact-form__back-btn"
          onClick={() => {
            console.log('Back button clicked'); // Add this for debugging
            onBackToContactDetails();
          }}
          aria-label="Back to Contact Details"
        >
          <svg 
            className="contact-form__back-arrow" 
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
    </div>
  );
};

export default ContactForm;
