import { FC } from "react";
import { SearchControl } from "../molecules/SearchControl";
import { Flex } from "@chakra-ui/react";

type HeaderProps = {
    onSearchSchedule: (date: Date, group: string, keyword: string) => void
}

// ヘッダーコンポーネント
export const Header: FC<HeaderProps> = (props) => {
    const { onSearchSchedule } = props;

    return (
        <Flex as="header" w="100%" h="60px" align="center" justify="center">
            <SearchControl onSearchSchedule={onSearchSchedule} />
        </Flex>
    );
};
