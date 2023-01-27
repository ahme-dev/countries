import { Button, Center, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useRef } from "react";

export function Auth() {
	const toast = useToast();

	const usernameInput: any = useRef(null);
	const passwordInput: any = useRef(null);

	const mutation = useMutation({
		mutationKey: ["login"],
		mutationFn: async () => {
			let res = await fetch(
				"https://countries-backend.ahmed.systems/auth/login",
				{
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					mode: "cors", // no-cors, *cors, same-origin
					credentials: "include", // include, *same-origin, omit
					headers: {
						"Content-Type": "application/json",
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: JSON.stringify({
						username: usernameInput.current.value,
						password: passwordInput.current.value,
					}),
				},
			);
			let data = await res.json();
			return data;
		},
		onError: () => {
			toast({
				title: "Incorrect username and password",
				status: "error",
				duration: 3000,
				variant: "solid",
			});
		},
	});

	if (mutation.isSuccess) return <Center>You're in!</Center>;

	return (
		<Center gap={2} flexDirection={{ base: "column", sm: "row" }}>
			<Input
				ref={usernameInput}
				isDisabled={mutation.isLoading}
				placeholder={t("Username") || "Username"}
				colorScheme={mutation.isError ? "red" : "blue"}
			></Input>
			<Input
				isDisabled={mutation.isLoading}
				ref={passwordInput}
				placeholder={t("Password") || "Password"}
				colorScheme={mutation.isError ? "red" : "blue"}
			></Input>
			<Button
				onClick={() => mutation.mutate()}
				colorScheme={mutation.isError ? "red" : "blue"}
				isLoading={mutation.isLoading}
				px={8}
			>
				{t("Login")}
			</Button>
		</Center>
	);
}
