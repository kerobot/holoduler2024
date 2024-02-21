import { useCallback, useState } from "react";
import axios from "axios";

import { Schedules } from "../types/api/schedules";
import { useMessage } from "./useMessage";

// Web API を呼んで配信予定を取得するカスタムフック
export const useSchedules = () => {
    const { showMessage } = useMessage();

    const [loading, setLoading] = useState(false);
    const [schedules, setSchedules] = useState<Schedules>();

    const getSchedules = useCallback((sdate: string, edate: string, group: string, keyword: string) => {
        const url = `/holodule?sdate=${sdate}&edate=${edate}&group=${group}&keyword=${keyword}`;
        setLoading(true);
        axiosClient
            .get<Schedules>(url)
            .then((res) => {
                console.log(url);
                setSchedules(res.data);
            })
            .catch((reason) => {
                console.log(reason);
                showMessage({ title: "スケジュールの取得に失敗しました", status: "error" })
            })
            .finally(() => setLoading(false));
    }, [showMessage]);

    return { getSchedules, loading, schedules };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dateParseChallenge(key: string, val: any) {
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
