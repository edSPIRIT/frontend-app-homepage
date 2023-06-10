/* eslint-disable import/prefer-default-export */
export const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    released: true,
  },
  {
    code: 'ar',
    name: 'Arabic',
    released: true,
  },
  {
    code: 'fa',
    name: 'Persian',
    released: true,
  },
  {
    code: 'fr',
    name: 'French',
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
];

export const getLangCode = (langName) => supportedLanguages.find((lang) => lang.name === langName).code;
export const getLangName = (langCode) => supportedLanguages.find((lang) => lang.code === langCode).name;
export const codeToTitle = (arrayLang) => arrayLang?.map((langCode) => getLangName(langCode));
export const titleToCode = (arrayLang) => arrayLang?.map((langName) => getLangCode(langName));
