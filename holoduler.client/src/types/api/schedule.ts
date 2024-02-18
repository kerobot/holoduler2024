// 配信情報
export type Schedule = {
    key: string;
    code: string;
    video_id: string;
    streaming_at: Date;
    name: string;
    title: string;
    url: string;
    description: string;
    published_at: Date;
    channel_id: string;
    channel_title: string;
    tags: Array<string>;
};
