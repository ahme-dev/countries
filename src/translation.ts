import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	ku: {
		translation: {
			Countries: "وڵاتان",
			Capitals: "پایتەختەکان",
			Flags: "ئاڵاکان",
			"What country does this flag belong to?": "ئەم ئاڵایە ئی چی وڵاتێکە؟",
			"What is the capital of": "پەیتەختی ئەم وڵاتە کوێیە",
			Answer: "وەڵامبدەوە",
			"Answer history": "مێژووی وەڵامەکان",
			Menu: "هەڵبژاردەکان",
			Language: "زمان",
			Theme: "ڕەنگ",
			Close: "دابخە",
			Empty: "بەتاڵ",
			English: "ئینگلیزی",
			Kurdish: "کوردی",
			Eng: "ئنگ",
			Kur: "کرد",
		},
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
