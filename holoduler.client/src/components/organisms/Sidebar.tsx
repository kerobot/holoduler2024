import { FC } from "react";
import { ScheduleList } from "../molecules/ScheduleList";

interface SidebarProps {
    items: string[];
    onItemSelected: (item: string) => void;
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const { items, onItemSelected } = props;

    return <ScheduleList items={items} onItemClick={onItemSelected} />;
};
