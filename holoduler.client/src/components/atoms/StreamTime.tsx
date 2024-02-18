import { FC, memo } from "react";
import { Text } from "@chakra-ui/react";

import { DateHelper } from "../../utils/DateHelper";

type Props = {
    date: Date;
    today: Date;
};

// 配信時間表示コンポーネント
export const StreamTime: FC<Props> = memo((props) => {
    const { date, today } = props;

    const timeColor = date.getTime() < today.getTime() ? "gray.500" : "blue.500";

    return (
        <Text fontSize="md" as="b" noOfLines={1} color={timeColor}>
            {DateHelper.formatTime(date, ":")}
        </Text>
    );
});
