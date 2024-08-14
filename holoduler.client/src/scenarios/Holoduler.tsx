import { memo, useEffect, FC, useState, useRef } from "react";
/*import YouTube from 'react-youtube';*/
import { Box, Flex, Heading, IconButton, Text, Stack, Button, Wrap, WrapItem, ButtonGroup } from "@chakra-ui/react";
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

    // 選択したアイテムをリストに追加（リストに存在しない場合にスプレッド構文を利用してアイテムを追加）
    const handleItemSelected = (item: Schedule) => {
        setSelectedItems((items) => {
            if (items.some((items) => items.key === item.key)) {
                return items;
            }
            return [...items, item];
        });
    };

    // インデックスで指定したアイテムをリストから削除
    const handleItemRemove = (index: number) => {
        setSelectedItems((items) => items.filter((_, i) => i !== index));
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
            <Flex flex="1" overflow="hidden">
                {/* Sidebar */}
                <Sidebar loading={loading} schedules={searchResults} onScheduleSelected={handleItemSelected} />
                <Flex direction="column" flex="1">
                    {/* Top */ }
                    <Box>
                        {selectedItem && (
                            <Stack spacing={0}>
                                <Heading size="md" mb="1">{selectedItem.title}</Heading>
                                <YoutubePlayer videoId={selectedItem.video_id} playing={true} muted={false} />
                            </Stack>
                        )}
                    </Box>
                    {/* Middle */}
                    {selectedItems.length > 0 && (
                        <Box>
                            <Stack direction={["column", "row"]} spacing="2" alignItems="center" m="1">
                                <Text>Selected videos</Text>
                                <Button onClick={toggleAllMuted} colorScheme={allMuted ? "blue" : "red"}>
                                    {allMuted ? 'Unmute All' : 'Mute All'}
                                </Button>
                                <Button onClick={toggleAllPlaying} colorScheme={allPlaying ? "red" : "blue"}>
                                    {allPlaying ? 'Stop All' : 'Play All'}
                                </Button>
                            </Stack>
                        </Box>
                    )}
                    {/* Bottom */}
                    <Box flex="1" overflowY="auto">
                        <Wrap spacing="2">
                            {selectedItems.map((item, index) => (
                                <WrapItem key={index}>
                                    <Box
                                        bg="gray.200"
                                        width="320px"
                                        height="180px"
                                        position="relative"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <YoutubePlayer videoId={item.video_id} playing={allPlaying} muted={allMuted} />
                                        <IconButton
                                            icon={<TriangleUpIcon />}
                                            position="absolute"
                                            top="2px"
                                            left="2px"
                                            onClick={() => setSelectedItem(item)}
                                            aria-label="Select"
                                            size="sm"
                                        />
                                        <IconButton
                                            icon={<CloseIcon />}
                                            position="absolute"
                                            top="2px"
                                            right="2px"
                                            onClick={() => handleItemRemove(index)}
                                            aria-label="Close"
                                            size="sm"
                                        />
                                    </Box>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
});
