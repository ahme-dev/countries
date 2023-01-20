import { CheckCircleIcon, DeleteIcon, TimeIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Answer } from "../types";
import { PlayHistory } from "./PlayHistory";

export function Play(props: {
	country?: string;
	flag: string;
	variants: string[];
	history: Answer[];
	clearHistory: () => void;
	handleAnswer: (selected: string) => void;
}) {
	const { t } = useTranslation();
	const [selected, setSelected] = useState(1);
	const changeSelected = (num: number) => {
		// if already selected unselect
		if (selected === num) setSelected(selected);
		setSelected(num);
	};

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
					src={props.flag}
					alt={`Unknown Flag`}
				/>
			</Center>
			{/* Flag end */}

			{/* Body */}
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					{/* Question Text */}
					<Heading size={"md"}>
						{props.country
							? t("What is the capital of") + props.country + "?"
							: t("What country does this flag belong to?")}
					</Heading>
					{/* Question Text End */}

					{/* Choices */}
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
						{props.variants.map((el: any, i: number) => (
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
						{/* History */}
						<PlayHistory
							history={props.history}
							clearHistory={props.clearHistory}
						/>
						{/* History end */}

						{/* Answer button */}
						<Button
							w={"full"}
							onClick={() => props.handleAnswer(props.variants[selected])}
							leftIcon={<CheckCircleIcon />}
						>
							{t("Answer")}
						</Button>
						{/* Answer button end */}
					</Flex>
				</Flex>
			</CardBody>
			{/* Body end */}
		</Card>
	);
}
