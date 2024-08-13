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

    // playerRef ����H���� iFrame �̉����ɉ����� �����~0.5625 = 16:9 �̍������v�Z
    const getVideoHeight = () => {
        const iframe = playerRef.current?.getInternalPlayer()?.getIframe();
        return iframe ? iframe.offsetWidth * 0.5625 : defaultHeight;
    }

    // iFrame �̍�����ێ�
    const [videoHeight, setVideoHeight] = useState<number>(getVideoHeight());

    // iFrame �̍������X�V
    const calculateVideoHeight = () => {
        return setVideoHeight(getVideoHeight());
    }

    // iFrame �̉������ύX���ꂽ�Ƃ��ɍ������Čv�Z���邽�߂̃R�[���o�b�N�֐�
    // useCallback �Ń��������Ă��邪�A�ˑ��z���[]�Ƃ��Ă��邽�ߏ��񃌃��_�����O���Ɋ֐�����`�����
    const handleChangeVideoWidth = useCallback(() => {
        return calculateVideoHeight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // �R�[���o�b�N�֐�����`���ꂽ�ۂɁA�E�B���h�E���̕ύX�ɉ����č������Čv�Z����C�x���g���X�i�[��ǉ�
    useEffect(() => {
        window.addEventListener("resize", handleChangeVideoWidth);
        return () => window.removeEventListener("resize", handleChangeVideoWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculateVideoHeight]);

    // ����̏��������������ۂɏ���̍����v�Z
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
