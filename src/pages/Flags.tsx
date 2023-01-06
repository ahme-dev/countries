import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Flex,
	Heading,
	Image,
	Spinner,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useFlagsStore } from "../data/flags";

export function Flags() {
	// state
	const { data, fetch } = useFlagsStore();

	useEffect(() => {
		fetch();
	}, []);

	if (!data.answer) return <Spinner></Spinner>;

	return (
		<Card
			rounded={"xl"}
			bgGradient={useColorModeValue(
				"linear(to-r, blue.100, purple.200)",
				"linear(to-r, blue.700, purple.800)",
			)}
			direction={{ base: "column", sm: "row" }}
			alignItems="center"
			overflow="hidden"
		>
			<Image
				m={4}
				maxW={"xs"}
				objectFit="cover"
				src={data.flag}
				alt={`Unknown Flag`}
			/>
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>What country does this flag belong to?</Heading>
					<ButtonGroup flexWrap={"wrap"} gap={4}>
						{data.variants.map((el, i) => (
							<Button key={i}>{el}</Button>
						))}
					</ButtonGroup>
				</Flex>
			</CardBody>
		</Card>
	);
}
