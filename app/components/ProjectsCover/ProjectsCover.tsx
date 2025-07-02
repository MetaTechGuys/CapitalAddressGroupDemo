import React, { useRef, useEffect } from 'react';
import './ProjectsCover.scss';

interface ProjectsCoverProps {
  videoSrc?: string;
  posterImage?: string;
}

const ProjectsCover: React.FC<ProjectsCoverProps> = ({
  videoSrc = "/videos/projects-cover.webm",
  posterImage = "/images/projects-cover-poster.jpg"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
    }
  }, []);

  return (
    <div className="projects-cover">
      <video
        ref={videoRef}
        className="projects-cover__video"
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

export default ProjectsCover;