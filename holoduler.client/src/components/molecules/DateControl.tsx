import { FC, memo } from "react";
import { ButtonGroup, Center } from "@chakra-ui/react";

import { PrevButton } from "../atoms/PrevButton";
import { NextButton } from "../atoms/NextButton";
import { StreamDate } from "../atoms/StreamDate";

type Props = {
    date: Date;
    days: number;
    onClickPrev: () => void;
    onClickNext: () => void;
    onChangeDays: (days: number) => void
};

// 日付移動と日付表示を行うコンポーネント
export const DateControl: FC<Props> = memo((props) => {
    const {
        date,
        days,
        onClickPrev,
        onClickNext,
        onChangeDays
    } = props;

    return (
        <ButtonGroup gap='2'>
            <PrevButton onClick={onClickPrev} />
            <Center><StreamDate date={date} days={days} onChange={onChangeDays} /></Center>
            <NextButton onClick={onClickNext} />
        </ButtonGroup>
    );
});
