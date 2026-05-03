import BlogList from "@/components/blogs/BlogList";
import PageTitle from "@/components/blogs/PageTitle";
import Layout from "@/components/layouts/Layout-defaul";
import React from "react";

export default function page() {
    return (
        <Layout>
            {/* main-content */}
            <PageTitle />
            <div className="main-content">
                <BlogList />
            </div>
            {/* End main-content */}
        </Layout>
    );
}
