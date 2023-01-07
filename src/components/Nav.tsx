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
	LinkBox,
} from "@chakra-ui/react";
import {
	MoonIcon,
	SunIcon,
	ChatIcon,
	SmallCloseIcon,
	HamburgerIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export function Nav() {
	return (
		<Flex direction={"row"} justifyContent={"space-between"}>
			<Link to={"/"}>
				<Text fontWeight={"bold"} fontSize={"2xl"}>
					Countries
				</Text>
			</Link>

			<MobileMenu></MobileMenu>

			<DesktopNav></DesktopNav>
		</Flex>
	);
}

function DesktopNav() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			{/* Nav (Desktop) */}
			<Flex gap={4} display={{ base: "none", sm: "flex" }}>
				{["Capitals", "Flags"].map((el, i) => (
					<Link key={i} to={"/" + el.toLowerCase()}>
						<Button fontWeight={"bold"}>{el}</Button>
					</Link>
				))}
			</Flex>

			{/* Options (Desktop) */}
			<Center gap={2} display={{ base: "none", sm: "flex" }}>
				<Menu>
					<MenuButton as={IconButton} icon={<ChatIcon />} />
					<MenuList>
						<MenuItem>English</MenuItem>
					</MenuList>
				</Menu>
				<IconButton
					aria-label="Theme Switching Icon"
					onClick={toggleColorMode}
					icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
				></IconButton>
			</Center>
		</>
	);
}

function MobileMenu() {
	const { setColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
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
							{["Capitals", "Flags"].map((el, i) => (
								<Link key={i} to={"/" + el.toLowerCase()}>
									<Button w={"full"} variant={"outline"} fontWeight={"bold"}>
										{el}
									</Button>
								</Link>
							))}
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
									<Button aria-label="Switch to english">Eng</Button>
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
	);
}
