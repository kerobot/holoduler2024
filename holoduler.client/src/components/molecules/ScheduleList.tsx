import { FC } from "react";
import { ScheduleItem } from "./ScheduleItem";
import { Schedule } from "../../types/api/schedule";
import { Text } from "@chakra-ui/react";

type ScheduleListProps = {
    schedules: Schedule[];
    onItemClick: (schedule: Schedule) => void;
}

// スケジュール一覧コンポーネント
export const ScheduleList: FC<ScheduleListProps> = (props) => {
    const { schedules, onItemClick } = props;

    if (schedules !== undefined && schedules.length > 0) {
        return (
            <>
                {schedules.map((schedule) => (
                    <ScheduleItem key={schedule.key} schedule={schedule} onItemClick={() => onItemClick(schedule)} />
                ))}
            </>
        );
    } else {
        return <Text fontSize="md" as="b">not exists</Text>;
    }
};
