import { FC, memo } from "react";
import { ButtonGroup, Center } from "@chakra-ui/react";

import { PrevButton } from "../atoms/PrevButton";
import { NextButton } from "../atoms/NextButton";
import { StreamDate } from "../atoms/StreamDate";
import { SearchBox } from "../atoms/SearchBox";
import { GroupSelect } from "../atoms/GroupSelect";

type Props = {
    date: Date;
    days: number;
    group: string;
    keyword: string;
    onClickPrev: () => void;
    onClickNext: () => void;
    onChangeDays: (days: number) => void
    onChangeGroup: (group: string) => void;
    onChangeKeyword: (value: string) => void;
};

// 日付移動と日付表示と検索を行うコンポーネント
export const SearchControl: FC<Props> = memo((props) => {
    const {
        date,
        days,
        group,
        keyword,
        onClickPrev,
        onClickNext,
        onChangeDays,
        onChangeGroup,
        onChangeKeyword
    } = props;

    return (
        <ButtonGroup gap='2'>
            <GroupSelect group={group} onChangeGroup={onChangeGroup} />
            <SearchBox keyword={keyword} onChangeKeyword={onChangeKeyword} />
            <PrevButton onClick={onClickPrev} />
            <Center><StreamDate date={date} days={days} onChangeDays={onChangeDays} /></Center>
            <NextButton onClick={onClickNext} />
        </ButtonGroup>
    );
});
