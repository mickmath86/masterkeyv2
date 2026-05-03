export type FooterLink = {
    href: string;
    label: string;
};

export type FooterSection = {
    className: string;
    heading: string;
    links: FooterLink[];
};

export const footerSections: FooterSection[] = [
    {
        className: "company",
        heading: "Our Company",
        links: [
            { href: "/listing-topmap-grid", label: "Property For Sale" },
            { href: "/listing-topmap-grid", label: "Property For Rent" },
            { href: "/listing-topmap-grid", label: "Property For Buy" },
            { href: "/listing-topmap-grid", label: "All Properties" },
            { href: "#", label: "Our Agents" },
        ],
    },
    {
        className: "quick-link",
        heading: "Quick Links",
        links: [
            { href: "/about-us", label: "About Us" },
            { href: "/contacts", label: "Contact Us" },
            { href: "#", label: "Our Team" },
            { href: "/blog-standard", label: "Latest News" },
            { href: "/our-pricing", label: "Our Pricing" },
        ],
    },
];
