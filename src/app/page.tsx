import About from "@/components/homes/homepage-1/About";
import Banner from "@/components/homes/homepage-1/Banner";
import Hero from "@/components/homes/homepage-1/Hero";
import Location from "@/components/homes/homepage-1/Location";
import Process from "@/components/homes/homepage-1/Process";
import Properties from "@/components/homes/homepage-1/Properties";
import Properties2 from "@/components/homes/homepage-1/Properties2";
import Testimonials from "@/components/homes/homepage-1/Testimonials";
import LatestNews from "@/components/homes/LatestNews";
import Layout from "@/components/layouts/Layout-defaul";

// Force dynamic rendering so async server components (Location, etc.)
// always fetch live data from Repliers on each request instead of
// being baked into a static snapshot at build time.
// The Location component itself uses next: { revalidate: 3600 } on its
// fetch calls so responses are still cached at the CDN level.
export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <Layout>
            <Hero />
            <About />
            <Properties />
            <Banner />
            <Properties2 />
            <Location />
            <Process />
            <Testimonials />
            <LatestNews />
        </Layout>
    );
}
