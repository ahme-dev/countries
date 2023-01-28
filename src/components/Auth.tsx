import {
	Button,
	Center,
	Input,
	useToast,
	Spinner,
	Text,
	ButtonGroup,
	useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { UserResponse } from "../types";
import { t } from "i18next";

export function Auth() {
	const toast = useToast();

	const usernameInput: any = useRef(null);
	const passwordInput: any = useRef(null);

	// toasts

	let loginToasts = {
		fail: () => {
			toast({
				title: "Failed to login",
				status: "error",
				duration: 3000,
				variant: "solid",
			});
		},
		success: () => {
			toast({
				title: "Successfully logged in",
				status: "success",
				duration: 3000,
				variant: "solid",
			});
		},
	};

	let registerToasts = {
		success: () => {
			toast({
				title: "Successfully registered",
				status: "success",
				duration: 3000,
				variant: "solid",
			});
		},
		fail: () => {
			toast({
				title: "Register failed",
				status: "error",
				duration: 3000,
				variant: "solid",
			});
		},
	};

	// mutations and queries

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: async () => {
			let res = await fetch(
				"https://countries-backend.ahmed.systems/auth/login",
				{
					method: "POST",
					mode: "cors",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: usernameInput.current.value,
						password: passwordInput.current.value,
					}),
				},
			);

			if (!res.ok) throw new Error(res.statusText);

			return res;
		},
		onError: () => loginToasts.fail(),
		onSuccess: () => loginToasts.success(),
	});

	const registerMutation = useMutation({
		mutationKey: ["register"],
		mutationFn: async () => {
			let res = await fetch(
				"https://countries-backend.ahmed.systems/auth/register",
				{
					method: "POST",
					mode: "cors",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: usernameInput.current.value,
						password: passwordInput.current.value,
					}),
				},
			);

			if (!res.ok) throw new Error(res.statusText);

			return res;
		},
		onError: () => registerToasts.fail(),
		onSuccess: () => registerToasts.success(),
	});

	const userQuery = useQuery({
		// rerun when data is fetched from mutations
		queryKey: ["user", registerMutation.data, loginMutation.data],
		retry: false,
		refetchOnWindowFocus: false,
		queryFn: async () => {
			let res = await fetch("https://countries-backend.ahmed.systems/user", {
				credentials: "include",
			});
			let data = await res.json();
			return data as UserResponse;
		},
	});

	let anyLoading =
		loginMutation.isLoading ||
		loginMutation.isSuccess ||
		registerMutation.isLoading ||
		registerMutation.isSuccess;

	// render

	if (userQuery.isLoading) return <Spinner size={"xl"} m={4}></Spinner>;

	if (userQuery.data)
		return (
			<Center flexDirection={"column"} gap={4}>
				<Text>Logged in as {userQuery.data.username}</Text>
				<Button colorScheme={"red"}>Logout</Button>
			</Center>
		);

	return (
		<Center gap={2} flexDirection={"column"} alignItems={"flex-start"}>
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
			<Input
				ref={usernameInput}
				isDisabled={anyLoading}
				placeholder={t("Username") || "Username"}
			></Input>
			<Input
				ref={passwordInput}
				isDisabled={anyLoading}
				type="password"
				placeholder={t("Password") || "Password"}
			></Input>

			<ButtonGroup>
				<Button
					isLoading={loginMutation.isLoading || loginMutation.isSuccess}
					isDisabled={anyLoading}
					onClick={() => loginMutation.mutate()}
				>
					{t("Login")}
				</Button>
				<Button
					isLoading={registerMutation.isLoading || registerMutation.isSuccess}
					isDisabled={anyLoading}
					onClick={() => registerMutation.mutate()}
				>
					{t("Register")}
				</Button>
			</ButtonGroup>
		</Center>
	);
}
