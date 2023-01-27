import { Center, Spinner, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Play } from "../components/Play";
import { Answer, FlagsResponse, UserResponse } from "../types";

// types

export function Flags() {
	const toast = useToast();
	const { i18n, t } = useTranslation();
	const lang = i18n.language as "en" | "ku";

	// fetch

	// fetch flags data
	const {
		isLoading: flagsAreLoading,
		data: flagsData,
		error: flagsError,
	} = useQuery({
		queryKey: ["getFlags"],
		queryFn: async () => {
			const res = await axios.get(
				`https://countries-backend.ahmed.systems/flags`,
			);
			return res.data as FlagsResponse;
		},
	});

	// fetch user data
	const {
		isLoading: userIsLoading,
		data: userData,
		error: userError,
		refetch: userRefetch,
	} = useQuery({
		queryKey: ["getUser"],
		queryFn: async () => {
			let res = await axios.get("https://countries-backend.ahmed.systems/user");
			return res.data as UserResponse;
		},
	});

	// add result to users answers
	const mutation = useMutation({
		mutationFn: (answer: { answer: Answer }) => {
			return axios.patch(
				"https://countries-backend.ahmed.systems/user/flags",
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

	const handleAnswer = (selected: number) => {
		if (!flagsData || !userData) return;

		// always compare answers in english
		let userAnswerEn = flagsData["en"][userData.flags.index].variants[selected];
		let correctAnswerEn = flagsData["en"][userData.flags.index].answer;
		let isCorrect = userAnswerEn === correctAnswerEn;

		let userAnswer = flagsData[lang][userData.flags.index].variants[selected];
		let correctAnswer = flagsData[lang][userData.flags.index].answer;

		// show toast
		toast({
			title: t(`Answer was ${isCorrect ? "correct" : "incorrect"}`),
			status: isCorrect ? "success" : "error",
			duration: 3000,
			variant: "solid",
		});

		// send data to server
		mutation.mutate({
			answer: {
				flag: flagsData[lang][userData.flags.index].flag,
				correctAnswer,
				userAnswer,
				isCorrect,
			},
		});
	};

	// render

	if (flagsAreLoading) {
		return (
			<Center flexDirection={"column"}>
				<Spinner size={"xl"} m={4}></Spinner>
				<Text>{t("Loading flags data...")}</Text>
			</Center>
		);
	}

	if (userIsLoading) {
		return (
			<Center flexDirection={"column"}>
				<Spinner size={"xl"} m={4}></Spinner>
				<Text>{t("Loading user data...")}</Text>
			</Center>
		);
	}

	if (mutation.isLoading) {
		return (
			<Center flexDirection={"column"}>
				<Text>{t("Saving answer...")}</Text>
				<Spinner size={"xl"} m={4}></Spinner>
			</Center>
		);
	}

	if (flagsError || userError || !flagsData || !userData) {
		return <Text>Couldn't load anything</Text>;
	}

	if (true) {
		return (
			<Play
				flag={flagsData[lang][userData.flags.index].flag}
				variants={flagsData[lang][userData.flags.index].variants}
				handleAnswer={handleAnswer}
				history={userData.flags.answers}
				clearHistory={() => {}}
			/>
		);
	}
}
