import { FC } from "react";
import { Box, Image, Text, Link, Grid } from "@chakra-ui/react";

import { Schedule } from "../../types/api/schedule";
import { StreamerHelper } from "../../utils/StreamerHelper";
import { StreamTime } from "../atoms/StreamTime";

type ScheduleItemProps = {
    schedule: Schedule;
    onItemClick: () => void;
}

// スケジュール表示コンポーネント
export const ScheduleItem: FC<ScheduleItemProps> = (props) => {
    const { schedule, onItemClick } = props;

    return (
        <Grid templateRows="1fr auto" height="100%" bg="gray.200" borderWidth='1px' rounded='md' shadow="md" p={2} _hover={{ opacity: 0.8 }}>
            {/* 上部領域 */}
            <Grid templateColumns="1fr 2fr" height="100%">
                {/* 左側領域 */}
                <Grid templateRows="0.4fr 1.0fr 0.6fr" height="100%">
                    {/* 配信時刻 */}
                    <Box display="flex" alignItems="center" justifyContent="center" fontWeight='semibold'>
                        <StreamTime streaming_at={schedule.streaming_at} />
                    </Box>
                    {/* 配信者アイコン */}
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Link href={StreamerHelper.getChannelUrl(schedule.code)} isExternal>
                            <Image
                                borderRadius="full"
                                boxSize="50px"
                                m="auto"
                                src={StreamerHelper.getImageUrl(schedule.code)}
                                alt={schedule.name} />
                        </Link>
                    </Box>
                    {/* 配信者名 */}
                    <Box display="flex" alignItems="center" justifyContent="center" fontWeight='semibold'>
                        <Text noOfLines={2}>{schedule.name}</Text>
                    </Box>
                </Grid>
                {/* 右側領域 */}
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Link onClick={onItemClick}>
                        <Image src={StreamerHelper.getThumbnailUrl(schedule.video_id)} w="100%" />
                    </Link>
                </Box>
            </Grid>
            {/* 下部領域 */}
            <Box height="60px">
                <Text fontSize="sm" mt="1" noOfLines={3}>{schedule.title}</Text>
            </Box>
        </Grid>
    );
};
