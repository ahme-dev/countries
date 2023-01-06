import { Center, Container, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Info } from "./components/Info";
import { Nav } from "./components/Nav";
import { Capitals } from "./pages/Capitals";
import { Flags } from "./pages/Flags";

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
					<Routes>
						<Route path={"/capitals"} element={<Capitals></Capitals>} />
						<Route path={"/flags"} element={<Flags></Flags>} />
					</Routes>
				</Center>
				{/* Footer */}
				<Info />
			</Flex>
		</Container>
	);
}

export default App;
