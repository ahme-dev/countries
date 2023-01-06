import {
	useDisclosure,
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
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	ButtonGroup,
} from "@chakra-ui/react";
import {
	MoonIcon,
	SunIcon,
	ChatIcon,
	SmallCloseIcon,
	SettingsIcon,
	HamburgerIcon,
} from "@chakra-ui/icons";

export function Nav() {
	const { colorMode, setColorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex direction={"row"} justifyContent={"space-between"}>
			{/* Logo */}
			<Text fontWeight={"bold"} fontSize={"2xl"}>
				Countries
			</Text>

			{/* Drawer (Mobile) */}
			<Flex display={{ base: "flex", sm: "none" }}>
				{/* Drawer Button */}
				<IconButton
					variant={"outline"}
					aria-label="Open settings menu"
					onClick={onOpen}
				>
					<HamburgerIcon />
				</IconButton>

				{/* Drawer Menu */}
				<Drawer isOpen={isOpen} placement="right" closeOnEsc onClose={onClose}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerHeader>Menu</DrawerHeader>

						<DrawerBody>
							<Flex h={"full"} direction={"column"} gap={4}>
								<Button variant={"outline"}>Capitals</Button>
								<Button variant={"outline"} fontWeight={"bold"}>
									Flags
								</Button>
							</Flex>
						</DrawerBody>

						<DrawerFooter>
							<Flex direction={"column"} w={"full"} gap={4}>
								{/* Language */}
								<Flex
									alignItems={"center"}
									justifyContent={"space-between"}
									gap={2}
								>
									<Text fontWeight={"bold"}>Language:</Text>
									<ButtonGroup isAttached variant={"outline"}>
										<Button
											aria-label="Switch to english"
											onClick={toggleColorMode}
										>
											Eng
										</Button>
										<Button
											aria-label="Switch to kurdish"
											onClick={toggleColorMode}
										>
											Kur
										</Button>
									</ButtonGroup>
								</Flex>
								{/* Language end */}
								{/* Theme */}
								<Flex
									alignItems={"center"}
									justifyContent={"space-between"}
									gap={2}
								>
									<Text fontWeight={"bold"}>Theme:</Text>
									<ButtonGroup isAttached variant={"outline"}>
										<IconButton
											aria-label="Switch to dark theme"
											onClick={() => setColorMode("dark")}
											icon={<MoonIcon />}
										></IconButton>
										<IconButton
											aria-label="Switch to light theme"
											onClick={() => setColorMode("light")}
											icon={<SunIcon />}
										></IconButton>
									</ButtonGroup>
								</Flex>
								{/* Theme end */}
								<Button
									variant={"outline"}
									onClick={onClose}
									leftIcon={<SmallCloseIcon />}
								>
									Close
								</Button>
							</Flex>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Flex>

			{/* Nav (Desktop) */}
			<Flex gap={4} display={{ base: "none", sm: "flex" }}>
				<Button>Capitals</Button>
				<Button fontWeight={"bold"}>Flags</Button>
			</Flex>

			{/* Options (Desktop) */}
			<Center gap={2} display={{ base: "none", sm: "flex" }}>
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
