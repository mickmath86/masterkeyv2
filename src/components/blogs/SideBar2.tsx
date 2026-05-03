import React from "react";
import { recentPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import { subscribeNewsletter } from "@/actions/newsletterAction";

type SideBar2Props = {
    authorAvatar: string;
    authorDesc: string;
    authorName: string;
    authorFlow: number;
};

export default function SideBar2({
    authorAvatar,
    authorDesc,
    authorName,
    authorFlow,
}: SideBar2Props) {
    type Category = {
        id: number;
        name: string;
        count: number;
    };
    type Tag = {
        id: number;
        name: string;
    };
    const categories: Category[] = [
        { id: 1, name: "Market Trends", count: 22 },
        { id: 2, name: "Property Investment", count: 15 },
        { id: 3, name: "Home Buying Tips", count: 16 },
        { id: 4, name: "Rental & Leasing", count: 8 },
        { id: 5, name: "Commercial Real Estate", count: 19 },
        { id: 6, name: "Smart Living & Design", count: 21 },
    ];
    const tags: Tag[] = [
        { id: 1, name: "Housing" },
        { id: 2, name: "Mortgage" },
        { id: 3, name: "Rental" },
        { id: 4, name: "Urban" },
        { id: 5, name: "Investment" },
        { id: 6, name: "Commercial" },
        { id: 7, name: "Property" },
        { id: 8, name: "Luxury" },
        { id: 9, name: "Market" },
    ];
    return (
        <div className="tf-sidebar">
            <div className="sidebar-item sidebar-author ">
                <div className="box-author mb_16">
                    <div className="avatar">
                        <Image
                            src={authorAvatar}
                            width={100}
                            height={100}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <h6 className="mb_4">{authorName}</h6>
                        <p className="text-caption-1 mb_12">
                            {authorFlow} Follower
                        </p>
                        <Link href="#" className="tf-btn btn-bg-1 btn-px-12">
                            <span className="text-button-small">Follow</span>
                            <span className="bg-effect"></span>
                        </Link>
                    </div>
                </div>
                <p className="mb_14">{authorDesc}</p>
                <ul className="tf-social d-flex gap_12">
                    <li>
                        <Link href="#" className="icon-FacebookLogo"></Link>
                    </li>
                    <li>
                        <Link href="#" className="icon-XLogo"></Link>
                    </li>
                    <li>
                        <Link href="#" className="icon-InstagramLogo"></Link>
                    </li>
                </ul>
            </div>
            <div className="sidebar-item sidebar-categories ">
                <h5 className="sidebar-title mb_17">Categories</h5>
                <ul className="list-categories d-grid gap_8">
                    {categories.map((category) => (
                        <li
                            className="d-flex align-items-center justify-content-between text-body-default "
                            key={category.id}
                        >
                            <Link href="#" className="hover-line-text">
                                {category.name}
                            </Link>
                            <div className="number">({category.count})</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-item sidebar-recent-post">
                <h5 className="sidebar-title mb_17">Recent Posts</h5>
                <ul>
                    {recentPost.map((post) => (
                        <li
                            className="recent-post hover-image-rotate"
                            key={post.id}
                        >
                            <Link
                                href={`/blog-post-1/${post.id}`}
                                className="img-style"
                            >
                                <Image
                                    src={post.imgSrc}
                                    width={100}
                                    height={100}
                                    alt={post.alt}
                                />
                            </Link>
                            <div className="content">
                                <div className="meta-post d-flex align-items-center mb_7">
                                    <div className="item text_secondary-color text-caption-2 ">
                                        <Link
                                            href="#"
                                            className="link text_primary-color"
                                        >
                                            {post.author}
                                        </Link>
                                    </div>
                                    <div className="item text_secondary-color text-caption-2 ">
                                        {post.date}
                                    </div>
                                </div>
                                <div className="text-title title text_primary-color fw-6">
                                    <Link
                                        href={`/blog-post-1/${post.id}`}
                                        className="link line-clamp-2"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-item">
                <h5 className="sidebar-title mb_15">Subscribe Newsletter</h5>
                <form action={subscribeNewsletter} className="form-newsletter">
                    <fieldset>
                        <input
                            className=""
                            type="text"
                            placeholder="Email address"
                            name="text"
                            tabIndex={2}
                            defaultValue=""
                            aria-required="true"
                            required
                        />
                    </fieldset>
                    <div className="button-submit">
                        <button className="" type="submit">
                            <i className="icon-PaperPlaneTilt"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="sidebar-item sidebar-tags ">
                <h5 className="sidebar-title mb_15">Tags</h5>
                <ul className="tags-list">
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <Link href="#" className="tags-item text-caption-1">
                                {tag.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
