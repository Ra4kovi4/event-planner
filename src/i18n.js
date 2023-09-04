import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./Locales/en/translation";
import { es } from "./Locales/ua/translation";

const resources = {
	en: {
		translation: en,
	},
	ua: {
		translation: es,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
