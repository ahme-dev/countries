import { Center, Spinner, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Play } from "../components/Play";
import { Answer, FlagsResponse, UserResponse } from "../types";

// types

export function FlagsPage() {
	let navigate = useNavigate();
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
			const res = await fetch(`https://countries-backend.ahmed.systems/flags`);
			console.log(res.body);
			let data = await res.json();
			return data as FlagsResponse;
		},
	});

	const {
		isLoading: userIsLoading,
		error: userError,
		data: userData,
		refetch: userRefetch,
	} = useQuery({
		queryKey: ["getUser"],
		queryFn: async () => {
			let res = await fetch(
				"https://countries-backend.ahmed.systems/users/me",
				{
					credentials: "include",
				},
			);

			console.log(res.body);

			let data = await res.json();
			return data as UserResponse;
		},
		retry: false,
	});

	// add result to users answers
	const mutation = useMutation({
		mutationFn: async (answer: { answer: Answer }) => {
			let jsonAnswer = JSON.stringify(answer);
			let res = await fetch(
				"https://countries-backend.ahmed.systems/users/me/flags",
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: jsonAnswer,
				},
			);

			console.log(res.body);

			if (!res.ok) throw new Error(res.statusText);

			return res;
		},
		onSuccess: () => userRefetch(),
		onError: () =>
			toast({
				title: t("Failed to push answers"),
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

	if (flagsAreLoading || userIsLoading) {
		return <Spinner size={"xl"} m={4}></Spinner>;
	}

	if (mutation.isLoading) {
		return (
			<Center flexDirection={"column"}>
				<Text>{t("Saving answer...")}</Text>
				<Spinner size={"xl"} m={4}></Spinner>
			</Center>
		);
	}

	if (userError || !userData) navigate("/");

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
