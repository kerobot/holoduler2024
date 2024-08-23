import { FC, useState, useEffect, useCallback, useRef } from "react";
import ReactPlayer from 'react-player/youtube'
//import { FrameRateCalculator } from "../../utils/FrameRateCalculator";

type YoutubePlayerProps = {
    videoId: string;
    playing?: boolean;
    muted?: boolean;
}

export const YoutubePlayer: FC<YoutubePlayerProps> = (props) => {

    const { videoId, playing = false, muted = true } = props;
    // 埋め込む動画のURL
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    // 動画プレイヤーの高さの初期値
    const defaultHeight = 0;
    // 動画プレイヤーの高さを保持
    const [videoHeight, setVideoHeight] = useState<number>(defaultHeight);
    // 動画プレイヤーの参照を保持
    const playerRef = useRef<ReactPlayer>(null);

    // 動画プレイヤーの参照から辿った iFrame の横幅に応じて高さを計算（0.5625 = 16:9）
    const getVideoHeight = () => {
        const iframe = playerRef.current?.getInternalPlayer()?.getIframe();
        return iframe ? iframe.offsetWidth * 0.5625 : defaultHeight;
    }

    // 動画プレイヤーの高さを更新する
    const calculateVideoHeight = () => {
        return setVideoHeight(getVideoHeight());
    }

    // 動画プレイヤーの横幅が変更されたときに高さを再計算するためのコールバック関数
    // useCallback でメモ化しているが、依存配列を[]としているため初回レンダリング時に定義される
    const handleChangeVideoWidth = useCallback(() => {
        return calculateVideoHeight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ウィンドウ幅の変更に応じて呼び出すイベントリスナーを追加する
    // useEffect の依存配列を[]としているため初回レンダリング時のみ実行される
    useEffect(() => {
        window.addEventListener("resize", handleChangeVideoWidth);
        return () => window.removeEventListener("resize", handleChangeVideoWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 動画の準備が完了した際に高さを計算しておく
    const onReady = () => {
        calculateVideoHeight();
    }

    //const [frameRate, setFrameRate] = useState<number>(0);
    //const frameRateCalculator = new FrameRateCalculator();

    //useEffect(() => {
    //    frameRateCalculator.start();
    //    const intervalId = setInterval(() => { setFrameRate(frameRateCalculator.getFrameRate()); }, 1000);
    //    return () => { clearInterval(intervalId); };
    //// eslint-disable-next-line react-hooks/exhaustive-deps
    //}, []);

    //const seekToPosition = (milliseconds: number) => {
    //    if (playerRef.current) {
    //        playerRef.current.seekTo(milliseconds / 1000, 'seconds');
    //    }
    //};

    return (
        <div className="yt-ctrl">
            <ReactPlayer
                ref={playerRef}
                onReady={onReady}
                width="100%"
                height={`${videoHeight}px`}
                url={videoSrc}
                playing={playing}
                muted={muted}
                controls
            />
        </div>
    );
};
