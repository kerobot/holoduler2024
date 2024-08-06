import { FC } from "react";
import { Box } from "@chakra-ui/react";

type ScheduleItemProps = {
    item: string;
    onItemClick: () => void;
}

export const ScheduleItem: FC<ScheduleItemProps> = ({ item, onItemClick }) => {
    return (
        <Box onClick={onItemClick}>動画：{item}</Box>
    );
};
