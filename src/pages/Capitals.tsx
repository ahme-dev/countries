import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Flex,
	Heading,
	Image,
	SimpleGrid,
	Spinner,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useCapitalsStore } from "../data/capitals";

export function Capitals() {
	// state
	const { data, fetch } = useCapitalsStore();

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
			<Box bg={useColorModeValue("gray.400", "gray.800")} m={4} rounded={"xl"}>
				<Image
					m={4}
					maxW={"xs"}
					objectFit="cover"
					src={data.flag}
					alt={`Flag of ${data.country}`}
				/>
			</Box>
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>{data.country}</Heading>
					<Text>What is the Capital of this Country?</Text>
					<SimpleGrid columns={2} spacing={2}>
						{data.variants.map((el, i) => (
							<Button key={i}>{el}</Button>
						))}
					</SimpleGrid>
				</Flex>
			</CardBody>
		</Card>
	);
}
