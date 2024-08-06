import { FC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

registerLocale("ja", ja);

type DateSelectProps = {
    date?: Date;
    onChangeDate: (date: Date) => void;
};

// 日付選択コンポーネント
export const DateSelect: FC<DateSelectProps> = (props) => {
    const { date = new Date(), onChangeDate } = props;

    return (
        <DatePicker
            showIcon
            locale="ja"
            selected={date}
            dateFormat="yyyy/MM/dd"
            dateFormatCalendar="yyyy/MM"
            onChange={selectedDate => { onChangeDate(selectedDate || date) }}
        />
    );
};
