export interface Flag {
	flag: string;
	variants: string[];
	answer: string;
}

export type FlagWithoutAnswer = Omit<Flag, "answer">;

export interface Capital {
	country: string;
	flag: string;
	variants: string[];
	answer: string;
}

export type CapitalWithoutAnswer = Omit<Capital, "answer">;

export interface Answer {
	correctAnswer: string;
	userAnswer: string;
	isCorrect: boolean;
	flag: string;
}

export interface UserResponse {
	username: string;
	flags: {
		index: number;
		answers: Answer[];
	};
	capitals: {
		index: number;
		results: Answer[];
	};
}
