"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { blogPostsLarge } from "@/data/blog";
import Pagination from "@/components/common/Pagination";
import SideBar from "./SideBar";

export default function BlogStandard() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 3;

    const totalPosts = blogPostsLarge.length;
    const totalPages = Math.max(1, Math.ceil(totalPosts / itemPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
        if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentPosts = blogPostsLarge.slice(startIndex, endIndex);

    return (
        <div className="tf-container tf-spacing-1">
            <div className="row">
                <div className="col-lg-8">
                    <div className="wrap-blog">
                        {currentPosts.map((post) => (
                            <div
                                key={post.id}
                                className="blog-article-item hover-image-translate"
                            >
                                <div className="article-thumb image-wrap mb_32">
                                    <Image
                                        src={post.imgSrc}
                                        width="850"
                                        height="478"
                                        alt={post.alt}
                                    />
                                    <Link
                                        href="#"
                                        className="tag text-label text text_primary-color text-uppercase"
                                    >
                                        {post.category}
                                    </Link>
                                    <Link
                                        href={`/blog-post-1/${post.id}`}
                                        className="overlay-link"
                                    ></Link>
                                </div>
                                <div className="article-content ">
                                    <div className="meta-post d-flex align-items-center mb_16">
                                        <div className="item text_secondary-color text-body-default ">
                                            Post By{" "}
                                            <Link
                                                href="#"
                                                className="link text_primary-color"
                                            >
                                                {post.author}
                                            </Link>
                                        </div>
                                        <div className="item text_secondary-color text-body-default ">
                                            {post.date}
                                        </div>
                                    </div>
                                    <h3 className="title mb_17">
                                        <Link
                                            href={`/blog-post-1/${post.id}`}
                                            className="link"
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="description text-body-1 mb_15">
                                        {post.description}
                                    </p>
                                    <Link
                                        href={`/blog-post-1/${post.id}`}
                                        className="btn-readmore hover-underline-link text-button text_primary-color"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                        itemLength={blogPostsLarge.length}
                        itemPerPage={itemPerPage}
                    />
                </div>
                <div className="col-lg-4">
                    <SideBar />
                </div>
            </div>
        </div>
    );
}
