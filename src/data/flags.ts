import create from "zustand";

interface FlagsData {
	flag: string;
	variants: string[];
	answer: string;
}

interface FlagsStore {
	dataIndex: number;
	data: FlagsData[];
	check: (choiceNum: number) => void;
	checkResult: boolean;
	next: () => void;
	fetch: () => void;
}

export const useFlagsStore = create<FlagsStore>((set, get) => ({
	dataIndex: 0,
	data: [{ country: "", flag: "", variants: [""], answer: "" }],
	checkResult: false,

	next: async () => {
		// if reached the end refetch and set to zero
		if (get().dataIndex == 19) {
			get().fetch();
			set({ dataIndex: 0 });
		}

		// else increase by one
		set((state) => {
			return { dataIndex: state.dataIndex + 1 };
		});
	},

	check: (choiceNum: number) => {
		const wasCorrect =
			get().data[get().dataIndex].answer ===
			get().data[get().dataIndex].variants[choiceNum];

		set({ checkResult: wasCorrect });
	},

	fetch: async () => {
		const res = await fetch(
			"https://shadify.dev/api/countries/country-quiz?amount=20",
		);
		// get data
		const resData: FlagsData[] = await res.json();
		// fix flag sizes
		const resDataFixed = resData.map((el) => ({
			...el,
			flag: el.flag.replace("w320", "256x192"),
		}));
		// set new data in zustand
		set({
			data: [...resDataFixed],
		});
	},
}));
