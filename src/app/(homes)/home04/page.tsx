import Banner1 from "@/components/common/Banner1";
import Footer1 from "@/components/footer/Footer1";
import Header4 from "@/components/header/Header4";
import About from "@/components/homes/homepage-4/About";
import CallBack from "@/components/homes/homepage-4/CallBack";
import Hero from "@/components/homes/homepage-4/Hero";
import Location from "@/components/homes/homepage-4/Location";
import Map from "@/components/homes/homepage-4/Map";
import Properties from "@/components/homes/homepage-4/Properties";
import LastNews from "@/components/homes/LatestNews";
import React from "react";


export default function page() {
    return (
        <>
            <Header4 />
            <Hero />
            <About />
            <Map />
            <Properties />
            <Location />
            <CallBack />
            <Banner1 />
            <LastNews />
            <Footer1 />
        </>
    );
}
