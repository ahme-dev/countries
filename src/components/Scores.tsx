import { Flex, Badge, Image, Text, Card } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Answer } from "../types";

export function Scores(props: {
	index: number;
	history: Answer[];
	clearHistory: () => void;
}) {
	const { t } = useTranslation();

	if (props.history.length === 0)
		return (
			<Badge w={"full"} py={1} px={2} borderRadius={"lg"} colorScheme={"blue"}>
				{t("Empty")}
			</Badge>
		);

	return (
		<Card
			rounded={"xl"}
			direction={"column"}
			height={"fit-content"}
			// overflow="hidden"
			p={2}
			gap={4}
		>
			<Text>{t("At question") + " " + (props.index + 1)}</Text>

			<Text>{t("Answer history")}</Text>
			<Flex direction={"column"} gap={2}>
				{[...props.history]
					.slice(0, 3)
					.reverse()
					.map((el, i) => (
						<Card
							w={"full"}
							// using index as key is not optimal
							key={i}
							py={2}
							px={4}
							borderRadius={"lg"}
							variant={"outline"}
							colorScheme={el.isCorrect ? "green" : "red"}
						>
							<Flex
								w={"full"}
								alignItems={"center"}
								overflow={"hidden"}
								gap={2}
							>
								<Image rounded={"full"} boxSize="2rem" src={el.flag} />
								<Flex direction={"column"}>
									{el.isCorrect ? (
										<Text as="b">{el.userAnswer}</Text>
									) : (
										<>
											<Text as="del">{el.userAnswer}</Text>
											<Text as="b">{el.correctAnswer}</Text>
										</>
									)}
								</Flex>
							</Flex>
						</Card>
					))}
			</Flex>
		</Card>
	);
}
