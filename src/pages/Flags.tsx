import { CheckCircleIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
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
import { useEffect, useState } from "react";
import { useFlagsStore } from "../data/flags";

export function Flags() {
	// local
	const [selected, setSelected] = useState<number>(-1);

	// zustand
	const { data, dataIndex, check, checkResult, fetch, next } = useFlagsStore();

	useEffect(() => {
		fetch();
	}, []);

	if (!data[dataIndex]) return <Spinner size={"xl"} m={4}></Spinner>;

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
			<Box
				onClick={next}
				bg={useColorModeValue("gray.400", "gray.800")}
				m={4}
				rounded={"xl"}
			>
				<Image
					m={4}
					maxW={"xs"}
					fallback={<Spinner size={"xl"} m={4}></Spinner>}
					objectFit="cover"
					src={data[dataIndex].flag}
					alt={`Unknown Flag`}
				/>
			</Box>
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>What country does this flag belong to?</Heading>
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
						{data[dataIndex].variants.map((el, i) =>
							selected === i ? (
								<Button
									onClick={() => setSelected(-1)}
									key={i}
									borderColor={"purple.400"}
									borderWidth={2}
								>
									{el}
								</Button>
							) : (
								<Button
									borderColor={"transparent"}
									borderWidth={2}
									onClick={() => setSelected(i)}
									key={i}
								>
									{el}
								</Button>
							),
						)}
					</SimpleGrid>
					<Text>{JSON.stringify(checkResult)}</Text>
					<Button
						onClick={() => check(selected)}
						leftIcon={<CheckCircleIcon />}
					>
						Answer
					</Button>
				</Flex>
			</CardBody>
		</Card>
	);
}
