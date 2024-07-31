import { createI18n } from 'vue-i18n';
import en from '@/providers/core/locale/en.json';
import zh from '@/providers/core/locale/zh.json';

const messages = {
  en,
  'zh':zh
};

const i18nConfig = {
  locale: uni.getLocale() || 'zh', messages
};


const i18n = createI18n(i18nConfig);


export default i18n;

