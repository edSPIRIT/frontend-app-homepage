/* eslint-disable import/prefer-default-export */
export const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    released: true,
  },
  {
    code: 'ar',
    name: 'العربية',
    released: true,
  },
  {
    code: 'fa',
    name: 'فارسی',
    released: true,
  },
  {
    code: 'fa-IR',
    name: 'فارسی',
    released: true,
  },
  {
    code: 'de-DE',
    name: 'German',
    released: true,
  },
  {
    code: 'it-IT',
    name: 'Italian',
    released: true,
  },
  {
    code: 'tr-TR',
    name: 'Turkish',
    released: true,
  },
  {
    code: 'es-419',
    name: 'Spanish (Latin America)',
    released: true,
  },
  {
    code: 'pt-PT',
    name: 'Portuguese (Portugal)',
    released: true,
  },
  {
    code: 'ca',
    name: 'Català',
    released: false,
  },
  {
    code: 'es-419',
    name: 'Español (Latinoamérica)',
    released: true,
  },
  {
    code: 'fr',
    name: 'Français',
    released: true,
  },
  {
    code: 'he',
    name: 'עברית',
    released: false,
  },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    released: false,
  },
  {
    code: 'ko-kr',
    name: '한국어 (대한민국)',
    released: false,
  },
  {
    code: 'pl',
    name: 'Polski',
    released: false,
  },
  {
    code: 'pt-br',
    name: 'Português (Brasil)',
    released: false,
  },
  {
    code: 'ru',
    name: 'Русский',
    released: false,
  },
  {
    code: 'th',
    name: 'ไทย',
    released: false,
  },
  {
    code: 'uk',
    name: 'Українська',
    released: false,
  },
  {
    code: 'zh-cn',
    name: '中文 (简体)',
    released: true,
  },
];

export const getLangCode = (langName) => supportedLanguages.find((lang) => lang.name === langName)?.code;
export const getLangName = (langCode) => supportedLanguages.find((lang) => lang.code === langCode)?.name;
export const codeToTitle = (arrayLang) => arrayLang?.map((langCode) => getLangName(langCode));
export const titleToCode = (arrayLang) => arrayLang?.map((langName) => getLangCode(langName));
