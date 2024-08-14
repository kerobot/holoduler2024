import { FC } from "react";
import { Stack, Heading } from "@chakra-ui/react";
import { YoutubePlayer } from "../atoms/YoutubePlayer";

type TopAreaProps = {
    title: string;
    video_id: string;
    playing: boolean;
    muted: boolean;
};

// 中段エリアコンポーネント
export const TopArea: FC<TopAreaProps> = (props) => {
    const { title, video_id, playing, muted } = props;

    return (
        <Stack spacing={0}>
            <Heading size="md" mb="1">{title}</Heading>
            <YoutubePlayer videoId={video_id} playing={playing} muted={muted} />
        </Stack>
    );
};
