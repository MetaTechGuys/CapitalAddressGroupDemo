import React, { useRef, useEffect } from 'react';
import './BlogCover.scss';

interface blogCoverProps {
  videoSrc?: string;
  posterImage?: string;
}

const BlogCover: React.FC<blogCoverProps> = ({
  videoSrc = "/videos/blog-cover.webm",
  posterImage = "/images/blog-cover-poster.jpg"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  return (
    <div className="blog-cover">
      <video
        ref={videoRef}
        className="blog-cover__video"
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

export default BlogCover;
