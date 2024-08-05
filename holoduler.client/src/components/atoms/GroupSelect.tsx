import { FC, memo } from "react";
import { Select } from "@chakra-ui/react";

type GroupSelectProps = {
    group?: string;
    onChangeGroup: (group: string) => void;
};

// �O���[�v�I���R���|�[�l���g
export const GroupSelect: FC<GroupSelectProps> = memo((props) => {
    const { group = 'all', onChangeGroup } = props;

    const options = [
        { value: 'all', label: 'ALL' },
        { value: 'hololive', label: 'JP' },
        { value: 'hololive_DEV_IS', label: 'DEV_IS' },
        { value: 'hololive_en', label: 'EN' },
        { value: 'hololive_id', label: 'ID' },
    ];

    return (
        <Select maxW='100px' value={group} onChange={(e) => onChangeGroup(e.target.value)} >
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </Select>
    );
});