import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './CarForm.scss';

interface FormData {
  name: string;
  email: string;
  phone: string;
  link: string;
  birthdate: string;
  title: string;
  message: string;
}

const CarForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    link: '',
    birthdate: '',
    title: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        link: '',
        birthdate: '',
        title: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="car-form">
      <div className="car-form__container">
        <div className="car-form__header">
          <h2 className="car-form__title">{t('carForm.title')}</h2>
          <p className="car-form__description">{t('carForm.description')}</p>
        </div>

        <form className="car-form__form" onSubmit={handleSubmit}>
          <div className="car-form__grid">
            <div className="car-form__field">
              <label htmlFor="name" className="car-form__label">
                {t('carForm.name')} <span className="car-form__required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="car-form__input"
                placeholder={t('carForm.namePlaceholder')}
                required
              />
            </div>

            <div className="car-form__field">
              <label htmlFor="email" className="car-form__label">
                {t('carForm.email')} <span className="car-form__required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="car-form__input"
                placeholder={t('carForm.emailPlaceholder')}
                required
              />
            </div>

            <div className="car-form__field">
              <label htmlFor="phone" className="car-form__label">
                {t('carForm.phone')} <span className="car-form__required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="car-form__input"
                placeholder={t('carForm.phonePlaceholder')}
                required
              />
            </div>

            <div className="car-form__field">
              <label htmlFor="link" className="car-form__label">
                {t('carForm.link')}
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="car-form__input"
                placeholder={t('carForm.linkPlaceholder')}
              />
            </div>

            <div className="car-form__field">
              <label htmlFor="birthdate" className="car-form__label">
                {t('carForm.birthdate')} <span className="car-form__required">*</span>
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="car-form__input"
                required
              />
            </div>

            <div className="car-form__field">
              <label htmlFor="title" className="car-form__label">
                {t('carForm.jobTitle')} <span className="car-form__required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="car-form__input"
                placeholder={t('carForm.titlePlaceholder')}
                required
              />
            </div>
          </div>

          <div className="car-form__field car-form__field--full">
            <label htmlFor="message" className="car-form__label">
              {t('carForm.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="car-form__textarea"
              placeholder={t('carForm.messagePlaceholder')}
              rows={5}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="car-form__success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {t('carForm.successMessage')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="car-form__error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {t('carForm.errorMessage')}
            </div>
          )}

          <div className="car-form__actions">
            <button
              type="submit"
              className="car-form__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="car-form__spinner"></div>
                  {t('carForm.submitting')}
                </>
              ) : (
                <>
                  {t('carForm.submit')}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CarForm;
