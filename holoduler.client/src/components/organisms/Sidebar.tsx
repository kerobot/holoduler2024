import { FC } from "react";
import { ScheduleList } from "../molecules/ScheduleList";
import { Schedule } from "../../types/api/schedule";
import { VStack, Box, Spinner } from "@chakra-ui/react";

interface SidebarProps {
    loading: boolean;
    schedules: Schedule[];
    onScheduleSelected: (item: Schedule) => void;
}

// サイドバーコンポーネント
export const Sidebar: FC<SidebarProps> = (props) => {
    const { loading, schedules, onScheduleSelected } = props;

    return (
        <Box
            w="340px" // サイドバーの幅
            h="calc(100vh - 60px)" // ヘッダーの高さを引いた高さ
            overflowY="auto" // 縦方向にスクロール可能
            borderRight="1px"
            borderColor="gray.200"
            p="4"
        >
            {loading ? (
                <VStack align="center" justify="center" h="100%">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </VStack>
            ) : (
                <VStack align="start" spacing="2">
                    <ScheduleList schedules={schedules} onItemClick={onScheduleSelected} />
                </VStack>
            )}
        </Box>
    );
};
