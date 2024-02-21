import { FC, memo } from "react";
import { Select } from "@chakra-ui/react";

type Props = {
    group: string;
    onChangeGroup: (group: string) => void;
};

// グループ選択コンポーネント
export const GroupSelect: FC<Props> = memo((props) => {
    const { group, onChangeGroup } = props;

    return (
        <Select maxW='100px' value={group} onChange={(e) => onChangeGroup(e.target.value)} >
            <option value='all'>ALL</option>
            <option value='hololive'>JP</option>
            <option value='hololive_DEV_IS'>DEV_IS</option>
            <option value='hololive_en'>EN</option>
            <option value='hololive_id'>ID</option>
        </Select>
    );
});
