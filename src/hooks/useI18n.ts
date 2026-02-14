// Simple i18n hook
import plTranslations from '../locales/pl.json';
import enTranslations from '../locales/en.json';

type LanguageType = 'pl' | 'en';

const translations: Record<LanguageType, typeof plTranslations> = {
  pl: plTranslations,
  en: enTranslations,
};

export const useI18n = () => {
  const lang = (localStorage.getItem('language') || 'pl') as LanguageType;
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const setLanguage = (newLang: LanguageType) => {
    localStorage.setItem('language', newLang);
    window.location.reload();
  };

  return { t, lang, setLanguage };
};
