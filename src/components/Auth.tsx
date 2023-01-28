import {
	Button,
	Center,
	Input,
	useToast,
	Spinner,
	Text,
	ButtonGroup,
	useColorModeValue,
	Image,
	Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UserResponse } from "../types";
import { t } from "i18next";

import { createAvatar } from "@dicebear/core";
import { croodlesNeutral } from "@dicebear/collection";

export function Auth() {
	const toast = useToast();

	const [valUsername, setUsername] = useState<string>();
	const [valPassword, setPassword] = useState<string>();
	const [valImage, setImage] = useState<string>();

	useEffect(() => {
		const avatar = createAvatar(croodlesNeutral, {
			seed: valUsername,
		});

		let uri = avatar.toDataUriSync();

		setImage(uri);
	}, [valUsername]);

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
						username: valUsername,
						password: valPassword,
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
						username: valUsername,
						password: valPassword,
					}),
				},
			);

			if (!res.ok) throw new Error(res.statusText);

			return res;
		},
		onError: () => registerToasts.fail(),
		onSuccess: () => registerToasts.success(),
	});

	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: async () => {
			let res = await fetch(
				"https://countries-backend.ahmed.systems/auth/logout",
				{
					method: "POST",
					mode: "cors",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!res.ok) throw new Error(res.statusText);

			return res;
		},
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
				<Image
					bgGradient={useColorModeValue(
						"linear(to-r, blue.700, purple.800)",
						"linear(to-r, blue.100, purple.200)",
					)}
					p="2"
					w={"16"}
					borderRadius={"full"}
					src={valImage}
				></Image>
				<Text>Logged in as {userQuery.data.username}</Text>
				<Button
					isLoading={logoutMutation.isLoading || logoutMutation.isSuccess}
					onClick={() => logoutMutation.mutate()}
				>
					{t("Logout")}
				</Button>
			</Center>
		);

	return (
		<Center gap={2} flexDirection={"column"} alignItems={"flex-start"}>
			<Flex w={"full"} alignItems="flex-end" justifyContent={"space-between"}>
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
				<Image
					bgGradient={useColorModeValue(
						"linear(to-r, blue.700, purple.800)",
						"linear(to-r, blue.100, purple.200)",
					)}
					p="2"
					w={"16"}
					borderRadius={"full"}
					src={valImage}
				></Image>
			</Flex>

			<Input
				onChange={(e) => setUsername(e.target.value)}
				isDisabled={anyLoading}
				placeholder={t("Username") || "Username"}
			></Input>
			<Input
				onChange={(e) => setPassword(e.target.value)}
				isDisabled={anyLoading}
				placeholder={t("Password") || "Password"}
				type="password"
			></Input>

			<ButtonGroup>
				<Button
					isLoading={loginMutation.isLoading}
					isDisabled={anyLoading}
					onClick={() => loginMutation.mutate()}
				>
					{t("Login")}
				</Button>
				<Button
					isLoading={registerMutation.isLoading}
					isDisabled={anyLoading}
					onClick={() => registerMutation.mutate()}
				>
					{t("Register")}
				</Button>
			</ButtonGroup>
		</Center>
	);
}
