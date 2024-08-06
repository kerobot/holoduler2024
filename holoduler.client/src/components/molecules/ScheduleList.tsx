import { FC } from "react";
import { ScheduleItem } from "../atoms/ScheduleItem";

type ScheduleListProps = {
    items: string[];
    onItemClick: (item: string) => void;
}

export const ScheduleList: FC<ScheduleListProps> = ({ items, onItemClick }) => {
    return (
        <>
            {items.map((item, index) => (
                <ScheduleItem key={index} item={item} onItemClick={() => onItemClick(item)} />
            ))}
        </>
    );
};
