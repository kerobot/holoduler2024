import { Box, Grid, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";

export const Template: FC = () => {
    const [queue, setQueue] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    // 選択した動画をキューに追加します
    const handleItemSelected = (item: string) => {
        setQueue((prevQueue) => [...prevQueue, item]);
    };

    // 検索条件を元にスケジュールを検索します
    const handleSearch = (date: Date, group: string, keyword: string) => {

        // TODO: 検索処理を実装します
        if (date && group && keyword) {
            setSearchResults(["item1", "item2", "item3", "item4", "item5"]);
            return;
        }

        setSearchResults(["item1", "item2", "item3", "item4", "item5"]);
    };

    return (
        <VStack spacing={4}>
            <Header onSearchSchedule={handleSearch} />
            <Grid templateColumns="1fr 3fr" gap={6}>
                <Sidebar items={searchResults} onItemSelected={handleItemSelected} />
                <VStack spacing={4}>
                    <Box>
                        {selectedItem ? (
                            // 選択された項目の情報を表示します
                            <Box>{selectedItem}</Box>
                        ) : (
                            // 項目が選択されていない場合の表示
                            <Box>項目を選択してください</Box>
                        )}
                    </Box>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                        {queue.map((queuedItem, index) => (
                            <Box
                                key={index}
                                border="1px"
                                borderColor="gray.200"
                                p={2}
                                onClick={() => setSelectedItem(queuedItem)}
                            >
                                {queuedItem}
                            </Box>
                        ))}
                    </Grid>
                </VStack>
            </Grid>
        </VStack>
    );
};
