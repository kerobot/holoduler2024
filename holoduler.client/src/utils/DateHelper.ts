export class DateHelper {
    // 日付加算
    static addDays(date: Date, days: number): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    }

    // 日付フォーマット
    static formatDate(date: Date, separator: string = ""): string {
        const y = date.getFullYear();
        const m = ("00" + (date.getMonth() + 1)).slice(-2);
        const d = ("00" + date.getDate()).slice(-2);
        return `${y}${separator}${m}${separator}${d}`;
    }

    // 時間フォーマット
    static formatTime(date: Date, separator: string = ""): string {
        const h = date.getHours();
        const m = ("00" + date.getMinutes()).slice(-2);
        return `${h}${separator}${m}`;
    }

    // 文字列からDate型
    static stringToDateTime(stringDateTime: string): Date {
        const year = Number(stringDateTime.substring(0, 3));
        const month = Number(stringDateTime.substring(4, 5)) - 1;
        const day = Number(stringDateTime.substring(6, 7));
        const hour = Number(stringDateTime.substring(9, 10));
        const minute = Number(stringDateTime.substring(11, 12));
        const second = Number(stringDateTime.substring(13, 14));
        return new Date(year, month, day, hour, minute, second);
    }
}
