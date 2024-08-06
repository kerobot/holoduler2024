import { FC } from "react";
import { SearchControl } from "../molecules/SearchControl";

type HeaderProps = {
    onSearchSchedule: (date: Date, group: string, keyword: string) => void
}

export const Header: FC<HeaderProps> = (props) => {
    const { onSearchSchedule } = props;

    return (
        <SearchControl onSearchSchedule={onSearchSchedule} />
    );
};
