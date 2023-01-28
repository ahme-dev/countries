import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

const resources = {
	ku: {
		translation: {
			Countries: "وڵاتان",
			Capitals: "پایتەختەکان",
			Flags: "ئاڵاکان",

			"What country does this flag belong to?": "ئەم ئاڵایە ئی چی وڵاتێکە؟",
			"What is the capital of": "پەیتەختی ئەم وڵاتە کوێیە",

			"Answer was correct": "وەڵامەکە ڕاستبوو",
			"Answer was incorrect": "وەڵامەکە هەڵەبوو",

			Answer: "وەڵامبدەوە",
			"Answer history": "مێژووی وەڵامەکان",

			"Loading user data...": "وا زانیاری بەکارهێنەر ڕائەکێشرێ...",
			"Loading flags data...": "وا زانیاری ئاڵاکان ڕائەکێشرێ...",
			"Saving answer...": "وا وەڵامەکە خەزنئەکرێت...",

			"Welcome to the Countries app": "بەخێربێیت بۆ ئاپی وڵاتان",
			"We got 2 quiz games, one for guessing the capital of a country, and one for guessing the name of a country by a flag.":
				"دوو یاریمان هەیە، یەکێکیان بۆ زانینی پایتەختی وڵاتێک، دانەیەکیش بۆ زانینی ناوی وڵاتێک بە ئاڵاکەیا.",

			Menu: "هەڵبژاردەکان",
			Language: "زمان",
			Theme: "ڕەنگ",
			Close: "دابخە",
			Empty: "بەتاڵ",

			English: "ئینگلیزی",
			Kurdish: "کوردی",
			Eng: "ئنگ",
			Kur: "کرد",

			Login: "بچۆرە ناوەوە",
			Register: "ئەکاونت دروستبکە",
			Username: "ناوی بەکارهێنەر",
			Password: "وشەی نهێنی",
			Authenticate: "خۆت بناسێنە"
		},
	},
};

i18n
	.use(detector)
	.use(initReactI18next)
	.init({
		resources,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
