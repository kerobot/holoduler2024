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
    // ���ߍ��ޓ����URL
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    // ����v���C���[�̍����̏����l
    const defaultHeight = 0;
    // ����v���C���[�̍�����ێ�
    const [videoHeight, setVideoHeight] = useState<number>(defaultHeight);
    // ����v���C���[�̎Q�Ƃ�ێ�
    const playerRef = useRef<ReactPlayer>(null);

    // ����v���C���[�̎Q�Ƃ���H���� iFrame �̉����ɉ����č������v�Z�i0.5625 = 16:9�j
    const getVideoHeight = () => {
        const iframe = playerRef.current?.getInternalPlayer()?.getIframe();
        return iframe ? iframe.offsetWidth * 0.5625 : defaultHeight;
    }

    // ����v���C���[�̍������X�V����
    const calculateVideoHeight = () => {
        return setVideoHeight(getVideoHeight());
    }

    // ����v���C���[�̉������ύX���ꂽ�Ƃ��ɍ������Čv�Z���邽�߂̃R�[���o�b�N�֐�
    // useCallback �Ń��������Ă��邪�A�ˑ��z���[]�Ƃ��Ă��邽�ߏ��񃌃��_�����O���ɒ�`�����
    const handleChangeVideoWidth = useCallback(() => {
        return calculateVideoHeight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // �E�B���h�E���̕ύX�ɉ����ČĂяo���C�x���g���X�i�[��ǉ�����
    // useEffect �̈ˑ��z���[]�Ƃ��Ă��邽�ߏ��񃌃��_�����O���̂ݎ��s�����
    useEffect(() => {
        window.addEventListener("resize", handleChangeVideoWidth);
        return () => window.removeEventListener("resize", handleChangeVideoWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ����̏��������������ۂɍ������v�Z���Ă���
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
