import { Flex, Link, Tag, TagLabel } from "@chakra-ui/react";

export function Info() {
	return (
		<Flex justifyContent={"center"} gap={2}>
			<Tag>
				<TagLabel>
					© 2023 - <Link href="https://ahmed.systems">ahmed.systems</Link>
				</TagLabel>
			</Tag>
		</Flex>
	);
}
