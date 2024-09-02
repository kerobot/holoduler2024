import { FC, memo } from "react";
import { Text } from "@chakra-ui/react";

import { DateHelper } from "../../utils/DateHelper";

type StreamTimeProps = {
    streaming_at: Date;
};

// 配信時間表示コンポーネント
export const StreamTime: FC<StreamTimeProps> = memo((props) => {
    const { streaming_at } = props;
    const now = new Date();
    const timeColor = streaming_at.getTime() < now.getTime() ? "gray.500" : "blue.500";

    return (
        <Text fontSize="md" as="b" noOfLines={1} color={timeColor}>
            {
                DateHelper.formatDay(streaming_at, "/") + " " + DateHelper.formatTime(streaming_at, ":")
            }
        </Text>
    );
});
