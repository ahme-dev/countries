import {
	Center,
	Flex,
	IconButton,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
	Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";

export function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex direction={"row"} justifyContent={"space-between"}>
			{/* Left */}
			<Center gap={4}>
				<Text fontWeight={"bold"} fontSize={"2xl"}>
					Countries
				</Text>

				<Button>Capitals</Button>
				<Button fontWeight={"bold"}>Flags</Button>
			</Center>

			{/* Right */}
			<Center gap={2}>
				<Menu>
					<MenuButton as={IconButton} icon={<ChatIcon />} />
					<MenuList>
						<MenuItem>English</MenuItem>
						<MenuItem>Kurdish</MenuItem>
					</MenuList>
				</Menu>
				<IconButton
					aria-label="Theme Switching Icon"
					onClick={toggleColorMode}
					icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
				></IconButton>
			</Center>
		</Flex>
	);
}
