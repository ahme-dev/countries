import { CheckCircleIcon, TimeIcon, DeleteIcon } from "@chakra-ui/icons";
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
	useToast,
	IconButton,
	Text,
	Badge,
	PopoverBody,
	PopoverArrow,
	PopoverContent,
	Popover,
	PopoverTrigger,
	PopoverHeader,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useCapitalsStore } from "../data/capitals";

export function Capitals() {
	const toast = useToast();

	const handleAnswer = () => {
		if (selected === -1) return;
		let result = check();
		toast({
			title: `Answer was ${result ? "correct" : "incorrect"}`,
			status: result ? "success" : "error",
			duration: 3000,
			variant: "solid",
		});
		next();
	};

	// zustand
	const {
		data,
		dataIndex,
		selected,
		changeSelected,
		check,
		history,
		clearHistory,
		fetch,
		fetchDone,
		next,
	} = useCapitalsStore();

	useEffect(() => {
		if (!fetchDone) fetch();
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
					src={data[dataIndex].flag}
					alt={`Flag of ${data[dataIndex].country}`}
				/>
			</Center>
			{/* Flag end */}

			{/* Body */}
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>
						What is the capital of {data[dataIndex].country}?
					</Heading>
					{/* Choices */}
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
						{data[dataIndex].variants.map((el, i) => (
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
						<Popover>
							<PopoverTrigger>
								<IconButton aria-label="History button">
									<TimeIcon />
								</IconButton>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverHeader>
									<Flex justifyContent={"space-between"} alignItems={"center"}>
										<Text>Answer history:</Text>
										<IconButton
											onClick={() => clearHistory()}
											size={"xs"}
											aria-label="clear out answers history button"
										>
											<DeleteIcon></DeleteIcon>
										</IconButton>
									</Flex>
								</PopoverHeader>
								<PopoverBody>
									<Flex
										direction={"column"}
										maxH={40}
										overflow={"scroll"}
										gap={2}
									>
										{/* When history is empty */}
										{history.length === 0 ? (
											<Badge
												w={"full"}
												py={1}
												px={2}
												borderRadius={"lg"}
												colorScheme={"blue"}
											>
												Empty
											</Badge>
										) : (
											// When There is history
											[...history].reverse().map((el, i) => (
												<Badge
													w={"full"}
													key={i}
													py={1}
													px={2}
													borderRadius={"lg"}
													colorScheme={el.wasCorrect ? "green" : "red"}
												>
													<Flex w={"full"} gap={2} alignItems={"center"}>
														<Image
															rounded={"full"}
															boxSize="2rem"
															src={el.flag}
														/>
														<Flex direction={"column"}>
															{el.wasCorrect ? (
																<Text as="b">{el.userAnswer}</Text>
															) : (
																<>
																	<Text as="del">{el.userAnswer}</Text>
																	<Text as="b">{el.answer}</Text>
																</>
															)}
														</Flex>
													</Flex>
												</Badge>
											))
										)}
									</Flex>
								</PopoverBody>
							</PopoverContent>
						</Popover>
						{/* History end */}

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
