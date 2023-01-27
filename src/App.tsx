import { Center, Container, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Info } from "./components/Info";
import { Nav } from "./components/Nav";
// import { Capitals } from "./pages/Capitals";
import { FlagsPage } from "./pages/FlagsPage";
import { MainPage } from "./pages/MainPage";
import { useTranslation } from "react-i18next";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// add font
import "../public/NizarART.woff";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language !== "en" && i18n.language !== "ku") {
			console.log("Unknown language", i18n.language, "setting to en");
			i18n.changeLanguage("en");
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Container
				maxW="container.lg"
				dir={i18n.language === "ku" ? "rtl" : "ltr"}
				className="app"
			>
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
					{/* Header End */}
					{/* Main */}
					<Center>
						<Routes>
							<Route path={"/"} element={<MainPage />} />
							<Route path={"/flags"} element={<FlagsPage />} />
							<Route path={"/auth"} element={<AuthPage />} />
							{/* <Route path={"/capitals"} element={<Capitals></Capitals>} /> */}
						</Routes>
					</Center>
					{/* Main End */}
					{/* Footer */}
					<Info />
					{/* Footer End */}
				</Flex>
			</Container>
		</QueryClientProvider>
	);
}

export default App;
