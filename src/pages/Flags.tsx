import {
	ArrowBackIcon,
	CheckCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	CloseIcon,
} from "@chakra-ui/icons";
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
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useFlagsStore } from "../data/flags";

export function Flags() {
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
		checkResult,
		fetch,
		fetchDone,
		next,
	} = useFlagsStore();

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
					alt={`Unknown Flag`}
				/>
			</Center>
			{/* Flag end */}
			<CardBody>
				<Flex direction={"column"} gap={4} justifyContent="space-evenly">
					<Heading size={"md"}>What country does this flag belong to?</Heading>
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
						{/* Previous */}
						<Menu>
							<MenuButton as={IconButton}>
								<ChevronDownIcon />
							</MenuButton>
							<MenuList maxH={40} overflow={"scroll"}>
								{[...history].reverse().map((el) => (
									<MenuItem>
										<Flex
											w={"full"}
											gap={2}
											justifyContent="space-between"
											alignItems={"center"}
										>
											<Center>
												<Image boxSize="2rem" src={el.flag} mr="12px" />
												<Text overflowWrap={"break-word"} textAlign={"start"}>
													is {el.answer}
												</Text>
											</Center>
											{el.wasCorrect ? <CheckIcon /> : <CloseIcon />}
										</Flex>
									</MenuItem>
								))}
							</MenuList>
						</Menu>
						{/* Previous end */}

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
		</Card>
	);
}
