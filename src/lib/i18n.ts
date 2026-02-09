import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          common: {
            loading: 'Loading...',
            error: 'An error occurred',
            save: 'Save',
            cancel: 'Cancel',
            welcome: 'Welcome to User Management Dashboard',
          },
        },
      },
      es: {
        translation: {
          common: {
            loading: 'Cargando...',
            error: 'Ocurrió un error',
            save: 'Guardar',
            cancel: 'Cancelar',
            welcome: 'Bienvenido al Panel de Gestión de Usuarios',
          },
        },
      },
    },
  });

export default i18n;
