import FAQs1 from "@/components/common/FAQs1";
import Footer2 from "@/components/footer/Footer2";
import Header2 from "@/components/header/Header2";
import Hero from "@/components/homes/homepage-2/Hero";
import Location from "@/components/homes/homepage-2/Location";
import Populor from "@/components/homes/homepage-2/Populor";
import Properties from "@/components/homes/homepage-2/Properties";
import TopBar from "@/components/homes/homepage-2/TopBar";
import TopProperties from "@/components/homes/TopProperties";
import React from "react";

export default function page() {
    return (
        <>
            <TopBar />
            <Header2 />
            <Hero />
            <Populor />
            <TopProperties />
            <Properties />
            <Location />
            <div className="section-faqs-1 tf-spacing-2">
                <FAQs1 />
            </div>
            <Footer2 />
        </>
    );
}
