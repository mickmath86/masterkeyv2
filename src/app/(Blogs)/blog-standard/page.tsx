import BlogStandard from "@/components/blogs/BlogStandard";
import PageTitle from "@/components/blogs/PageTitle";
import Layout from "@/components/layouts/Layout-defaul";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <div className="main-content">
                <BlogStandard />
            </div>
        </Layout>
    );
}
