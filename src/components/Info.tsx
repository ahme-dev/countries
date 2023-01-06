import { StarIcon, CheckIcon } from "@chakra-ui/icons";
import { Flex, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

export function Info() {
	return (
		<Flex justifyContent={"space-between"} gap={2}>
			<Tag>
				<TagLeftIcon as={StarIcon} />
				<TagLabel>Copyright 2023</TagLabel>
			</Tag>
			<Tag>
				<TagLeftIcon as={CheckIcon} />
				<TagLabel>Users {"30"}</TagLabel>
			</Tag>
		</Flex>
	);
}
