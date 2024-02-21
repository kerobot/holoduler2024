import { FC, memo } from "react";
import { HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from "@chakra-ui/react";
import { DateHelper } from "../../utils/DateHelper";

type Props = {
    date: Date;
    days: number;
    onChangeDays: (days: number) => void;
};

// 配信日付表示コンポーネント
export const StreamDate: FC<Props> = memo((props) => {
    const { date, days, onChangeDays } = props;
    const step = 1;
    const min = 1;
    const max = 7;

    return (
        <HStack>
            <Text>{DateHelper.formatDate(date, "/")}</Text>
            <NumberInput maxW='60px' value={days} step={step} min={min} max={max} onChange={(e) => onChangeDays(Number(e))}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Text>days</Text>
        </HStack>
    );
});
