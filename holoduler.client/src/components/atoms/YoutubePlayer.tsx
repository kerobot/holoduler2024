import { FC, useState, useEffect, useCallback, useRef } from "react";
import ReactPlayer from 'react-player/youtube'

type YoutubePlayerProps = {
    videoId: string;
    playing?: boolean;
    muted?: boolean;
}

export const YoutubePlayer: FC<YoutubePlayerProps> = (props) => {

    const { videoId, playing = false, muted = true } = props;
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    const playerRef = useRef<ReactPlayer>(null);
    const defaultHeight = 495;

    // playerRef から辿った iFrame の横幅に応じて 横幅×0.5625 = 16:9 の高さを計算
    const getVideoHeight = () => {
        const iframe = playerRef.current?.getInternalPlayer()?.getIframe();
        return iframe ? iframe.offsetWidth * 0.5625 : defaultHeight;
    }

    // iFrame の高さを保持
    const [videoHeight, setVideoHeight] = useState<number>(getVideoHeight());

    // iFrame の高さを更新
    const calculateVideoHeight = () => {
        return setVideoHeight(getVideoHeight());
    }

    // iFrame の横幅が変更されたときに高さを再計算するためのコールバック関数
    // useCallback でメモ化しているが、依存配列を[]としているため初回レンダリング時に関数が定義される
    const handleChangeVideoWidth = useCallback(() => {
        return calculateVideoHeight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // コールバック関数が定義された際に、ウィンドウ幅の変更に応じて高さを再計算するイベントリスナーを追加
    useEffect(() => {
        window.addEventListener("resize", handleChangeVideoWidth);
        return () => window.removeEventListener("resize", handleChangeVideoWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculateVideoHeight]);

    // 動画の準備が完了した際に初回の高さ計算
    const onReady = () => {
        calculateVideoHeight();
    }

    return (
        <ReactPlayer
            ref={playerRef}
            onReady={onReady}
            width="100 % "
            height={`${videoHeight}px`}
            url={videoSrc}
            playing={playing}
            muted={muted}
            controls
        />
    );
};
