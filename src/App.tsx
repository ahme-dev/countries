import { Container, Flex, Grid } from "@chakra-ui/react";
import { Info } from "./components/Info";
import { Nav } from "./components/Nav";
import { Some } from "./components/Some";

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
				<Grid alignItems={"center"} justifyContent={"center"}>
					<Some />
				</Grid>
				{/* Footer */}
				<Info />
			</Flex>
		</Container>
	);
}

export default App;
