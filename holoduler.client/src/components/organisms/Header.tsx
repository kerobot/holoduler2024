import { memo, useCallback, useState, FC } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { TitleControl } from "../molecules/TitleControl";
import { DateControl } from "../molecules/DateControl";
import { DateHelper } from "../../utils/DateHelper";

// ヘッダーコンポーネント
export const Header: FC = memo(() => {
    const [dateState, setDateState] = useState(new Date());
    const navigate = useNavigate();

    // 指定した日付を state に保持してページ遷移
    const navigateDate = useCallback((date: Date) => {
        setDateState(date);
        navigate(`/${DateHelper.formatDate(date, "-")}`);
    }, [navigate]);

    // 当日に移動
    const onClickToday = useCallback(() => {
        navigateDate(new Date());
    }, [navigateDate]);

    // 前日に移動
    const onClickPrev = useCallback(() => {
        navigateDate(DateHelper.addDays(dateState, -1));
    }, [navigateDate, dateState]);

    // 翌日に移動
    const onClickNext = useCallback(() => {
        navigateDate(DateHelper.addDays(dateState, 1));
    }, [navigateDate, dateState]);

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' p='3' h="20" w="100%">
            <TitleControl onClickToday={onClickToday} />
            <Spacer />
            <DateControl date={dateState} onClickPrev={onClickPrev} onClickNext={onClickNext} />
        </Flex>
    );
});
