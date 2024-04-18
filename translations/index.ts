import { getLocales } from "expo-localization";
import i18n, { LanguageDetectorModule } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import tr from "./tr.json";

const resources = {
  en,
  tr,
};

const RNLanguageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},
  detect: () => {
    const locales = getLocales();
    const firstLocale = locales[0];
    return firstLocale.languageCode ?? "en";
  },
  cacheUserLanguage: () => {},
};

export function setupI18n() {
  i18n
    .use(RNLanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      compatibilityJSON: "v3",
      resources,
      fallbackLng: "en",

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
}
