import { FC } from "react";
import { Stack, Heading } from "@chakra-ui/react";
import { Schedule } from "../../types/api/schedule";
import { YoutubePlayer } from "../atoms/YoutubePlayer";

type TopAreaProps = {
    schedule: Schedule;
    playing: boolean;
    muted: boolean;
};

// 上段コンポーネント
export const TopArea: FC<TopAreaProps> = (props) => {
    const { schedule, playing, muted } = props;

    return (
        <Stack spacing={0}>
            <Heading size="md" mb="1">{schedule.title}</Heading>
            <YoutubePlayer videoId={schedule.video_id} playing={playing} muted={muted} />
        </Stack>
    );
};
