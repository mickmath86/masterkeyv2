import { menuItems } from "@/data/menu";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    const getActiveGroup = (path: string) => {
        const groups = [
            ["login", "register"],
        ];
        return groups.find(group => group.includes(path)) || [path];
    };

    useEffect(() => {
        const preventDefault = () => {
            document.querySelectorAll(".link-no-action").forEach((element) => {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                });
            });
        };
        preventDefault();
    }, []);

    const currentGroup = getActiveGroup(pathname.split("/")[1]);

    return (
        <div>
            <nav className="main-menu">
                <ul className="navigation">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`text-menu ${
                                item.links && item.links.length > 0
                                    ? "has-child"
                                    : ""
                            } ${
                                item.links &&
                                item.links.some((el) => {
                                    if (!el.href) return false;
                                    const target = el.href.split("/")[1];
                                    return currentGroup.includes(target);
                                })
                                    ? "current-menu"
                                    : ""
                            }`}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="splitting toggle"
                                >
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    href="#"
                                    className="link-no-action toggle splitting"
                                >
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                    <span className="text" data-splitting>
                                        {item.title}
                                    </span>
                                </Link>
                            )}
                            {item.links.length > 0 && (
                                <ul className="submenu">
                                    {item.links.map((link, linkIndex) => (
                                        <li
                                            key={linkIndex}
                                            className={`${
                                                link.href &&
                                                currentGroup.includes(link.href.split("/")[1])
                                                    ? "current-item"
                                                    : ""
                                            }`}
                                        >
                                            {link.href ? (
                                                <Link href={link.href}>
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <span>{link.label}</span>
                                            )}
                                            {link.sub && link.sub.length > 0 && (
                                                <ul className="submenu">
                                                    {link.sub.map((subLink, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link href={subLink.href}>
                                                                {subLink.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
