import { DeleteIcon, TimeIcon } from "@chakra-ui/icons";
import {
	Popover,
	PopoverTrigger,
	IconButton,
	PopoverContent,
	PopoverArrow,
	PopoverHeader,
	Flex,
	Text,
	PopoverBody,
	Badge,
	Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Answer } from "../types";

export function PlayHistory(props: {
	history: Answer[];
	clearHistory: () => void;
}) {
	const { t } = useTranslation();

	return (
		<Popover>
			<PopoverTrigger>
				<IconButton aria-label="History button">
					<TimeIcon />
				</IconButton>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverHeader>
					<Flex justifyContent={"space-between"} alignItems={"center"}>
						<Text>{t("Answer history")}</Text>
						<IconButton
							onClick={() => props.clearHistory()}
							size={"xs"}
							aria-label="clear out answers history button"
						>
							<DeleteIcon></DeleteIcon>
						</IconButton>
					</Flex>
				</PopoverHeader>
				<PopoverBody>
					<Flex direction={"column"} maxH={40} overflow={"scroll"} gap={2}>
						{/* When history is empty */}
						{props.history.length === 0 ? (
							<Badge
								w={"full"}
								py={1}
								px={2}
								borderRadius={"lg"}
								colorScheme={"blue"}
							>
								{t("Empty")}
							</Badge>
						) : (
							// When There is history
							[...props.history].reverse().map((el, i) => (
								<Badge
									w={"full"}
									key={i}
									py={1}
									px={2}
									borderRadius={"lg"}
									colorScheme={el.isCorrect ? "green" : "red"}
								>
									<Flex w={"full"} gap={2} alignItems={"center"}>
										<Image rounded={"full"} boxSize="2rem" src={el.flag} />
										<Flex direction={"column"}>
											{el.isCorrect ? (
												<Text as="b">{el.userAnswer}</Text>
											) : (
												<>
													<Text as="del">{el.userAnswer}</Text>
													<Text as="b">{el.correctAnswer}</Text>
												</>
											)}
										</Flex>
									</Flex>
								</Badge>
							))
						)}
					</Flex>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}
