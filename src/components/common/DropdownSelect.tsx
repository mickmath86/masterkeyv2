"use client";

import { useEffect, useRef } from "react";

interface DropdownSelectProps {
    onChange?: (elm: string) => void;
    options?: string[];
    defaultOption?: string;
    selected: string;
    setSelected: (value: string) => void;
    addtionalParentClass?: string;
}

const optionsDefault = ["Newest", "Oldest", "3 days"];

export default function DropdownSelect({
    onChange = () => {},
    options = optionsDefault,
    defaultOption,
    selected,
    setSelected,
    addtionalParentClass = "",
}: DropdownSelectProps) {
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        if (selectRef.current) {
            selectRef.current.classList.toggle("open");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                selectRef.current.classList.remove("open");
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={`nice-select ${addtionalParentClass}`} ref={selectRef}>
            <div onClick={toggleDropdown}>
                <span className="current">
                    {selected || defaultOption || options[0]}
                </span>
            </div>
            <ul className="list">
                {options.map((elm, i) => (
                    <li
                        key={i}
                        onClick={() => {
                            setSelected(elm);
                            onChange(elm);
                            toggleDropdown();
                        }}
                        className={`option ${
                            selected === elm ? "selected" : ""
                        }  text`}
                    >
                        {elm}
                    </li>
                ))}
            </ul>
        </div>
    );
}
