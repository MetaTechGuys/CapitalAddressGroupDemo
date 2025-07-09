import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Logo.scss';

interface LogoProps {
  videoSrc?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

const Logo: React.FC<LogoProps> = ({
  videoSrc = "/videos/logo-video.webm",
  posterImage = "/images/logo-poster.jpg",
  title,
  description
}) => {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    
    // Auto-play video when component mounts
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  // Use fallback text if no props provided
  const displayTitle = title || t('logo.title');
  const displayDescription = description || t('logo.description');

  return (
    <section className="logo-video-showcase">
      <div className="logo-video-showcase__container">
        <div className="logo-video-showcase__text-content">
          <h1 className="logo-video-showcase__title">
            {displayTitle}
          </h1>
          <p className="logo-video-showcase__description">
            {displayDescription}
          </p>
        </div>
        
        <video
          ref={videoRef}
          className="logo-video-showcase__video"
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Logo;
