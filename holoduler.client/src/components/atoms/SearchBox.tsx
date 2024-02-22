import { FC, memo, useEffect, useState } from "react";
import { Input } from '@chakra-ui/react'
import { useDebouncedValue } from "../../hooks/useDebounce";

type Props = {
    keyword: string;
    onChangeKeyword: (value: string) => void;
};

// キーワード検索コンポーネント
export const SearchBox: FC<Props> = memo((props) => {
    const { keyword, onChangeKeyword } = props;
    const [inputKeyword, setInputKeyword] = useState(keyword ?? "");
    const debouncedValue = useDebouncedValue({ value: inputKeyword, delay: 1000 });

    useEffect(() => {
        onChangeKeyword(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, inputKeyword]);

    return (
        <Input maxW='200px' placeholder='keyword' value={inputKeyword} onChange={
            (e) => setInputKeyword(e.target.value)
        } />
    );
});
