import { FC, memo, useEffect, useState } from "react";
import { Input } from '@chakra-ui/react'
import { useDebouncedValue } from "../../hooks/useDebounce";

type SearchBoxProps = {
    placeholder: string;
    keyword?: string;
    onChangeKeyword: (value: string) => void;
};

// キーワード検索コンポーネント
export const SearchBox: FC<SearchBoxProps> = memo((props) => {
    const { placeholder, keyword = '', onChangeKeyword } = props;
    const [inputKeyword, setInputKeyword] = useState(keyword);
    const debouncedValue = useDebouncedValue({ value: inputKeyword, delay: 1000 });

    useEffect(() => {
        onChangeKeyword(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, inputKeyword]);

    return (
        <Input maxW='200px' placeholder={placeholder} value={inputKeyword} onChange={
            (e) => setInputKeyword(e.target.value)
        } />
    );
});
