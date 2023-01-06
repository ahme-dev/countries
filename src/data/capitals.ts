import create from "zustand";

interface CapitalsData {
	country: string;
	flag: string;
	variants: string[];
	answer: string;
}

interface CapitalsStore {
	data: CapitalsData;
	fetch: () => void;
}

export const useBearStore = create<CapitalsStore>((set) => ({
	data: { country: "", flag: "", variants: [""], answer: "" },
	fetch: async () => {
		const res = await fetch("https://shadify.dev/api/countries/capital-quiz");
		const resData: CapitalsData = await res.json();
		set({
			data: {
				...resData,
				flag: resData.flag.replace("w320", "256x192"),
			},
		});
	},
}));
