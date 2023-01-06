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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";

export function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex direction={"row"} justifyContent={"space-between"}>
			{/* Left */}
			<Center gap={2}>
				<Menu>
					<MenuButton as={IconButton} icon={<ChevronDownIcon />} />
					<MenuList>
						<MenuItem>Guess Capitals</MenuItem>
						<MenuItem>Guess Flags</MenuItem>
					</MenuList>
				</Menu>

				<Text fontWeight={"bold"} fontSize={"2xl"}>
					Countries
				</Text>
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
