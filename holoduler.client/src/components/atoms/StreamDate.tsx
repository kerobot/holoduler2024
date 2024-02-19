import { FC, memo } from "react";
import { HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from "@chakra-ui/react";
import { DateHelper } from "../../utils/DateHelper";

type Props = {
    date: Date;
    days: number;
    onChange: (days: number) => void;
};

// 配信日付表示コンポーネント
export const StreamDate: FC<Props> = memo((props) => {
    const { date, days, onChange } = props;
    const step = 1;
    const min = 1;
    const max = 7;

    return (
        <HStack>
            <Text fontSize='xl' as='b'>
                {DateHelper.formatDate(date, "/")}
            </Text>
            <NumberInput maxW='60px' value={days} step={step} min={min} max={max} onChange={(e) => onChange(Number(e))}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Text fontSize='xl' as='b'>
                日分
            </Text>
        </HStack>
    );
});
