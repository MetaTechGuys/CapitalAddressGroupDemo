// Map countries to supported languages
export const countryToLanguageMap: { [key: string]: string } = {
  // Persian/Farsi speaking countries
  'IR': 'fa', // Iran
  'AF': 'fa', // Afghanistan (also speaks Persian)
  'TJ': 'fa', // Tajikistan (also speaks Persian)
  
  // Arabic speaking countries
  'SA': 'ar', // Saudi Arabia
  'AE': 'ar', // UAE
  'EG': 'ar', // Egypt
  'JO': 'ar', // Jordan
  'LB': 'ar', // Lebanon
  'SY': 'ar', // Syria
  'IQ': 'ar', // Iraq
  'KW': 'ar', // Kuwait
  'QA': 'ar', // Qatar
  'BH': 'ar', // Bahrain
  'OM': 'ar', // Oman
  'YE': 'ar', // Yemen
  'LY': 'ar', // Libya
  'TN': 'ar', // Tunisia
  'DZ': 'ar', // Algeria
  'MA': 'ar', // Morocco
  'SD': 'ar', // Sudan
  'PS': 'ar', // Palestine
  
  // German speaking countries
  'DE': 'de', // Germany
  'AT': 'de', // Austria
  'CH': 'de', // Switzerland (also German)
  'LI': 'de', // Liechtenstein
  'LU': 'de', // Luxembourg (also German)
  
  // Chinese speaking countries/regions
  'CN': 'zh', // China
  'TW': 'zh', // Taiwan
  'HK': 'zh', // Hong Kong
  'MO': 'zh', // Macau
  'SG': 'zh', // Singapore (also Chinese)
  
  // Default to English for other countries
  'US': 'en', // United States
  'GB': 'en', // United Kingdom
  'CA': 'en', // Canada
  'AU': 'en', // Australia
  'NZ': 'en', // New Zealand
  'IE': 'en', // Ireland
  'ZA': 'en', // South Africa
  'IN': 'en', // India
  'PK': 'en', // Pakistan
  'BD': 'en', // Bangladesh
  'NG': 'en', // Nigeria
  'KE': 'en', // Kenya
  'GH': 'en', // Ghana
  'UG': 'en', // Uganda
  'TZ': 'en', // Tanzania
  'ZW': 'en', // Zimbabwe
  'BW': 'en', // Botswana
  'ZM': 'en', // Zambia
  'MW': 'en', // Malawi
  'SZ': 'en', // Eswatini
  'LS': 'en', // Lesotho
  'NA': 'en', // Namibia
  'MU': 'en', // Mauritius
  'SC': 'en', // Seychelles
  'FJ': 'en', // Fiji
  'PG': 'en', // Papua New Guinea
  'SB': 'en', // Solomon Islands
  'VU': 'en', // Vanuatu
  'WS': 'en', // Samoa
  'TO': 'en', // Tonga
  'KI': 'en', // Kiribati
  'TV': 'en', // Tuvalu
  'NR': 'en', // Nauru
  'PW': 'en', // Palau
  'MH': 'en', // Marshall Islands
  'FM': 'en', // Micronesia
};

export const getLanguageFromCountry = (countryCode: string): string => {
  return countryToLanguageMap[countryCode.toUpperCase()] || 'en';
};

// Fallback: detect language from browser locale
export const getLanguageFromBrowserLocale = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const locale = navigator.language || navigator.languages?.[0] || 'en';
  const languageCode = locale.split('-')[0].toLowerCase();
  
  // Map browser language codes to our supported languages
  const browserLanguageMap: { [key: string]: string } = {
    'fa': 'fa',
    'ar': 'ar',
    'de': 'de',
    'zh': 'zh',
    'en': 'en'
  };
  
  return browserLanguageMap[languageCode] || 'en';
};