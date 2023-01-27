import { Button, Center, Input, Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export function Auth() {
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
					credentials: "same-origin", // include, *same-origin, omit
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
	});

	const { isLoading: userIsLoading, data: userData } = useQuery({
		queryKey: ["getUser", mutation.data],
		retry: false,
		queryFn: async () => {
			let res = await fetch("https://countries-backend.ahmed.systems/user");
			let data = await res.json();
			console.log("user data", data);
			return data;
		},
	});

	if (userIsLoading) return <h1>User loading</h1>;

	if (userData) return <h3>Logged in as {userData.username}</h3>;

	if (mutation.isSuccess)
		return (
			<Center>
				<Text>User</Text>
				<Text>{userData}</Text>
				You're in!
			</Center>
		);
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
