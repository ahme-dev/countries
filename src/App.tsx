import { Container, Flex } from "@chakra-ui/react";
import { Nav } from "./components/Nav";
import { Some } from "./components/Some";

function App() {
	return (
		<Container
			maxW="container.lg"
			minH={"96"}
			// bg={"tomato"}
		>
			<Flex direction={"column"} gap={4} py={2}>
				<Nav></Nav>
				<Some></Some>
			</Flex>
		</Container>
	);
}

export default App;
