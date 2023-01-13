import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CapitalsData {
	country: string;
	flag: string;
	variants: string[];
	answer: string;
}

interface CapitalsHistoryData {
	country: string;
	flag: string;
	variants: string[];
	answer: string;
	userAnswer: string;
	wasCorrect: boolean;
}

interface CapitalsStore {
	dataIndex: number;
	data: CapitalsData[];

	selected: number;
	changeSelected: (num: number) => void;

	check: () => boolean;
	checkResult: boolean;

	history: CapitalsHistoryData[];
	addToHistory: () => void;
	clearHistory: () => void;

	next: () => void;
	fetch: () => void;
	fetchDone: boolean;
}

export const useCapitalsStore = create<CapitalsStore>()(
	persist(
		(set, get) => ({
			dataIndex: 0,
			data: [{ country: "", flag: "", variants: [""], answer: "" }],

			selected: -1,
			changeSelected: (num: number) => {
				// if already selected unselect
				if (get().selected === num) return set({ selected: -1 });

				set({ selected: num });
			},

			check: () => {
				const wasCorrect =
					get().data[get().dataIndex].answer ===
					get().data[get().dataIndex].variants[get().selected];

				set({ checkResult: wasCorrect });

				return wasCorrect;
			},
			checkResult: false,

			history: [],
			addToHistory: () => {
				const newItem = {
					country: get().data[get().dataIndex].country,
					flag: get().data[get().dataIndex].flag.replace("256x192", "80x60"),
					variants: get().data[get().dataIndex].variants,
					answer: get().data[get().dataIndex].answer,
					userAnswer: get().data[get().dataIndex].variants[get().selected],
					wasCorrect: get().checkResult,
				};

				set({ history: [...get().history, newItem] });
			},
			clearHistory: () => {
				set({ history: [] });
			},

			next: async () => {
				get().addToHistory();

				// if reached the end refetch and set to zero
				if (get().dataIndex == 19) {
					get().fetch();
					set({ dataIndex: 0 });
				}

				// else increase by one
				set((state) => {
					return { selected: -1, dataIndex: state.dataIndex + 1 };
				});
			},

			fetchDone: false,
			fetch: async () => {
				const res = await fetch(
					"https://shadify.dev/api/countries/capital-quiz?amount=20",
				);
				// get data
				const resData: CapitalsData[] = await res.json();
				// fix flag sizes
				const resDataFixed = resData.map((el) => {
					console.log(el.country);
					return {
						...el,
						flag: el.flag.replace("w320", "256x192"),
					};
				});
				// set fetchDone and new data in zustand
				set({
					fetchDone: true,
					data: [...resDataFixed],
				});
			},
		}),

		{
			name: "flagsData",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
