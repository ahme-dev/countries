import { Button, Center, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
	const toast = useToast();
	let navigate = useNavigate();

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

			if (!res.ok) throw new Error(res.statusText);

			return res;
		},
		onError: () => {
			toast({
				title: "Incorrect password/username",
				status: "error",
				duration: 3000,
				variant: "solid",
			});
		},
		onSuccess: () => {
			toast({
				title: "Successfully logged in",
				status: "success",
				duration: 3000,
				variant: "solid",
			});
			setTimeout(() => navigate(0), 1000);
		},
	});

	return (
		<Center gap={2} flexDirection={"column"} alignItems={"flex-end"}>
			<Input
				ref={usernameInput}
				isDisabled={mutation.isLoading || mutation.isSuccess}
				placeholder={t("Username") || "Username"}
			></Input>
			<Input
				isDisabled={mutation.isLoading || mutation.isSuccess}
				ref={passwordInput}
				type="password"
				placeholder={t("Password") || "Password"}
			></Input>
			<Button
				isLoading={mutation.isLoading || mutation.isSuccess}
				onClick={() => mutation.mutate()}
				px={8}
			>
				{t("Login")}
			</Button>
		</Center>
	);
}
