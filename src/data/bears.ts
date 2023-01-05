import create from "zustand";

interface BearState {
	bears: number;
	inc: () => void;
	zero: () => void;
}

export const useBearStore = create<BearState>((set) => ({
	bears: 0,
	inc: () => set((state) => ({ bears: state.bears + 1 })),
	zero: () => set({ bears: 0 }),
}));
