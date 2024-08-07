import { memo, useEffect, FC, useState, useRef } from "react";
import YouTube from 'react-youtube';
import { Box, Grid, Flex, Heading, IconButton, GridItem } from "@chakra-ui/react";
import { CloseIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Header } from "../components/organisms/Header";
import { Sidebar } from "../components/organisms/Sidebar";
import { useSchedules } from "../hooks/useSchedules";
import { Schedule } from "../types/api/schedule";
import { YoutubeIframe } from "../components/atoms/YoutubeIframe";

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

    const handleItemRemove = (index: number) => {
        setQueue((prevQueue) => prevQueue.filter((_, i) => i !== index));
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

    const opts = {
        playerVars: {
            autoplay: 1,
        },
    };

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
                        <Box flex="1" mb={4} position="relative">
                            <Heading size="md">{selectedItem?.title || "視聴中"}</Heading>
                            {selectedItem ? (
                                <YoutubeIframe videoId={selectedItem.video_id} autoPlay title={selectedItem.title} />
                            ) : (
                                <Box>Select a video</Box>
                            )}
                        </Box>
                        {/* Lower Part */}
                        <Box flex="1" overflowY="auto">
                            <Heading size="md">Selected videos</Heading>
                            <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={4}>
                                {queue.map((queuedItem, index) => (
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
                                            {/*<Box position="relative" width="100%" paddingTop="56.25%"> */}{/* 16:9 aspect ratio */}
                                            {/*    <Box bg="gray" position="absolute" top="0" left="0" width="100%" height="100%">*/}
                                            {/*        {queuedItem.video_id}*/}
                                            {/*    </Box>*/}
                                            {/*</Box>*/}
                                            <YouTube videoId={queuedItem.video_id} opts={{ width: '320px', height: '180px' }} />
                                            <IconButton
                                                icon={<TriangleUpIcon />}
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                onClick={() => setSelectedItem(queuedItem)}
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
