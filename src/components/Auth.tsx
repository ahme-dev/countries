import { Button, Center, Input } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

export function Auth() {
	const usernameInput: any = useRef(null);
	const passwordInput: any = useRef(null);

	const mutation = useMutation({
		mutationFn: () => {
			console.log(usernameInput.current.value);
			console.log(passwordInput.current.value);
			return axios.post("https://countries-backend.ahmed.systems/login", {
				username: usernameInput.current.value,
				password: passwordInput.current.value,
			});
		},
	});

	if (mutation.isSuccess) return <Center>You're in!</Center>;
	if (mutation.isError) return <Center>Fail</Center>;

	return (
		<Center gap={2}>
			<Input ref={usernameInput} placeholder="Username"></Input>
			<Input ref={passwordInput} placeholder="Password"></Input>
			<Button
				onClick={() => mutation.mutate()}
				isLoading={mutation.isLoading}
				px={8}
			>
				Login
			</Button>
		</Center>
	);
}
