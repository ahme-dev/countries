import { RepeatIcon } from "@chakra-ui/icons";
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	CircularProgress,
	Divider,
	Flex,
	Heading,
	IconButton,
	Image,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useBearStore } from "../data/capitals";

export function Capitals() {
	// state
	const { data, fetch } = useBearStore();

	if (!data.answer)
		return (
			<Card>
				<Button onClick={fetch}>Fetch</Button>
			</Card>
		);

	return (
		<Card
			rounded={"xl"}
			direction={{ base: "column", sm: "row" }}
			alignItems="center"
			overflow="hidden"
		>
			<Image
				m={4}
				maxW={"xs"}
				objectFit="cover"
				src={data.flag}
				alt={`Flag of ${data.country}`}
			/>
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>{data.country}</Heading>
					<Text>What is the Capital?</Text>
					<Flex wrap={"wrap"} gap={2}>
						{data.variants.map((el, i) => (
							<Button key={i}>{el}</Button>
						))}
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
}
