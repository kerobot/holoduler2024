import { FC } from "react";
import { ScheduleList } from "../molecules/ScheduleList";
import { Schedule } from "../../types/api/schedule";

interface SidebarProps {
    schedules: Schedule[];
    onScheduleSelected: (item: Schedule) => void;
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const { schedules, onScheduleSelected } = props;

    return <ScheduleList schedules={schedules} onItemClick={onScheduleSelected} />;
};
