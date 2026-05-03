import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Comment() {
    return (
        <div className="reply-comment mb_40 ">
            <div className="title d-flex align-items-center justify-content-between mb_20">
                <h5>Customer Reviews</h5>
                <Link
                    href="#leaveComment"
                    className="tf-btn btn-bg-1 btn-px-28"
                >
                    <span>Write A Review</span>
                    <span className="bg-effect"></span>
                </Link>
            </div>
            <div className="reply-comment-wrap">
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/avatar-1.jpg"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    Claudia M.
                                </Link>
                            </h6>
                            <p className="text-body-default">March 18, 2025</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                        </ul>
                        <p className="comment text-body-2">
                            This home is exactly what we were looking for—quiet,
                            spacious, and surrounded by nature. The location is
                            perfect for our family, close to schools and just a
                            short drive to the city.
                        </p>
                    </div>
                </div>
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/avatar-2.jpg"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    Jorge R.
                                </Link>
                            </h6>
                            <p className="text-body-default">
                                February 10, 2025
                            </p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                        </ul>
                        <p className="comment text-body-2">
                            Very peaceful neighborhood with great views. The
                            house has a modern design and lots of natural light.
                            We especially love the garden and how private it
                            feels.
                        </p>
                    </div>
                </div>
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/avatar-3.jpg"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    Isabel T.
                                </Link>
                            </h6>
                            <p className="text-body-default">January 5, 2025</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                        </ul>
                        <p className="comment text-body-2">
                            I was impressed by the quality of the finishes and
                            how well-maintained the property is. It&apos;s in a
                            great area—close to everything but still quiet and
                            safe.
                        </p>
                    </div>
                </div>
            </div>
            <a
                href="#"
                className="all-review hover-underline-link text_primary-color text-button"
            >
                See All Review (98)
            </a>
        </div>
    );
}
