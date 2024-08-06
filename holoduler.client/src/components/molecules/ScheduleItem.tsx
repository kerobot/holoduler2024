import { FC } from "react";
import { Box, Image, Text, Link } from "@chakra-ui/react";

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
        <Box w="300px" h="220px" bg="white" borderRadius="10px" shadow="md" p={2} _hover={{ opacity: 0.8 }}>
            <Box w='280px' overflow='hidden' textAlign="center">
                <Box display='flex'>
                    <Box w="120px" textAlign="center">
                        <Box fontWeight='semibold' p="1">
                            <StreamTime streaming_at={schedule.streaming_at} />
                        </Box>
                        <Box>
                            <Link href={StreamerHelper.getChannelUrl(schedule.code)} isExternal>
                                <Image
                                    borderRadius="full"
                                    boxSize="50px"
                                    m="auto"
                                    src={StreamerHelper.getImageUrl(schedule.code)}
                                    alt={schedule.name} />
                            </Link>
                        </Box>
                        <Box p="1">
                            <Text fontSize="md" as="b" noOfLines={2}>
                                {schedule.name}
                            </Text>
                        </Box>
                    </Box>
                    <Box w="160px">
                        <Link onClick={onItemClick}>
                            <Image src={StreamerHelper.getThumbnailUrl(schedule.video_id)} w="100%" />
                        </Link>
                    </Box>
                </Box>
                <Text fontSize="sm" mt="1" noOfLines={3}>
                    {schedule.title}
                </Text>
            </Box>
        </Box>
    );
};
