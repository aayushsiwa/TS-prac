import { useState, useEffect } from "react";

const getSavedValue = <T>(key: string, initial: T | (() => T)): T => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
        return JSON.parse(savedValue) as T;
    } else {
        return typeof initial === "function"
            ? (initial as () => T)()
            : (initial as T);
    }
};

export default function useLocalStorage<T>(
    key: string,
    initial: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        return getSavedValue<T>(key, initial);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    // console.log("hi");

    return [value, setValue];
}
