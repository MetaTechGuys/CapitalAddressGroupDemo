import React, { useRef, useEffect } from 'react';
import './ContactCover.scss';

interface ContactCoverProps {
  videoSrc?: string;
  posterImage?: string;
}

const ContactCover: React.FC<ContactCoverProps> = ({
  videoSrc = "/videos/contact-cover.webm",
  posterImage = "/images/contact-cover-poster.jpg"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  return (
    <div className="contact-cover">
      <video
        ref={videoRef}
        className="contact-cover__video"
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
      >
        <source src={videoSrc} type="video/webm" />
      </video>
    </div>
  );
};

export default ContactCover;
