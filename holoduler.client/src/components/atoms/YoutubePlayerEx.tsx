import { FC } from "react";
import ReactPlayer from 'react-player/youtube'

type YoutubePlayerExProps = {
    videoId: string;
    playing?: boolean;
    muted?: boolean;
}

export const YoutubePlayerEx: FC<YoutubePlayerExProps> = (props) => {
    const { videoId, playing = false, muted = true } = props;

    const videoSrc = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-wrapper">
            <ReactPlayer
                width="100%"
                height="100%"
                url={videoSrc}
                playing={playing}
                muted={muted}
                controls
            />
        </div >
    );
};
