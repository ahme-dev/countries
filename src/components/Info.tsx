import { StarIcon, CheckIcon } from "@chakra-ui/icons";
import { Flex, Link, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

export function Info() {
	return (
		<Flex justifyContent={"space-between"} gap={2}>
			<Tag>
				<TagLeftIcon as={StarIcon} />
				<TagLabel>
					© 2023 - <Link href="https://ahmed.systems">ahmed.systems</Link>
				</TagLabel>
			</Tag>
			<Tag>
				<TagLeftIcon as={CheckIcon} />
				<TagLabel>Users {"30"}</TagLabel>
			</Tag>
		</Flex>
	);
}
