import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import './Hero.scss';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero__image-container">
        <Image 
          src="/images/hero-bg.webp" 
          alt="Capital Address Group" 
          className="hero__image"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="hero__overlay"></div>
      </div>
      
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">
            {t('hero.title')}
          </h1>
          <p className="hero__subtitle">
            {t('hero.subtitle')}
          </p>
          <p className="hero__description">
            {t('hero.description')}
          </p>
          <div className="hero__actions">
            <Link href="/services" className="hero__btn hero__btn--primary">
              {t('hero.ourServices')}
            </Link>
            <Link href="/contactus" className="hero__btn hero__btn--secondary">
              {t('hero.getInTouch')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
