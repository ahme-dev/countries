import { useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
	Center,
	Button,
	Card,
	CardBody,
	Flex,
	Heading,
	Image,
	SimpleGrid,
	Spinner,
	useColorModeValue,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export function Flags() {
	const toast = useToast();

	// server data

	// const queryClient = useQueryClient();
	const { isLoading, data, error } = useQuery({
		queryKey: ["getFlag"],
		queryFn: async () => {
			const res = await fetch(
				"https://countries-backend.ahmed.systems/flags/2",
			);
			const resData = await res.json();
			return resData;
		},
	});

	const { refetch } = useQuery({
		queryKey: ["getFlagAnswer"],
		queryFn: async () => {
			const res = await fetch(
				`https://countries-backend.ahmed.systems/flags/2?answer=${data.variants[selected]}`,
			);
			const resData = await res.json();
			return resData;
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

	// local state

	const [selected, setSelected] = useState(-1);
	const changeSelected = (num: number) => {
		// if already selected unselect
		if (selected === num) setSelected(selected);
		setSelected(num);
	};

	const handleAnswer = () => refetch();

	// render

	if (isLoading) {
		return <Spinner size={"xl"} m={4}></Spinner>;
	}

	if (error) {
		return <Text>Couldn't load anything</Text>;
	}

	return (
		<Card
			rounded={"xl"}
			bgGradient={useColorModeValue(
				"linear(to-r, blue.100, purple.200)",
				"linear(to-r, blue.700, purple.800)",
			)}
			direction={{ base: "column", sm: "row" }}
			alignItems="center"
			// overflow="hidden"
			p={2}
		>
			{/* Flag */}
			<Center
				bg={useColorModeValue("gray.100", "gray.800")}
				m={4}
				rounded={"xl"}
			>
				<Image
					m={4}
					maxW={"xs"}
					fallback={<Spinner size={"xl"} m={4}></Spinner>}
					objectFit="cover"
					src={data.flag}
					alt={`Unknown Flag`}
				/>
			</Center>
			{/* Flag end */}

			{/* Body */}
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>What country does this flag belong to?</Heading>
					{/* Choices */}
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
						{data.variants.map((el: any, i: number) => (
							<Button
								onClick={() => changeSelected(i)}
								key={i}
								borderColor={selected === i ? "purple.400" : "transparent"}
								borderWidth={selected === i ? 2 : 0}
							>
								{el}
							</Button>
						))}
					</SimpleGrid>
					{/* Choices end */}

					<Flex justifyContent={"center"} gap={2}>
						{/* Answer button */}
						<Button
							w={"full"}
							onClick={() => handleAnswer()}
							leftIcon={<CheckCircleIcon />}
						>
							Answer
						</Button>
						{/* Answer button end */}
					</Flex>
				</Flex>
			</CardBody>
			{/* Body end */}
		</Card>
	);
}
