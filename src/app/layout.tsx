import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../public/assets/icons/icomoon/style.css";
import "../../public/assets/scss/app.scss";
import BackToTop from "@/components/common/BackToTop";
import ClientScripts from "@/components/common/ClientScripts";
import ScrollReset from "@/components/common/ScrollReset";
import { Metadata } from "next";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MasterKey Real Estate | Ventura County Homes",
    description:
        "Find homes for sale in Thousand Oaks, Camarillo, Westlake Village, Ventura, Oxnard, Simi Valley, Moorpark, Agoura Hills, and Calabasas.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={manrope.variable}>
                    <ScrollReset />
                    <div id="wrapper">{children}</div>
                    <ClientScripts />
                    <BackToTop />
                </body>
            </html>
        </ClerkProvider>
    );
}
