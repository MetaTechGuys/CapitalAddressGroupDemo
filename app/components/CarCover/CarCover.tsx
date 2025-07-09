import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './CarCover.scss';

const CarCover = () => {
  const { t } = useLanguage();

  return (
    <section className="car-cover">
      <div className="car-cover__image-container">
        <Image 
          src="/images/car-cover-bg.webp" 
          alt="Capital Address Group Car Cover" 
          className="car-cover__image"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="car-cover__overlay"></div>
      </div>
      
      <div className="car-cover__content">
        <div className="car-cover__text">
          <h1 className="car-cover__title">
            {t('carCover.title')}
          </h1>
          <p className="car-cover__subtitle">
            {t('carCover.subtitle')}
          </p>
          <p className="car-cover__description">
            {t('carCover.description')}
          </p>
          <div className="car-cover__actions">
            <Link href="/services" className="car-cover__btn car-cover__btn--primary">
              {t('carCover.ourServices')}
            </Link>
            <Link href="/contactus" className="car-cover__btn car-cover__btn--secondary">
              {t('carCover.getInTouch')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarCover;
