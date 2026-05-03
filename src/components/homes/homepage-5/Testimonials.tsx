import React from "react";
import AutoRepeatMarquee from "@/components/common/AutoRepeatMarquee";
import Image from "next/image";

type Testimonial = {
    avatar: string;
    name: string;
    company: string;
    text: string;
};

const testimonials: Testimonial[] = [
    {
        avatar: "/assets/images/avatar/avatar-7.jpg",
        name: "Liam Anderson",
        company: "CEO Digital Avitex",
        text: "“Thanks to their expert advice and support, selling my property was faster and easier than I expected.”",
    },
    {
        avatar: "/assets/images/avatar/avatar-8.jpg",
        name: "James Thompson",
        company: "CEO Apple",
        text: "“Professional, reliable, and efficient. They guided me through every step and made the entire process stress-free.”",
    },
    {
        avatar: "/assets/images/avatar/avatar-9.jpg",
        name: "Linda Martinez",
        company: "CEO Samsung",
        text: "“Impressed by their attention to detail and commitment. They went above and beyond to help.”",
    },
    {
        avatar: "/assets/images/avatar/avatar-8.jpg",
        name: "James Thompson",
        company: "CEO Apple",
        text: "“Professional, reliable, and efficient. They guided me through every step and made the entire process stress-free.”",
    },
    {
        avatar: "/assets/images/avatar/avatar-9.jpg",
        name: "Linda Martinez",
        company: "CEO Samsung",
        text: "“Impressed by their attention to detail and commitment. They went above and beyond to help.”",
    },
];

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="marquee-item">
            <div className="testimonial-item style-2">
                <div className="author d-flex gap_20 align-items-center mb_20">
                    <div className="avatar">
                        <Image
                            src={testimonial.avatar}
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    </div>
                    <div className="info">
                        <div className="d-flex align-items-center name">
                            <a href="#" className="h5 text_primary-color link">
                                {testimonial.name}
                            </a>
                            <ul className="ratings d-flex">
                                {[...Array(5)].map((_, i) => (
                                    <li key={i}>
                                        <i className="icon-favorite_major"></i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p>{testimonial.company}</p>
                    </div>
                </div>
                <p className="text_primary-color fw-6">{testimonial.text}</p>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <div className="section-testimonials-2 tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 split-text effect-rotate">
                        Our Testimonials
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        What Our Clients Say
                    </h3>
                </div>
                <div className="tf-grid-layout md-col-2">
                    <div className="wrap-infiniteslide">
                        <AutoRepeatMarquee
                            direction="up"
                            className="infiniteslide"
                            pauseOnHover={true}
                            speed={5}
                            repeat={10}
                        >
                            {testimonials.map((testimonial, idx) => (
                                <TestimonialItem
                                    testimonial={testimonial}
                                    key={idx}
                                />
                            ))}
                        </AutoRepeatMarquee>
                    </div>
                    <div className="thumbs text-center tf-animate-4">
                        <Image
                            className="sticky-top"
                            width={610}
                            height={813}
                            src="/assets/images/section/section-testimonials-1.jpg"
                            alt="testimonials"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
