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

    // 日付フォーマット
    static formatDay(date: Date, separator: string = ""): string {
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return `${m}${separator}${d}`;
    }

    // 時間フォーマット
    static formatTime(date: Date, separator: string = ""): string {
        const h = date.getHours();
        const m = ("00" + date.getMinutes()).slice(-2);
        return `${h}${separator}${m}`;
    }

    // 文字列からDate型
    static stringToDate(stringDateTime: string): Date {
        const year = Number(stringDateTime.substring(0, 4));
        const month = Number(stringDateTime.substring(5, 7)) - 1;
        const day = Number(stringDateTime.substring(8, 10));
        return new Date(year, month, day);
    }
}
