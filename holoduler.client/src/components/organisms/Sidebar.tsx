import { FC } from "react";
import { ScheduleList } from "../molecules/ScheduleList";
import { Schedule } from "../../types/api/schedule";
import { VStack, Box } from "@chakra-ui/react";

interface SidebarProps {
    schedules: Schedule[];
    onScheduleSelected: (item: Schedule) => void;
}

// サイドバーコンポーネント
export const Sidebar: FC<SidebarProps> = (props) => {
    const { schedules, onScheduleSelected } = props;

    return (
        <Box
            w="340px" // サイドバーの幅
            h="calc(100vh - 60px)" // ヘッダーの高さを引いた高さ
            overflowY="auto" // 縦方向にスクロール可能
            borderRight="1px"
            borderColor="gray.200"
            p="4"
        >
            <VStack align="start" spacing="2">
                <ScheduleList schedules={schedules} onItemClick={onScheduleSelected} />
            </VStack>
        </Box>
    );
};
