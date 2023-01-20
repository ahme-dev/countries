import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	kur: {
		translation: {
			Countries: "وڵاتان",
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "kur",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
