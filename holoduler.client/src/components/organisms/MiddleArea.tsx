import { FC } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { ToggleButton } from "../atoms/ToggleButton";

type MiddleAreaProps = {
    allUnmuted: boolean;
    allPlaying: boolean;
    onAllUnmuted: (isToggled: boolean) => void;
    onAllPlaying: (isToggled: boolean) => void;
};

// 中段エリアコンポーネント
export const MiddleArea: FC<MiddleAreaProps> = (props) => {
    const { allUnmuted, allPlaying, onAllUnmuted, onAllPlaying } = props;

    return (
        <Stack direction={["column", "row"]} spacing="2" alignItems="center" m="1">
            <Text>Selected videos</Text>
            <ToggleButton onLabel="Mute All" offLabel="Unmute All" initialState={allUnmuted} onToggle={onAllUnmuted} />
            <ToggleButton onLabel="Stop All" offLabel="Play All" initialState={allPlaying} onToggle={onAllPlaying} />
        </Stack>
    );
};
