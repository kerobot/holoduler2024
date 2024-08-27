import { memo, useEffect, FC, useState } from "react";
import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { Header } from "../components/organisms/Header";
import { Sidebar } from "../components/organisms/Sidebar";
import { useSchedules } from "../hooks/useSchedules";
import { Schedule } from "../types/api/schedule";
import { TopArea } from "../components/organisms/TopArea";
import { MiddleArea } from "../components/organisms/MiddleArea";
import { YoutubeItem } from "../components/molecules/YoutubeItem";

// 配信予定ページコンポーネント
export const Holoduler: FC = memo(() => {
    const [searchResults, setSearchResults] = useState<Schedule[]>([]);
    const [selectedItems, setSelectedItems] = useState<Schedule[]>([]);
    const [selectedItem, setSelectedItem] = useState<Schedule | null>(null);
    const [allUnmuted, setAllUnmuted] = useState(false);
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

    // スケジュールが取得された際に検索結果を更新
    useEffect(() => {
        setSearchResults(schedules?.schedules || []);
    }, [schedules]);

    return (
        <Flex direction="column" height="100vh">
            {/* ヘッダー（配信の検索） */}
            <Header onSearchSchedule={handleSearch} />
            <Flex flex="1" overflow="hidden">
                {/* サイドバー（配信の一覧表示） */}
                <Sidebar
                    loading={loading}
                    schedules={searchResults}
                    onScheduleSelected={handleItemSelected} />
                <Flex direction="column" flex="1">
                    {/* 上段（ピックアップ動画表示） */ }
                    {selectedItem && (
                        <TopArea
                            schedule={selectedItem}
                            playing={true}
                            muted={false} />
                    )}
                    {/* 中段（再生と音声の制御） */}
                    {selectedItems.length > 0 && (
                        <MiddleArea
                            allUnmuted={allUnmuted}
                            allPlaying={allPlaying}
                            onAllUnmuted={setAllUnmuted}
                            onAllPlaying={setAllPlaying} />
                    )}
                    {/* 下段（動画の一覧表示） */}
                    <Box flex="1" overflowY="auto">
                        <Wrap spacing="2">
                            {selectedItems.map((item, index) => (
                                <WrapItem key={index}>
                                    {/* 動画表示 */}
                                    <YoutubeItem
                                        schedule={item}
                                        playing={allPlaying}
                                        muted={!allUnmuted}
                                        onSelectItem={() => setSelectedItem(item)}
                                        onRemoveItem={() => handleItemRemove(index)} />
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
});
