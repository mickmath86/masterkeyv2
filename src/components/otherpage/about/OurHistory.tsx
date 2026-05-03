import React from "react";

type TimeLine = {
    year: string;
    title: string;
    text: string;
};

const history: TimeLine[] = [
    {
        year: "2009",
        title: "Humble Beginnings",
        text: "We started as a small, local agency with a clear mission: helping people find homes with honesty and care.",
    },
    {
        year: "2015",
        title: "A Trusted Name",
        text: "Gained recognition for reliable service and built long-term relationships with clients and partners.",
    },
    {
        year: "2018",
        title: "Embracing Innovation",
        text: "Adopted new technologies to streamline the property search and improve customer experience.",
    },
    {
        year: "2021",
        title: "Over 1,000 Homes Sold",
        text: "Reached a major milestone with over a thousand successful property transactions completed.",
    },
    {
        year: "2024",
        title: "Moving Forward Together",
        text: "Continuing to grow with a dedicated team, modern tools, and a renewed vision for the future.",
    },
];

export default function OurHistory() {
    return (
        <>
            <div className=" t-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Our History
                    </span>
                    <h3 className="split-text effect-blur-fade">Milestones That Define Us</h3>
                </div>
            </div>
            <div className="content">
                <div className="tf-container w-xl">
                    <div className="wrap-time-line">
                        {history.map((item, index) => (
                            <div className="time-item" key={index}>
                                <div className="heading">
                                    <h3 className="mb_8">{item.year}</h3>
                                    <span className="sub text-label text-uppercase fw-6 ">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="dot"></div>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
