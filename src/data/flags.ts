import create from "zustand";

interface FlagsData {
	flag: string;
	variants: string[];
	answer: string;
}

interface FlagsStore {
	data: FlagsData;
	fetch: () => void;
}

export const useFlagsStore = create<FlagsStore>((set) => ({
	data: { country: "", flag: "", variants: [""], answer: "" },
	fetch: async () => {
		const res = await fetch("https://shadify.dev/api/countries/country-quiz");
		const resData: FlagsData = await res.json();
		set({
			data: {
				...resData,
				flag: resData.flag.replace("w320", "256x192"),
			},
		});
	},
}));
