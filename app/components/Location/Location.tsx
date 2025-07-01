'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Location.scss';

interface LocationProps {
  title?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  mapHeight?: string;
  showDirectionsButton?: boolean;
  address?: string;
  onBackToContactDetails?: () => void;
}

const Location: React.FC<LocationProps> = ({
  title,
  description,
  latitude = 35.6892,
  longitude = 51.3890,
  zoom = 15,
  mapHeight = '400px',
  showDirectionsButton = true,
  address,
  onBackToContactDetails
}) => {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import react-leaflet components only on client side
    const loadMapComponents = async () => {
      if (typeof window !== 'undefined') {
        try {
          const [
            { MapContainer, TileLayer, Marker, Popup },
            { Icon }
          ] = await Promise.all([
            import('react-leaflet'),
            import('leaflet')
          ]);
          
          // Import leaflet CSS
          require('leaflet/dist/leaflet.css');
          
          setMapComponents({ MapContainer, TileLayer, Marker, Popup, Icon });
        } catch (error) {
          console.error('Failed to load map components:', error);
        }
      }
    };

    loadMapComponents();
  }, []);

  const handleGetDirections = () => {
    if (typeof window !== 'undefined') {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(url, '_blank');
    }
  };

  const handleOpenInMaps = () => {
    if (typeof window !== 'undefined') {
      const url = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=${zoom}`;
      window.open(url, '_blank');
    }
  };

  const handleOpenInGoogleMaps = () => {
    if (typeof window !== 'undefined') {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, '_blank');
    }
  };

  const handleCopyCoordinates = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const coordinates = `${latitude}, ${longitude}`;
      navigator.clipboard.writeText(coordinates).then(() => {
        alert(t('location.coordinatesCopied'));
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = coordinates;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(t('location.coordinatesCopied'));
      });
    }
  };

  // Render loading state while components are loading
  if (!isClient || !MapComponents) {
    return (
      <div className="location">
        <div className="location__header">
          <h2 className="location__title">
            {title || t('location.title')}
          </h2>
          <p className="location__description">
            {description || t('location.description')}
          </p>
        </div>
        <div className="location__loading">
          <div className="location__spinner"></div>
          <p>{t('location.loading')}</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Icon } = MapComponents;

  // Custom marker icon - only create when components are loaded
  const customIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path fill="#007bff" stroke="#fff" stroke-width="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5S25 25 25 12.5C25 5.596 19.404 0 12.5 0z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="6"/>
      </svg>
    `),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="location">
      <div className="location__header">
        <h2 className="location__title">
          {title || t('location.title')}
        </h2>
        <p className="location__description">
          {description || t('location.description')}
        </p>
      </div>

      <div className="location__map-container">
        <MapContainer
          center={[latitude, longitude]}
          zoom={zoom}
          style={{ height: mapHeight, width: '100%' }}
          className="location__map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={customIcon}>
            <Popup>
              <div className="location__popup">
                <h3>{title || t('location.title')}</h3>
                <p>{description || t('location.description')}</p>
                {address && <p><strong>{t('location.address')}:</strong> {address}</p>}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="location__actions">
        {showDirectionsButton && (
          <>
            <button 
              className="location__button location__button--primary"
              onClick={handleGetDirections}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {t('location.getDirections')}
            </button>
            
            <button 
              className="location__button location__button--secondary"
              onClick={handleOpenInMaps}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {t('location.openInOSM')}
            </button>

            <button 
              className="location__button location__button--secondary"
              onClick={handleOpenInGoogleMaps}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {t('location.openInGoogleMaps')}
            </button>
          </>
        )}
      </div>

      <div className="location__info">
        <div className="location__coordinates">
          <strong>{t('location.coordinates')}:</strong> 
          <span className="location__coordinates-value" onClick={handleCopyCoordinates}>
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </span>
          <button 
            className="location__copy-btn"
            onClick={handleCopyCoordinates}
            title={t('location.copyCoordinates')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
          </button>
        </div>
        
        {address && (
          <div className="location__address">
            <strong>{t('location.address')}:</strong> {address}
          </div>
        )}
      </div>

      {/* Back to Contact Details Button - Fixed Position */}
      {onBackToContactDetails && (
        <button 
          className="location__back-btn"
          onClick={() => {
            console.log('Back button clicked');
            onBackToContactDetails();
          }}
          aria-label="Back to Contact Details"
        >
          <svg 
            className="location__back-arrow" 
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
  );
};

export default Location;