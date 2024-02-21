import { useEffect, useState } from "react";

type Props = {
    value: string;
    delay?: number;
};

export const useDebouncedValue = ({ value, delay = 1000 }: Props) => {
    const [debouncedValue, setDebouncedValue] = useState(value ?? "");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
