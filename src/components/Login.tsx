import { Button, Center, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useRef } from "react";

export function Login() {
	const toast = useToast();

	const usernameInput: any = useRef(null);
	const passwordInput: any = useRef(null);

	const mutation = useMutation({
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

	return (
		<Center gap={2} flexDirection={"column"} alignItems={"flex-end"}>
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
