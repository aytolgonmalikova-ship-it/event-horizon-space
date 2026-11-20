import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ui } from './ui';

export const LANGS = [
  { code: 'ru', label: 'RU', name: 'Русский', htmlLang: 'ru', locale: 'ru-RU' },
  { code: 'en', label: 'EN', name: 'English', htmlLang: 'en', locale: 'en-US' },
  { code: 'kg', label: 'KG', name: 'Кыргызча', htmlLang: 'ky', locale: 'ky-KG' },
];

const STORAGE_KEY = 'gorizont.lang';
const LanguageContext = createContext(null);

function readStoredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.some((l) => l.code === saved)) return saved;
  } catch {
    /* storage unavailable (private mode) — fall through */
  }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || '';
  if (nav.startsWith('ky')) return 'kg';
  if (nav.startsWith('en')) return 'en';
  return 'ru';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const meta = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    document.documentElement.lang = meta.htmlLang;
  }, [meta]);

  const value = useMemo(() => {
    /** UI string by key, with {placeholders} */
    const t = (key, vars) => {
      const entry = ui[key];
      let str = entry ? entry[lang] ?? entry.ru ?? key : key;
      if (vars) for (const [k, v] of Object.entries(vars)) str = str.replaceAll(`{${k}}`, v);
      return str;
    };
    /** Pick the current language from a {ru, en, kg} object from the data files */
    const tr = (obj) => {
      if (obj == null) return '';
      if (typeof obj === 'string' || typeof obj === 'number') return obj;
      return obj[lang] ?? obj.en ?? obj.ru ?? '';
    };
    const nf = (n, opts) => new Intl.NumberFormat(meta.locale, opts).format(n);
    return { lang, setLang, t, tr, nf, locale: meta.locale };
  }, [lang, setLang, meta]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
