import { Answer, FlagsResponse, UserResponse } from "./types";

export const doLogin = async (username: string, password: string) => {
	let res = await fetch("https://countries-backend.ahmed.systems/auth/login", {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});

	if (!res.ok) {
		console.log(await res.json());
		throw new Error(res.statusText);
	}

	return res;
};

export const doRegister = async (username: string, password: string) => {
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
				username: username,
				password: password,
			}),
		},
	);

	if (!res.ok) {
		console.log(await res.json());
		throw new Error(res.statusText);
	}

	return res;
};

export const doLogout = async () => {
	let res = await fetch("https://countries-backend.ahmed.systems/auth/logout", {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		console.log(await res.json());
		throw new Error(res.statusText);
	}

	return res;
};

export const fetchUser = async () => {
	let res = await fetch("https://countries-backend.ahmed.systems/users/me", {
		credentials: "include",
	});

	if (!res.ok) {
		console.log(await res.json());
	}

	let data = await res.json();
	return data as UserResponse;
};

export const fetchFlags = async () => {
	const res = await fetch(`https://countries-backend.ahmed.systems/flags`);

	if (!res.ok) {
		console.log(await res.json());
	}

	let data = await res.json();
	return data as FlagsResponse;
};

export const doAddAnswer = async (answer: Answer) => {
	let jsonAnswer = JSON.stringify({ answer: answer });
	let res = await fetch(
		"https://countries-backend.ahmed.systems/users/me/flags",
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: jsonAnswer,
		},
	);

	if (!res.ok) {
		console.log(await res.json());
		throw new Error(res.statusText);
	}

	return res;
};
