"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SideBar from "./SideBar";
import Pagination from "../common/Pagination";
import { blogPostsList } from "@/data/blog";

export default function BlogList() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;

    const totalPosts = blogPostsList.length;
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
    const currentPosts = blogPostsList.slice(startIndex, endIndex);

    return (
        <div className="tf-container tf-spacing-1 blog-list">
            <div className="row">
                <div className="col-lg-8">
                    <div className="wrap-blog style-list">
                        {currentPosts.map((item) => (
                            <div
                                className="blog-article-item style-list hover-image-translate"
                                key={item.id}
                            >
                                <div className="article-thumb image-wrap">
                                    <Image
                                        loading="lazy"
                                        src={item.imgSrc}
                                        width={850}
                                        height={478}
                                        alt={item.alt}
                                    />
                                    <Link
                                        href={`/blog-post-1/${item.id}`}
                                        className="tag text-label text text_primary-color text-uppercase"
                                    >
                                        {item.category}
                                    </Link>
                                    <Link
                                        href={""}
                                        className="overlay-link"
                                    ></Link>
                                </div>
                                <div className="article-content">
                                    <div className="meta-post d-flex align-items-center mb_12">
                                        <div className="item text_secondary-color text-caption-1">
                                            Post By{" "}
                                            <Link
                                                href='#'
                                                className="link text_primary-color"
                                            >
                                                {item.author}
                                            </Link>
                                        </div>
                                        <div className="item text_secondary-color text-caption-1">
                                            {item.date}
                                        </div>
                                    </div>
                                    <h5 className="title mb_12">
                                        <Link
                                             href={`/blog-post-1/${item.id}`}
                                            className="line-clamp-2 link"
                                        >
                                            {item.title}
                                        </Link>
                                    </h5>
                                    <p className="description text-body-default mb_20 line-clamp-3">
                                        {item.description}
                                    </p>
                                    <Link
                                         href={`/blog-post-1/${item.id}`}
                                        className="hover-underline-link text-button text_primary-color"
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
                        itemLength={blogPostsList.length}
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
