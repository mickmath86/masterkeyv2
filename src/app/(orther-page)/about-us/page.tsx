import Agents from "@/components/common/Agents";
import Banner1 from "@/components/common/Banner1";
import Process1 from "@/components/common/Process1";
import Testimonial1 from "@/components/common/Testimonial1";
import Layout from "@/components/layouts/Layout-defaul";
import AboutUs from "@/components/otherpage/about/AboutUs";
import OurHistory from "@/components/otherpage/about/OurHistory";
import PageTitle from "@/components/otherpage/about/PageTitle";
import WhyChoose from "@/components/otherpage/about/WhyChoose";


export default function Page() {
    return (
        <Layout>
            <PageTitle />
            <div className="tf-spacing-1">
                <AboutUs />
            </div>
            <div className="section-history tf-spacing-1">
                <OurHistory />
            </div>
            <div className="section-process tf-spacing-1">
                <Process1 />
            </div>
            <div className="section-why tf-spacing-1">
                <WhyChoose />
            </div>
            <div className="section-testimonials tf-spacing-1">
                <Testimonial1 />
            </div>
            <Banner1 />
            <div className="section-agents tf-spacing-1">
                <Agents />
            </div>
        </Layout>
    );
}
