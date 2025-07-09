import React, { useRef, useEffect } from 'react';
import './CoVid.scss';

interface CoVidProps {
  videoSrc?: string;
  posterImage?: string;
}

const CoVid: React.FC<CoVidProps> = ({
  videoSrc = "/videos/co-vid-cover.webm",
  posterImage = "/images/co-vid-cover-poster.jpg"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  return (
    <div className="co-vid">
      <video
        ref={videoRef}
        className="co-vid__video"
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

export default CoVid;
