import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FlagsData {
	flag: string;
	variants: string[];
	answer: string;
}

interface FlagsStore {
	dataIndex: number;
	data: FlagsData[];
	selected: number;
	changeSelected: (num: number) => void;
	check: () => boolean;
	checkResult: boolean;
	next: () => void;
	fetch: () => void;
	fetchDone: boolean;
}

export const useFlagsStore = create<FlagsStore>()(
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

			next: async () => {
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
					"https://shadify.dev/api/countries/country-quiz?amount=20",
				);
				// get data
				const resData: FlagsData[] = await res.json();
				// fix flag sizes
				const resDataFixed = resData.map((el) => ({
					...el,
					flag: el.flag.replace("w320", "256x192"),
				}));
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
