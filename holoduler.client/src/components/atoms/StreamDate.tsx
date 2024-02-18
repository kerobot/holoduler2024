import { FC, memo } from "react";
import { Text } from "@chakra-ui/react";

import { DateHelper } from "../../utils/DateHelper";

type Props = {
    date: Date;
};

// 配信日付表示コンポーネント
export const StreamDate: FC<Props> = memo((props) => {
    const { date } = props;

    return (
        <Text fontSize='xl' as='b'>
            {DateHelper.formatDate(date,"/")}
        </Text>
    );
});
