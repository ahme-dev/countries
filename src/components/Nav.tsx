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
	Image,
} from "@chakra-ui/react";
import {
	MoonIcon,
	SunIcon,
	ChatIcon,
	SmallCloseIcon,
	HamburgerIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Logo from "../../logo.png";
import { useTranslation } from "react-i18next";

export function Nav() {
	const { t } = useTranslation();

	return (
		<Flex
			direction={"row"}
			justifyContent={"space-between"}
			alignItems="center"
		>
			<Link to={"/"}>
				<Center gap={2}>
					<Image borderRadius={"md"} p={1} h={12} src={Logo} />
					<Text fontSize={"xl"} fontWeight={"bold"}>
						{t("Countries")}
					</Text>
				</Center>
			</Link>

			<MobileMenu></MobileMenu>

			<DesktopNav></DesktopNav>
		</Flex>
	);
}

function DesktopNav() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { t, i18n } = useTranslation();

	return (
		<>
			{/* Nav (Desktop) */}
			<Flex gap={4} display={{ base: "none", sm: "flex" }}>
				{["Capitals", "Flags"].map((el, i) => (
					<Link key={i} to={"/" + el.toLowerCase()}>
						<Button fontWeight={"bold"}>{t(el)}</Button>
					</Link>
				))}
			</Flex>

			{/* Options (Desktop) */}
			<Center gap={2} display={{ base: "none", sm: "flex" }}>
				<Menu>
					<MenuButton as={IconButton} icon={<ChatIcon />} />
					<MenuList>
						<MenuItem onClick={() => i18n.changeLanguage("en")}>
							{t("English")}
						</MenuItem>
						<MenuItem onClick={() => i18n.changeLanguage("ku")}>
							{t("Kurdish")}
						</MenuItem>
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
	const { t, i18n } = useTranslation();

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
			<Drawer
				isOpen={isOpen}
				placement={i18n.language === "ku" ? "left" : "right"}
				closeOnEsc
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>{t("Menu")}</DrawerHeader>

					<DrawerBody>
						<Flex h={"full"} direction={"column"} gap={4}>
							{["Capitals", "Flags"].map((el, i) => (
								<Link key={i} to={"/" + el.toLowerCase()}>
									<Button w={"full"} variant={"outline"} fontWeight={"bold"}>
										{t(el)}
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
								<Text fontWeight={"bold"}>{t("Language")}</Text>
								<ButtonGroup isAttached variant={"outline"}>
									<Button
										onClick={() => i18n.changeLanguage("en")}
										aria-label="Switch to english"
									>
										{t("Eng")}
									</Button>
									<Button
										onClick={() => i18n.changeLanguage("ku")}
										aria-label="Switch to kurdish"
									>
										{t("Kur")}
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
								<Text fontWeight={"bold"}>{t("Theme")}</Text>
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
								{t("Close")}
							</Button>
						</Flex>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}
