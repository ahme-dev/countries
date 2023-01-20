import { Spinner, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Play } from "../components/Play";
import { Answer, Flag, UserResponse } from "../types";

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
		refetch: userRefetch,
	} = useQuery({
		queryKey: ["getUser"],
		queryFn: async () => {
			let res = await axios.get(
				"https://countries-backend.ahmed.systems/users/ahmed",
			);
			console.log(res.data);
			return res.data as UserResponse;
		},
	});

	const mutation = useMutation({
		mutationFn: (answer: { answer: Answer }) => {
			return axios.patch(
				"https://countries-backend.ahmed.systems/users/ahmed/flags",
				answer,
			);
		},
		onSuccess: () => userRefetch(),
		onError: () =>
			toast({
				title: "Failed to push answers",
				status: "error",
				duration: 3000,
				variant: "solid",
			}),
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

		mutation.mutate({
			answer: {
				flag: flagsData[userData.flags.index].flag,
				correctAnswer: flagsData[userData.flags.index].answer,
				userAnswer: selectedVariant,
				isCorrect: flagsData[userData.flags.index].answer === selectedVariant,
			},
		});
	};

	// render

	if (flagsAreLoading || userIsLoading || mutation.isLoading) {
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
