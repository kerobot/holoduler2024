import { memo, useEffect, FC, useState, useRef } from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import { Header } from "../components/organisms/Header";
import { Sidebar } from "../components/organisms/Sidebar";
import { useSchedules } from "../hooks/useSchedules";
import { Schedule } from "../types/api/schedule";

// 配信予定ページコンポーネント
export const Holoduler: FC = memo(() => {
    const [queue, setQueue] = useState<Schedule[]>([]);
    const [selectedItem, setSelectedItem] = useState<Schedule | null>(null);
    const [searchResults, setSearchResults] = useState<Schedule[]>([]);

    const { getSchedules, loading, schedules } = useSchedules();

    // 選択した動画をキューに追加します
    const handleItemSelected = (item: Schedule) => {
        setQueue((prevQueue) => [...prevQueue, item]);
    };

    // 検索条件を元にスケジュールを検索します
    const handleSearch = (date: Date, group: string, keyword: string) => {
        getSchedules(date, date, group, keyword);
    };

    const didMountRef = useRef(false);

    useEffect(() => {
        // strict モード対策
        if (process.env.NODE_ENV === "development") {
            if (didMountRef.current) {
                didMountRef.current = false;
                return;
            }
        }
        setSearchResults(schedules?.schedules || []);
    }, [schedules]);

    return (
        <VStack spacing={4}>
            <Header onSearchSchedule={handleSearch} />
            <Grid templateColumns="1fr 3fr" gap={6}>
                <Sidebar schedules={searchResults} onScheduleSelected={handleItemSelected} />
                <VStack spacing={4}>
                    <Box>
                        {selectedItem ? (
                            // 選択された項目の情報を表示します
                            <Box>{selectedItem.title}</Box>
                        ) : (
                            // 項目が選択されていない場合の表示
                            <Box>項目を選択してください</Box>
                        )}
                    </Box>
                    @@{ loading }@@
                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                        {queue.map((queuedItem, index) => (
                            <Box
                                key={index}
                                border="1px"
                                borderColor="gray.200"
                                p={2}
                                onClick={() => setSelectedItem(queuedItem)}
                            >
                                {queuedItem.title}
                            </Box>
                        ))}
                    </Grid>
                </VStack>
            </Grid>
        </VStack>
    );
});
