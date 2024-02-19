import { memo, useEffect, FC, useRef } from "react";
import { useParams } from "react-router-dom";
import { Center, Spinner, Wrap, WrapItem, Text } from "@chakra-ui/react";

import { DateHelper } from "../../utils/DateHelper";
import { StreamCard } from "../organisms/StreamCard";
import { useSchedules } from "../../hooks/useSchedules";

// 配信予定ページコンポーネント
export const Holoduler: FC = memo(() => {
    const { date, days } = useParams();
    const { getSchedules, loading, schedules } = useSchedules();

    const today = new Date();
    const sdate = date || DateHelper.formatDate(today, "-");
    const addDays = Number(days) || 1;
    const edate = DateHelper.formatDate(DateHelper.addDays(DateHelper.stringToDateTime(sdate), addDays), "-");
    const didMountRef = useRef(false);

    useEffect(() => {
        // strict モード対策
        if (process.env.NODE_ENV === "development") {
            if (didMountRef.current) {
                didMountRef.current = false;
                return;
            }
        }
        getSchedules(sdate, edate)
    }, [getSchedules, sdate, edate]);

    const arr = schedules?.schedules;

    return (
        <>
            {loading ? (
                <Center h='100px' w="100%">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </Center>
            ) : (
                <Wrap>
                    {
                        (arr !== undefined && arr.length > 0) ? (
                            arr.map((schedule) => (
                                <WrapItem key={schedule.key} mx="auto">
                                    <StreamCard schedule={schedule} today={today} />
                                </WrapItem>
                            ))
                        ) : (
                            <Text fontSize="md" as="b">予定がありません</Text>
                        )
                    }
                </Wrap>
            )}
        </>
    );
});
