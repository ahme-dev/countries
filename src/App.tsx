import { Center, Container, Flex } from "@chakra-ui/react";
import { Info } from "./components/Info";
import { Nav } from "./components/Nav";
import { Capitals } from "./components/Capitals";

function App() {
	return (
		<Container maxW="container.lg">
			<Flex
				sx={{ minHeight: "100vh" }}
				direction={"column"}
				h={"full"}
				justifyContent={"space-between"}
				gap={4}
				py={2}
			>
				{/* Header */}
				<Nav />
				{/* Main */}
				<Center>
					<Capitals />
				</Center>
				{/* Footer */}
				<Info />
			</Flex>
		</Container>
	);
}

export default App;
