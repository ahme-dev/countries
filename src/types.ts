export interface Flag {
	flag: string;
	variants: string[];
	answer: string;
}

export type FlagWithoutAnswer = Omit<Flag, "answer">;

export interface Capital {
	flag: string;
	variants: string[];
	answer: string;
}

export type CapitalWithoutAnswer = Omit<Capital, "answer">;

export interface Answer {
	correctAnswer: boolean;
	userAnswer: string;
	isCorrect: string;
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
