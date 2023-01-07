import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Main() {
	return (
		<Flex direction={"column"} maxW={"lg"} gap={4}>
			<Heading>Welcome to Countries</Heading>
			<Text>
				We got 2 quiz games, one for guessing the capital of a country, and one
				for guessing the name of a country by a flag.
			</Text>
			<Center gap={2}>
				<Link to={"/capitals"}>
					<Button>Capitals</Button>
				</Link>
				<Link to={"/flags"}>
					<Button>Flags</Button>
				</Link>
			</Center>
		</Flex>
	);
}
