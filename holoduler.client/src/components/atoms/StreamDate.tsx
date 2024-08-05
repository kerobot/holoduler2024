import { FC, memo } from "react";
import { HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from "@chakra-ui/react";
import { DateHelper } from "../../utils/DateHelper";

type StreamDateProps = {
    date: Date;
    days: number;
    onChangeDays: (days: number) => void;
};

// 配信日付表示コンポーネント
// Pick = 特定のプロパティを対象とする
//export const StreamDate: FC<Pick<StreamDateType, "date" | "days" | "onChangeDays">> = memo((props) => {
// Omit = 特定のプロパティを除外する
//export const StreamDate: FC<Omit<StreamDateType, "dummy">> = memo((props) => {
export const StreamDate: FC<StreamDateProps> = memo((props) => {
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
