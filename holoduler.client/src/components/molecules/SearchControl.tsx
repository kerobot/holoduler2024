import { FC, useEffect, useState } from "react";
import { ButtonGroup, Center } from "@chakra-ui/react";

import { DateSelect } from "../atoms/DateSelect";
import { GroupSelect } from "../atoms/GroupSelect";
import { SearchBox } from "../atoms/SearchBox";

type SearchControlProps = {
    onSearchSchedule: (date: Date, group: string, keyword: string) => void
};

// 検索指定コンポーネント
export const SearchControl: FC<SearchControlProps> = (props) => {
    const { onSearchSchedule } = props;

    const [searchDate, setSearchDate] = useState(new Date());
    const [searchGroup, setSearchGroup] = useState('all'); 
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        onSearchSchedule(searchDate, searchGroup, searchKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDate, searchGroup, searchKeyword]);

    const handleOnChangeDate = (date: Date) => {
        setSearchDate(date);
    };

    const handleOnChangeGroup = (group: string) => {
        setSearchGroup(group);
    }

    const handleOnChangeKeyword = (keyword: string) => {
        setSearchKeyword(keyword);
    }
    
    return (
        <ButtonGroup gap='2'>
            <Center><DateSelect date={searchDate} onChangeDate={handleOnChangeDate} /></Center>
            <GroupSelect group={searchGroup} onChangeGroup={handleOnChangeGroup} />
            <SearchBox placeholder="タイトルまたは概要欄" keyword={searchKeyword} onChangeKeyword={handleOnChangeKeyword} />
        </ButtonGroup>
    );
};
