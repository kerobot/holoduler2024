import { memo, useCallback, useState, FC } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { TitleControl } from "../molecules/TitleControl";
import { SearchControl } from "../molecules/SearchControl";
import { DateHelper } from "../../utils/DateHelper";

// ヘッダーコンポーネント
export const Header: FC = memo(() => {
    const [dateState, setDateState] = useState(new Date());
    const [daysState, setDaysState] = useState(1);
    const [groupState, setGroupState] = useState("");
    const [keywordState, setKeywordState] = useState("");
    const navigate = useNavigate();

    // 指定した条件を state に保持してページ遷移
    const navigateDate = useCallback((date: Date, days: number, group: string, keyword: string) => {
        setDateState(date);
        setDaysState(days);
        setGroupState(group);
        setKeywordState(keyword);
        navigate(`/${DateHelper.formatDate(date, "-")}/${days}?group=${group}&keyword=${keyword}`);
    }, [navigate]);

    // 当日に移動
    const onClickToday = useCallback(() => {
        navigateDate(new Date(), 1, "", "");
    }, [navigateDate]);

    // 前日に移動
    const onClickPrev = useCallback(() => {
        navigateDate(DateHelper.addDays(dateState, -1), daysState, groupState, keywordState);
    }, [navigateDate, dateState, daysState, groupState, keywordState]);

    // 翌日に移動
    const onClickNext = useCallback(() => {
        navigateDate(DateHelper.addDays(dateState, 1), daysState, groupState, keywordState);
    }, [navigateDate, dateState, daysState, groupState, keywordState]);

    // 日数を変更
    const onChangeDays = useCallback((days: number) => {
        navigateDate(dateState, days, groupState, keywordState);
    }, [navigateDate, dateState, groupState, keywordState]);

    // キーワードを変更
    const onChangeKeyword = useCallback((keyword: string) => {
        navigateDate(dateState, daysState, groupState, keyword);
    }, [navigateDate, dateState, daysState, groupState]);

    // グループを変更
    const onChangeGroup = useCallback((group: string) => {
        navigateDate(dateState, daysState, group, keywordState);
    }, [navigateDate, dateState, daysState, keywordState]);

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' p='3' h="20" w="100%">
            <TitleControl onClickToday={onClickToday} />
            <Spacer />
            <SearchControl
                date={dateState}
                days={daysState}
                group={groupState}
                keyword={keywordState}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
                onChangeDays={onChangeDays}
                onChangeGroup={onChangeGroup}
                onChangeKeyword={onChangeKeyword}
            />
        </Flex>
    );
});
