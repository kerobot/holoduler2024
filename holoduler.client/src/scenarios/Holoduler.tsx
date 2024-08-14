import { memo, useEffect, FC, useState, useRef } from "react";
/*import YouTube from 'react-youtube';*/
import { Box, Grid, Flex, Heading, IconButton, Text, GridItem, Stack, Button } from "@chakra-ui/react";
import { CloseIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Header } from "../components/organisms/Header";
import { Sidebar } from "../components/organisms/Sidebar";
import { useSchedules } from "../hooks/useSchedules";
import { Schedule } from "../types/api/schedule";
import { YoutubePlayer } from "../components/atoms/YoutubePlayer";
/*import { YoutubePlayerEx } from "../components/atoms/YoutubePlayerEx";*/

// 配信予定ページコンポーネント
export const Holoduler: FC = memo(() => {
    const [searchResults, setSearchResults] = useState<Schedule[]>([]);
    const [selectedItems, setSelectedItems] = useState<Schedule[]>([]);
    const [selectedItem, setSelectedItem] = useState<Schedule | null>(null);
    const [allMuted, setAllMuted] = useState(true);
    const [allPlaying, setAllPlaying] = useState(false);

    const { getSchedules, loading, schedules } = useSchedules();

    // 動画をリストに追加
    const handleItemSelected = (item: Schedule) => {
        setSelectedItems((prevItem) => [...prevItem, item]);
    };

    // インデックスで指定した動画をリストから削除
    const handleItemRemove = (index: number) => {
        setSelectedItems((prevItem) => prevItem.filter((_, i) => i !== index));
    };

    // 検索条件を元にスケジュールを検索
    const handleSearch = (date: Date, group: string, keyword: string) => {
        getSchedules(date, date, group, keyword);
    };

    const toggleAllMuted = () => { setAllMuted(!allMuted); };
    const toggleAllPlaying = () => { setAllPlaying(!allPlaying); };

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
        <Flex direction="column" height="100vh">
            {/* Header */}
            <Header onSearchSchedule={handleSearch} />
            <Flex flex="1">
                {/* Sidebar */}
                <Sidebar loading={loading} schedules={searchResults} onScheduleSelected={handleItemSelected} />
                {/* Main Content */}
                <Box flex="1" p={4}>
                    <Flex direction="column" height="100%">
                        {/* Upper Part */}
                        <Box flex="0 1 auto" mb={4} position="relative">
                            {selectedItem && (
                                <Stack spacing={2}>
                                    <Heading size="md">{selectedItem?.title || "視聴中"}</Heading>
                                    <YoutubePlayer videoId={selectedItem.video_id} playing={true} muted={false} />
                                </Stack>
                            )}
                        </Box>
                        {/* Lower Part */}
                        <Box flex="1" overflowY="auto">
                            {selectedItems.length > 0 && (
                                <Stack direction={["column", "row"]} spacing="3" alignItems="center" marginBottom="2">
                                    <Text>Selected videos</Text>
                                    <Button onClick={toggleAllMuted} colorScheme={allMuted ? "blue" : "red"}>
                                        {allMuted ? 'Unmute All' : 'Mute All'}
                                    </Button>
                                    <Button onClick={toggleAllPlaying} colorScheme={allPlaying ? "red" : "blue"}>
                                        {allPlaying ? 'Stop All' : 'Play All'}
                                    </Button>
                                </Stack>
                            )}
                            <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={4}>
                                {selectedItems.map((item, index) => (
                                    <GridItem
                                        key={index}
                                        width="320px"
                                        height="180px"
                                        bg="gray.200"
                                        position="relative"
                                        borderRadius="md"
                                        cursor="pointer"
                                    >
                                        <Box
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            right="0"
                                            bottom="0"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bg="gray.200"
                                        >
                                            <YoutubePlayer videoId={item.video_id} playing={allPlaying} muted={allMuted} />
                                            <IconButton
                                                icon={<TriangleUpIcon />}
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                onClick={() => setSelectedItem(item)}
                                                aria-label="Select"
                                                size="sm"
                                            />
                                            <IconButton
                                                icon={<CloseIcon />}
                                                position="absolute"
                                                top="0"
                                                right="0"
                                                onClick={() => handleItemRemove(index)}
                                                aria-label="Close"
                                                size="sm"
                                            />
                                        </Box>
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
});
