import Layout from "@/components/layouts/Layout-defaul";
import PageTitle from "@/components/otherpage/privacy/PageTitle";
import Privacy from "@/components/otherpage/privacy/Privacy";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <Privacy />
        </Layout>
    );
}
