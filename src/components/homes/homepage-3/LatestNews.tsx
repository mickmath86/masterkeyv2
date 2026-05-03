import { mainArticle, recentPost2 } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LatestNew() {
    return (
        <div className="section-latest-new tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Latest New
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Helpful Luminor Guides
                    </h3>
                </div>
                <div className="tf-grid-layout lg-col-2">
                    <div className="blog-article-item style-default hover-image-translate loadItem ">
                        <div className="article-thumb image-wrap mb_20">
                            <Image
                                src={mainArticle[0].imgSrc}
                                width={600}
                                height={400}
                                alt={mainArticle[0].alt}
                            />
                            <a
                                href={`#`}
                                className="tag text-label text text_primary-color text-uppercase"
                            >
                                {mainArticle[0].category}
                            </a>
                            <Link
                                href={`/blog-post-1/${mainArticle[0].id}`}
                                className="overlay-link"
                            ></Link>
                        </div>
                        <div className="article-content ">
                            <div className="meta-post d-flex align-items-center mb_12">
                                <div className="item text_secondary-color text-body-default ">
                                    Post By{" "}
                                    <a
                                        href={"#"}
                                        className="link text_primary-color"
                                    >
                                        {mainArticle[0].author}
                                    </a>
                                </div>
                                <div className="item text_secondary-color text-body-default ">
                                    {mainArticle[0].date}
                                </div>
                            </div>
                            <h4 className="title mb_12">
                                <a
                                    href={`/blog-post-1/${mainArticle[0].id}`}
                                    className="link hover-line-text line-clamp-3"
                                >
                                    {mainArticle[0].title}
                                </a>
                            </h4>
                            <p className="description line-clamp-1">
                                {mainArticle[0].description}
                            </p>
                        </div>
                    </div>
                    <div className="wrap-recent-post">
                        {recentPost2.map((post, idx) => (
                            <div
                                className="recent-post hover-image-rotate"
                                key={idx}
                            >
                                <Link
                                    href={`/blog-post-1/${post.id}`}
                                    className="img-style"
                                >
                                    <Image
                                        src={post.imgSrc}
                                        width={180}
                                        height={120}
                                        alt={post.alt}
                                    />
                                    <div className="tag text-uppercase text-label fw-6">
                                        {post.category}
                                    </div>
                                </Link>
                                <div className="content">
                                    <div className="meta-post d-flex align-items-center mb_12">
                                        <div className="item text_secondary-color text-caption-1 d-flex gap_4">
                                            Post By
                                            <Link
                                                href={`/blog-post-1/${post.id}`}
                                                className="link text_primary-color"
                                            >
                                                {post.author}
                                            </Link>
                                        </div>
                                        <div className="item text_secondary-color text-caption-1 ">
                                            {post.date}
                                        </div>
                                    </div>
                                    <h5 className="title text_primary-color fw-6 text-capitalize">
                                        <Link
                                            href={`/blog-post-1/${post.id}`}
                                            className="link line-clamp-2"
                                        >
                                            {post.title}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
