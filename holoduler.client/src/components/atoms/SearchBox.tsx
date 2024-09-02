import { FC, memo, useEffect, useState } from "react";
import { Input } from '@chakra-ui/react'
import { useDebouncedValue } from "../../hooks/useDebounce";

type SearchBoxProps = {
    placeholder: string;
    keyword?: string;
    width?: string;
    onChangeKeyword: (value: string) => void;
};

// キーワード検索コンポーネント
export const SearchBox: FC<SearchBoxProps> = memo((props) => {
    const { placeholder, keyword = '', width = 'auto', onChangeKeyword } = props;
    const [inputKeyword, setInputKeyword] = useState(keyword);
    const debouncedValue = useDebouncedValue({ value: inputKeyword, delay: 1000 });

    useEffect(() => {
        onChangeKeyword(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    return (
        <Input placeholder={placeholder} width={width} value={inputKeyword} onChange={
            (e) => setInputKeyword(e.target.value)
        } />
    );
});
