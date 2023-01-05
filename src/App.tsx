import { Button, Text, useColorMode } from "@chakra-ui/react";

function App() {
	const { toggleColorMode } = useColorMode();
	return (
		<div className="App">
			<header className="App-header">
				<Text>Hello PWA</Text>
				<Button onClick={toggleColorMode}>Toggle</Button>
			</header>
		</div>
	);
}

export default App;
