import { Spinner, Text, useToast } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Play } from "../components/Play";

export function Flags() {
	const toast = useToast();

	const queryClient = useQueryClient();
	const {
		isLoading,
		data: flagsData,
		error,
	} = useQuery({
		queryKey: ["getFlag"],
		queryFn: async () => {
			const res = await fetch("https://countries-backend.ahmed.systems/flags");
			const resData = await res.json();
			return resData satisfies {
				flag: string;
				variants: string[];
				answer: string;
			};
		},
	});

	const [index, setIndex] = useState(1);

	const handleAnswer = (selectedVariant: string) => {
		let isCorrect = selectedVariant === flagsData[index].answer;

		toast({
			title: `Answer was ${isCorrect ? "correct" : "incorrect"}`,
			status: isCorrect ? "success" : "error",
			duration: 3000,
			variant: "solid",
		});

		setIndex(index + 1);
	};

	// render

	if (isLoading) {
		return <Spinner size={"xl"} m={4}></Spinner>;
	}

	if (error) {
		return <Text>Couldn't load anything</Text>;
	}

	if (true) {
		return (
			<Play
				flag={flagsData[index].flag}
				variants={flagsData[index].variants}
				handleAnswer={handleAnswer}
				history={[]}
				clearHistory={() => {}}
			/>
		);
	}
}
