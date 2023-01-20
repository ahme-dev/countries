import { Spinner, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Play } from "../components/Play";
import { Flag, UserResponse } from "../types";

// types

export function Flags() {
	const toast = useToast();

	// fetch

	const {
		isLoading: flagsAreLoading,
		data: flagsData,
		error: flagsError,
	} = useQuery({
		queryKey: ["getFlags"],
		queryFn: async () => {
			const res = await fetch(
				"https://countries-backend.ahmed.systems/flags/en",
			);
			const resData = await res.json();
			return resData as Flag[];
		},
	});

	const {
		isLoading: userIsLoading,
		data: userData,
		error: userError,
	} = useQuery({
		queryKey: ["getUser"],
		queryFn: async () => {
			const res = await fetch(
				"https://countries-backend.ahmed.systems/users/ahmed",
			);
			const resData = await res.json();
			return resData as UserResponse;
		},
	});

	// handle

	const handleAnswer = (selectedVariant: string) => {
		if (!flagsData || !userData) return;

		let isCorrect = selectedVariant === flagsData[userData.flags.index].answer;

		toast({
			title: `Answer was ${isCorrect ? "correct" : "incorrect"}`,
			status: isCorrect ? "success" : "error",
			duration: 3000,
			variant: "solid",
		});
	};

	// render

	if (flagsAreLoading || userIsLoading) {
		return <Spinner size={"xl"} m={4}></Spinner>;
	}

	if (flagsError || userError || !flagsData || !userData) {
		return <Text>Couldn't load anything</Text>;
	}

	if (true) {
		return (
			<Play
				flag={flagsData[userData.flags.index].flag}
				variants={flagsData[userData.flags.index].variants}
				handleAnswer={handleAnswer}
				history={userData.flags.answers}
				clearHistory={() => {}}
			/>
		);
	}
}
