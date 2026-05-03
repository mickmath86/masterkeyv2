import Footer1 from "@/components/footer/Footer1";
import Header5 from "@/components/header/Header5";
import About from "@/components/homes/homepage-5/About";
import Categories from "@/components/homes/homepage-5/Categories";
import Hero from "@/components/homes/homepage-5/Hero";
import Properties from "@/components/homes/homepage-5/Properties";
import Properties2 from "@/components/homes/homepage-5/Properties2";
import Testimonials from "@/components/homes/homepage-5/Testimonials";
import WhyChoose from "@/components/homes/homepage-5/WhyChoose";
import LatestNews from "@/components/homes/LatestNews";
import React from "react";

export default function page() {
    return (
        <>
            <Header5 />
            <Hero />
            <About />
            <Properties />
            <WhyChoose />
            <Properties2 />
            <Testimonials />
            <Categories />
            <LatestNews />
            <Footer1 />
        </>
    );
}
