import {
	Button,
	ButtonGroup,
	Flex,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Auth } from "../components/Auth";

export function MainPage() {
	const { t } = useTranslation();

	return (
		<Flex direction={{ base: "column", md: "row" }} gap={16}>
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
					)}{" "}
					{t(
						"Your score here will be saved after registering and logging in with an account.",
					)}
				</Text>

				<ButtonGroup>
					<Link to={"/flags"}>
						<Button>{t("Flags")}</Button>
					</Link>
				</ButtonGroup>
			</Flex>
			<Auth></Auth>
		</Flex>
	);
}
