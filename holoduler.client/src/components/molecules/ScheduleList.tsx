import { FC } from "react";
import { ScheduleItem } from "./ScheduleItem";
import { Schedule } from "../../types/api/schedule";
import { Text } from "@chakra-ui/react";

type ScheduleListProps = {
    schedules: Schedule[];
    onItemClick: (schedule: Schedule) => void;
}

export const ScheduleList: FC<ScheduleListProps> = (props) => {
    const { schedules, onItemClick } = props;

    return (
        <>
            {
                (schedules !== undefined && schedules.length > 0) ? (
                    schedules.map((schedule) => (
                        <ScheduleItem key={schedule.key} schedule={schedule} onItemClick={() => onItemClick(schedule)} />
                    ))
                ) : (
                    <Text fontSize="md" as="b">not exists</Text>
                )
            }
        </>
    );
};
