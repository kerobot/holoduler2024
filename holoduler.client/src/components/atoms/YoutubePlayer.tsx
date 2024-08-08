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

    // iFrame �̉����ɉ�����0.5625 = 16:9�̍������v�Z
    // window.innerWidth �ɉ����Ĕ䗦(ratio)��ύX����̂��A��
    const calculateVideoHeight = () => {
        const ratio = 1.0;
        const height = iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight;
        return setVideoHeight(Math.floor(height * ratio));
    }

    // iFrame �̉������ύX���ꂽ�Ƃ��ɍ������Čv�Z���邽�߂̃R�[���o�b�N�֐�
    // useCallback �Ń��������Ă��邪�A�ˑ��z���[]�Ƃ��Ă��邽�ߏ��񃌃��_�����O���Ɋ֐�����`�����
    const handleChangeVideoWidth = useCallback(() => {
        return calculateVideoHeight();
    }, []);

    // �R�[���o�b�N�֐�����`���ꂽ�ۂɁA�E�B���h�E���̕ύX�ɉ����č������Čv�Z����C�x���g���X�i�[��ǉ�
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
