import { Spinner, Text, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Play } from "../components/Play";

export function Flags() {
	const toast = useToast();

	// server data

	// const queryClient = useQueryClient();
	const {
		isLoading,
		data: flagData,
		error,
	} = useQuery({
		queryKey: ["getFlag"],
		queryFn: async () => {
			const res = await fetch(
				"https://countries-backend.ahmed.systems/flags/2",
			);
			const resData = await res.json();
			return resData satisfies { flag: string; variants: string[] };
		},
	});

	const { refetch } = useQuery({
		queryKey: ["getFlagAnswer"],
		queryFn: async () => {
			const res = await fetch(
				`https://countries-backend.ahmed.systems/flags/2?answer=${flagData.variants[0]}`,
			);
			const resData = await res.json();
			return resData satisfies string;
		},
		onSuccess: (parData) => {
			toast({
				title: `Answer was ${parData.isCorrect ? "correct" : "incorrect"}`,
				status: parData.isCorrect ? "success" : "error",
				duration: 3000,
				variant: "solid",
			});
		},
		enabled: false,
	});

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
				{...flagData}
				handleAnswer={() => refetch()}
				history={[]}
				clearHistory={() => {}}
			/>
		);
	}
}
