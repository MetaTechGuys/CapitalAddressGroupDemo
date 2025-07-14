'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ClientMetadata() {
  const [mounted, setMounted] = useState(false);
  const { t, currentLanguage: language } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Debug logging
    console.log('Current language:', language);
    console.log('Title translation:', t('metadata.title'));
    console.log('Description translation:', t('metadata.description'));

    // Use the same t function pattern as News component
    const title = t('metadata.title');
    const description = t('metadata.description');
    
    // Only update if we have valid translations
    if (title && title !== 'metadata.title') {
      document.title = title;
    }
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = language === 'fa' ? 'fa' : 'en';
    
    // Update HTML dir attribute for RTL
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    
  }, [mounted, t, language]); // Add language to dependencies

  // Prevent hydration mismatch - same as News component
  if (!mounted) {
    return null;
  }

  return null;
}