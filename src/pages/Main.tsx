import { Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Main() {
	const { t } = useTranslation();

	return (
		<Flex direction={"column"} maxW={"lg"} gap={4}>
			<Heading
				bgGradient={useColorModeValue(
					"linear(to-r, blue.700, purple.800)",
					"linear(to-r, blue.100, purple.200)",
				)}
				bgClip="text"
			>
				{t("Welcome to the Countries app")}
			</Heading>
			<Text>
				{t(
					"We got 2 quiz games, one for guessing the capital of a country, and one for guessing the name of a country by a flag.",
				)}
			</Text>
		</Flex>
	);
}
