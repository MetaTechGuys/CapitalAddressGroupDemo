'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../translations';
import { getLanguageFromCountry, getLanguageFromBrowserLocale } from '../utils/locationLanguageMap';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

type TranslationValue = string | { [key: string]: TranslationValue };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Get initial language synchronously from available sources
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    
    // Check localStorage first (synchronous)
    const savedLanguage = localStorage.getItem('language');
    const hasManualSelection = localStorage.getItem('hasManualLanguageSelection');
    
    if (savedLanguage && hasManualSelection === 'true') {
      return savedLanguage as Language;
    }
    
    // Fallback to browser locale (synchronous)
    return getLanguageFromBrowserLocale() as Language;
  };

  // Detect location-based language (asynchronous)
  const detectLocationLanguage = async (): Promise<Language> => {
    try {
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.country_code) {
          return getLanguageFromCountry(data.country_code) as Language;
        }
      }
    } catch (error) {
      console.log('IP geolocation failed:', error);
    }
    
    return getLanguageFromBrowserLocale() as Language;
  };

  // Initialize immediately with synchronous detection
  useEffect(() => {
    const initLanguage = getInitialLanguage();
    setCurrentLanguage(initLanguage);
    updateDocumentLanguage(initLanguage);
    setIsMounted(true);
    setIsLoading(false);
  }, []);

  // Then enhance with location detection (if not manually set)
  useEffect(() => {
    if (!isMounted) return;
    
    const hasManualSelection = localStorage.getItem('hasManualLanguageSelection');
    if (hasManualSelection === 'true') return;

    const enhanceWithLocation = async () => {
      const locationLanguage = await detectLocationLanguage();
      if (locationLanguage !== currentLanguage) {
        setCurrentLanguage(locationLanguage);
        updateDocumentLanguage(locationLanguage);
        localStorage.setItem('language', locationLanguage);
      }
    };

    enhanceWithLocation();
  }, [isMounted, currentLanguage]);

  const updateDocumentLanguage = (language: Language) => {
    if (typeof document === 'undefined') return;
    
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = (language === 'ar' || language === 'fa') ? 'rtl' : 'ltr';
  };

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    updateDocumentLanguage(language);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', language);
      localStorage.setItem('hasManualLanguageSelection', 'true');
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: TranslationValue = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key;
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      t, 
      isLoading 
    }}>
      {/* Suppress hydration warning for language-dependent content */}
      <div suppressHydrationWarning>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
