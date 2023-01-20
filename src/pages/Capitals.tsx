import { Spinner, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Play } from "../components/Play";
import { Answer, Capital, UserResponse } from "../types";

// types

export function Capitals() {
	const toast = useToast();
	const { t } = useTranslation();

	// fetch

	const {
		isLoading: capitalsAreLoading,
		data: capitalsData,
		error: capitalsError,
	} = useQuery({
		queryKey: ["getFlags"],
		queryFn: async () => {
			const res = await fetch(
				"https://countries-backend.ahmed.systems/capitals/en",
			);
			const resData = await res.json();
			return resData as Capital[];
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
			return res.data as UserResponse;
		},
	});

	const mutation = useMutation({
		mutationFn: (answer: { answer: Answer }) => {
			return axios.patch(
				"https://countries-backend.ahmed.systems/users/ahmed/capitals",
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
		if (!capitalsData || !userData) return;

		let isCorrect =
			selectedVariant === capitalsData[userData.capitals.index].answer;

		toast({
			title: t(`Answer was ${isCorrect ? "correct" : "incorrect"}`),
			status: isCorrect ? "success" : "error",
			duration: 3000,
			variant: "solid",
		});

		mutation.mutate({
			answer: {
				flag: capitalsData[userData.capitals.index].flag,
				correctAnswer: capitalsData[userData.capitals.index].answer,
				userAnswer: selectedVariant,
				isCorrect:
					capitalsData[userData.capitals.index].answer === selectedVariant,
			},
		});
	};

	// render

	if (capitalsAreLoading || userIsLoading || mutation.isLoading) {
		return <Spinner size={"xl"} m={4}></Spinner>;
	}

	if (capitalsError || userError || !capitalsData || !userData) {
		return <Text>Couldn't load anything</Text>;
	}

	if (true) {
		return (
			<Play
				country={capitalsData[userData.capitals.index].country}
				flag={capitalsData[userData.capitals.index].flag}
				variants={capitalsData[userData.capitals.index].variants}
				handleAnswer={handleAnswer}
				history={userData.capitals.answers}
				clearHistory={() => {}}
			/>
		);
	}
}
