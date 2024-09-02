import { FC, useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

type ToggleButtonProps = {
    onLabel: string;
    offLabel: string;
    initialState?: boolean;
    onToggle: (isToggled: boolean) => void;
};

// トグルボタンコンポーネント
export const ToggleButton: FC<ToggleButtonProps> = (props) => {
    const { onLabel, offLabel, initialState = false, onToggle } = props;
    const [isToggled, setIsToggled] = useState(initialState);

    useEffect(() => {
        setIsToggled(initialState);
    }, [initialState]);

    const handleClick = () => {
        const newToggledState = !isToggled;
        setIsToggled(newToggledState);
        onToggle(newToggledState);
    };

    return (
        <Button onClick={handleClick} colorScheme={isToggled ? 'red' : 'blue'}>
            {isToggled ? onLabel : offLabel}
        </Button>
    );
};
