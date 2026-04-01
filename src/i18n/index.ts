import { zhTranslations } from './translations/zh';
import { enTranslations } from './translations/en';

export const translations = {
  zh: zhTranslations,
  en: enTranslations
};

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof zhTranslations;

export function getTranslation(lang: Language) {
  return translations[lang];
}
