import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/data/menu";

const getCollapseId = (index: number) => `dropdown-menu-${index + 1}`;

export default function MobileMenu() {
    const pathname = usePathname();

    return (
        <ul id="menu-mobile-menu" className="style-1">
            {menuItems.map((item, idx) => {
                const hasChildren = item.links && item.links.length > 0;
                const collapseId = getCollapseId(idx);

                const isParentActive =
                    item.href === pathname ||
                    (item.links && item.links.some((link) => link.href === pathname));

                if (hasChildren) {
                    return (
                        <li
                            key={item.title}
                            className={`menu-item menu-item-has-children-mobile${
                                isParentActive ? " active" : ""
                            }`}
                        >
                            <a
                                href={`#${collapseId}`}
                                className="item-menu-mobile collapsed"
                                data-bs-toggle="collapse"
                                aria-expanded={isParentActive ? "true" : "false"}
                                aria-controls={collapseId}
                            >
                                {item.title}
                            </a>
                            <div
                                id={collapseId}
                                className={`collapse`}
                                data-bs-parent="#menu-mobile-menu"
                            >
                                <ul className="sub-mobile">
                                    {item.links.map((link) => {
                                        const isActive = link.href === pathname;
                                        return (
                                            <li
                                                key={link.label}
                                                className={`menu-item${isActive ? " active" : ""}`}
                                            >
                                                {link.href ? (
                                                    <Link href={link.href}>{link.label}</Link>
                                                ) : (
                                                    <span>{link.label}</span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </li>
                    );
                }

                const isActive = item.href === pathname;

                return (
                    <li key={item.title} className={`menu-item${isActive ? " active" : ""}`}>
                        {item.href ? (
                            <Link href={item.href} className="item-menu-mobile">
                                {item.title}
                            </Link>
                        ) : (
                            <span className="item-menu-mobile">{item.title}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
