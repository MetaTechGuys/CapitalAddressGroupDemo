import React from 'react';
import Image from 'next/image';
import './Cover.scss';

interface CoverProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

const Cover: React.FC<CoverProps> = ({
  src,
  alt,
  width = 1920,
  height = 1080,
  priority = false,
  className = ''
}) => {
  return (
    <section className={`cover ${className}`}>
      <div className="cover__container">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="cover__image"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            filter:'grayscale(1)'
          }}
        />
      </div>
    </section>
  );
};

export default Cover;