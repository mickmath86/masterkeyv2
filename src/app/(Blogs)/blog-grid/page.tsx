import BlogGrid from "@/components/blogs/BlogGrid";
import PageTitle from "@/components/blogs/PageTitle";
import Layout from "@/components/layouts/Layout-defaul";
import React from "react";

export default function page() {
    return (
        <Layout>
            {/* main-content */}
            <PageTitle />
            <div className="main-content">
                <BlogGrid />
            </div>
            {/* End main-content */}
        </Layout>
    );
}
