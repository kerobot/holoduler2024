import { useCallback, useState } from "react";
import axios from "axios";

import { DateHelper } from "../utils/DateHelper";
import { Schedules } from "../types/api/schedules";
import { useMessage } from "./useMessage";

// Web API を呼んで配信予定を取得するカスタムフック
export const useSchedules = () => {
    const { showMessage } = useMessage();

    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState<Schedules>();

    const getSchedules = useCallback((sdate: Date, edate: Date, group: string, keyword: string) => {
        const sdateString = DateHelper.formatDate(sdate, "-");
        const edateString = DateHelper.formatDate(edate, "-");
        const url = `/api/holodule?sdate=${sdateString}&edate=${edateString}&group=${group}&keyword=${keyword}`;
        setLoading(true);
        axiosClient
            .get<Schedules>(url)
            .then((res) => setSchedules(res.data))
            .catch((err) => {
                console.error(err);
                showMessage({ title: "スケジュールの取得に失敗しました", status: "error" })
            })
            .finally(() => setLoading(false));
    }, [showMessage]);

    return { getSchedules, loading, schedules };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dateParseChallenge(key: string, val: any) {
    // streaming_at か published_at は Date に変換
    if (key === "streaming_at" || key === "published_at") {
        const time = Date.parse(val);
        if (!Number.isNaN(time)) {
            return new Date(time);
        }
    }
    return val;
}

const axiosClient = axios.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transformResponse: (data: any) => {
        return JSON.parse(data, dateParseChallenge);
    }
});
