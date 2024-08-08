import { FC, useState, useEffect, useCallback, useRef } from "react";

type YoutubePlayerProps = {
    videoId: string;
    title: string;
    autoPlay?: boolean;
}

export const YoutubePlayer: FC<YoutubePlayerProps> = (props) => {
    const { videoId, title, autoPlay } = props;

    const videoURL = `https://www.youtube.com/embed/${videoId}${autoPlay ? '?autoplay=1' : ''}`;
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const defaultHeight = 495;
    const [videoHeight, setVideoHeight] = useState<number>(
        iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight // 0.5625 = 16:9
    );

    // iFrame の横幅に応じて0.5625 = 16:9の高さを計算
    // window.innerWidth に応じて比率(ratio)を変更するのもアリ
    const calculateVideoHeight = () => {
        const ratio = 1.0;
        const height = iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight;
        return setVideoHeight(Math.floor(height * ratio));
    }

    // iFrame の横幅が変更されたときに高さを再計算するためのコールバック関数
    // useCallback でメモ化しているが、依存配列を[]としているため初回レンダリング時に関数が定義される
    const handleChangeVideoWidth = useCallback(() => {
        return calculateVideoHeight();
    }, []);

    // コールバック関数が定義された際に、ウィンドウ幅の変更に応じて高さを再計算するイベントリスナーを追加
    useEffect(() => {
        window.addEventListener("resize", handleChangeVideoWidth);
        calculateVideoHeight();
        return () => window.removeEventListener("resize", handleChangeVideoWidth);
    }, [handleChangeVideoWidth]);

    return (
        <iframe
            ref={iframeRef}
            title={title}
            width="100%"
            height={`${videoHeight}px`}
            src={videoURL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
};
