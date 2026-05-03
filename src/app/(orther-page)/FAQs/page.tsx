import Layout from "@/components/layouts/Layout-defaul";
import Faqs from "@/components/otherpage/FAQs/Faqs";
import PageTitle from "@/components/otherpage/FAQs/PageTitle";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <Faqs />
        </Layout>
    );
}
