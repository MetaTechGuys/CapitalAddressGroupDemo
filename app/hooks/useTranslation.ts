import { useLanguage } from '../contexts/LanguageContext';

export function useTranslation() {
  const { t, currentLanguage } = useLanguage();
  
  return {
    t,
    currentLanguage,
    isRTL: currentLanguage === 'fa' || currentLanguage === 'ar',
  };
}
