import { Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { UserResponse } from "../types";

export function AuthPage() {
	const queryUser = useQuery({
		queryKey: ["user"],
		retry: false,
		queryFn: async () => {
			let res = await fetch("https://countries-backend.ahmed.systems/user", {
				credentials: "include",
			});
			let data = await res.json();
			return data as UserResponse;
		},
	});

	if (queryUser.isLoading) return <Spinner />;

	if (queryUser.data)
		return (
			<Center flexDirection={"column"} gap={4}>
				<Text>Logged in as {queryUser.data.username}</Text>
				<Button colorScheme={"red"}>Logout</Button>
			</Center>
		);

	return (
		<Flex gap={8} flexDirection={{ base: "column", sm: "row" }}>
			<Login></Login>
			<Register></Register>
		</Flex>
	);
}
