import { FC } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { CloseIcon, TriangleUpIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Schedule } from "../../types/api/schedule";
import { YoutubePlayer } from "../atoms/YoutubePlayer";

type YoutubeItemProps = {
    schedule: Schedule;
    playing: boolean;
    muted: boolean;
    onSelectItem: () => void;
    onRemoveItem: () => void;
}

// 動画を新しいウィンドウで開く
const openVideoInNewWindow = (videoId: string) => {
    const url = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
    window.open(url, undefined, 'width=1280,height=720');
};

// 動画表示コンポーネント
export const YoutubeItem: FC<YoutubeItemProps> = (props) => {
    const { schedule, playing, muted, onSelectItem, onRemoveItem } = props;

    return (
        <Box
            bg="gray.200"
            width="426px"
            height="240px"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <YoutubePlayer videoId={schedule.video_id} playing={playing} muted={muted} />
            <Box position="absolute" top="2px" left="2px" display="flex" gap="4px">
                <IconButton
                    icon={<TriangleUpIcon />}
                    onClick={() => onSelectItem()}
                    aria-label="Select"
                    size="sm"
                />
                <IconButton
                    icon={<ExternalLinkIcon />}
                    onClick={() => openVideoInNewWindow(schedule.video_id)}
                    aria-label="Open"
                    size="sm"
                />
            </Box>
            <Box position="absolute" top="2px" right="2px">
                <IconButton
                    icon={<CloseIcon />}
                    onClick={() => onRemoveItem()}
                    aria-label="Close"
                    size="sm"
                />
            </Box>
        </Box>
    );
};
