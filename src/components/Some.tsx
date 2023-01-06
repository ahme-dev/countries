import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useBearStore } from "../data/bears";

export function Some() {
	// state
	const bears = useBearStore((state) => state.bears);
	const inc = useBearStore((state) => state.inc);
	const zero = useBearStore((state) => state.zero);

	return (
		<div>
			<Text>Bears {bears}</Text>
			<ButtonGroup>
				<Button onClick={inc}>Inc</Button>
				<Button onClick={zero}>Zero</Button>
			</ButtonGroup>
		</div>
	);
}
