import {
	Button,
	Center,
	Input,
	useToast,
	Spinner,
	Text,
	ButtonGroup,
	useColorModeValue,
	Flex,
	Card,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { t } from "i18next";
import { UserPicture } from "./UserPicture";
import { doLogin, doLogout, doRegister, fetchUser } from "../fetches";

export function Auth() {
	const toast = useToast();

	const [valUsername, setUsername] = useState<string>();
	const [valPassword, setPassword] = useState<string>();

	// toasts

	let loginToasts = {
		fail: () => {
			toast({
				title: t("Failed to login"),
				status: "error",
				duration: 3000,
			});
		},
		success: () => {
			toast({
				title: t("Successfully logged in"),
				status: "success",
				duration: 3000,
			});
		},
	};

	let registerToasts = {
		success: () => {
			toast({
				title: t("Successfully registered"),
				status: "success",
				duration: 3000,
			});
		},
		fail: () => {
			toast({
				title: t("Register failed"),
				status: "error",
				duration: 3000,
			});
		},
	};

	// mutations and queries

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: () => doLogin(valUsername || "", valPassword || ""),
		onError: () => loginToasts.fail(),
		onSuccess: () => loginToasts.success(),
	});

	const registerMutation = useMutation({
		mutationKey: ["register"],
		mutationFn: () => doRegister(valUsername || "", valPassword || ""),
		onError: () => registerToasts.fail(),
		onSuccess: () => registerToasts.success(),
	});

	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => doLogout(),
	});

	const userQuery = useQuery({
		// rerun when data is fetched from mutations
		queryKey: [
			"user",
			registerMutation.data,
			loginMutation.data,
			logoutMutation.isSuccess,
		],
		retry: false,
		refetchOnWindowFocus: false,
		queryFn: () => fetchUser(),
	});

	// render

	if (userQuery.isLoading) return <Spinner size={"xl"} m={4}></Spinner>;

	if (userQuery.data)
		return (
			<Card
				rounded={"xl"}
				bgGradient={useColorModeValue(
					"linear(to-r, blue.100, purple.200)",
					"linear(to-r, blue.700, purple.800)",
				)}
				direction={{ base: "column", sm: "row" }}
				alignItems="center"
				// overflow="hidden"
				p={4}
			>
				<Center flexDirection={"column"} gap={4} alignItems="flex-start">
					<Center flexDirection={"row"} gap={4}>
						<UserPicture username={valUsername || ""}></UserPicture>

						<Center flexDir={"column"} alignItems={"flex-start"}>
							<Text>{t("Logged in as")}</Text>
							<Text fontSize={"2xl"} fontWeight={"bold"}>
								{userQuery.data.username}
							</Text>
						</Center>
					</Center>
					<Button
						isLoading={logoutMutation.isLoading}
						onClick={() => logoutMutation.mutate()}
					>
						{t("Logout")}
					</Button>
				</Center>
			</Card>
		);

	return (
		<Card
			rounded={"xl"}
			bgGradient={useColorModeValue(
				"linear(to-r, blue.100, purple.200)",
				"linear(to-r, blue.700, purple.800)",
			)}
			direction={{ base: "column", sm: "row" }}
			alignItems="center"
			p={4}
		>
			<Center gap={2} flexDirection={"column"} alignItems={"flex-start"}>
				<Flex
					w={"full"}
					alignItems="flex-end"
					justifyContent={"space-between"}
					gap={8}
				>
					<Text
						fontSize={"3xl"}
						bgGradient={useColorModeValue(
							"linear(to-r, blue.700, purple.800)",
							"linear(to-r, blue.100, purple.200)",
						)}
						bgClip="text"
					>
						{t("Authenticate")}
					</Text>
					<UserPicture username={valUsername || ""}></UserPicture>
				</Flex>

				<Input
					onChange={(e) => setUsername(e.target.value)}
					isDisabled={loginMutation.isLoading || registerMutation.isLoading}
					placeholder={t("Username") || "Username"}
				></Input>
				<Input
					onChange={(e) => setPassword(e.target.value)}
					isDisabled={loginMutation.isLoading || registerMutation.isLoading}
					placeholder={t("Password") || "Password"}
					type="password"
				></Input>

				<ButtonGroup>
					<Button
						isLoading={loginMutation.isLoading}
						isDisabled={loginMutation.isLoading || registerMutation.isLoading}
						onClick={() => loginMutation.mutate()}
					>
						{t("Login")}
					</Button>
					<Button
						isLoading={registerMutation.isLoading}
						isDisabled={loginMutation.isLoading || registerMutation.isLoading}
						onClick={() => registerMutation.mutate()}
					>
						{t("Register")}
					</Button>
				</ButtonGroup>
			</Center>
		</Card>
	);
}
