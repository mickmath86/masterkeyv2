import Layout from "@/components/layouts/Layout-defaul";
import React from "react";
import { allBlogs } from "@/data/blog";
import BlogPost2 from "@/components/blogs/BlogPost2";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};


export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const foundBlog = allBlogs.find((elm) => String(elm.id) === id) || allBlogs[0];
    
    const blogItem = {
      ...foundBlog,
      authorDesc: foundBlog.authorDesc || ""
    };

    return (
        <Layout>
            <BlogPost2
                blogItem={{
                    ...blogItem,
                    authorName: blogItem.authorName ?? "",
                    authorFlow: blogItem.authorFlow ?? 0,
                    description: blogItem.description ?? "",
                }}
            />
        </Layout>
    );
}

export async function generateStaticParams() {
    return allBlogs.map((property) => ({
        id: String(property.id),
    }));
}
