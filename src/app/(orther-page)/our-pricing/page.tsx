import FAQs1 from "@/components/common/FAQs1";
import Testimonial1 from "@/components/common/Testimonial1";
import Layout from "@/components/layouts/Layout-defaul";
import OurPricing from "@/components/otherpage/pricing/OurPricing";
import PageTitle from "@/components/otherpage/pricing/PageTitle";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <OurPricing />
            <div className="section-testimonials">
                <Testimonial1 />
            </div>
            <div className="section-faqs-1 tf-spacing-2">
                <FAQs1 />
            </div>
        </Layout>
    );
}
