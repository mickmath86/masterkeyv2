import React from "react";
import Overview from "./Overview";
import PropertiesTitle from "./PropertiesTitle";
import Description from "./Description";
import PropertiesUtility from "./Utility";
import Video from "./Video";
import Caculator from "./Caculator";
import Floor from "./Floor";
import Location from "./Location";
import Nearby from "./Nearby";

import FormComments from "../common/FormComments";
import BoxSeller1 from "./BoxSeller1";
import BoxFilter from "./BoxFilter";
import Slide1 from "./Slide1";
import Comment from "../common/Comment";

type Property = {
    id: number;
    imgSrc: string;
    imgSrc2?: string;
    imgSrc3?: string;
    alt?: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    lat?: number;
    long?: number;
    filterOptions?: string[];
    features?: string[];
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

export default function PropertyDetails1({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-details">
                <Slide1 />
                <div className="tf-container tf-spacing-7">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="properties-title ">
                                <PropertiesTitle property={property} />
                            </div>
                            <div className="properties-overview tf-spacing-8">
                                <Overview />
                            </div>
                            <div className="properties-description">
                                <Description />
                            </div>
                            <div className="properties-utility tf-spacing-8">
                                <PropertiesUtility />
                            </div>
                            <div className="properties-video">
                                <Video property={property} />
                            </div>
                            <div className="properties-calculator tf-spacing-8">
                                <Caculator />
                            </div>
                            <div className="properties-floor">
                                <Floor />
                            </div>
                            <div className="properties-location tf-spacing-8">
                                <Location property={property} />
                            </div>
                            <div className="properties-nearby">
                                <Nearby />
                            </div>
                            <div className="tf-spacing-8 pb-0 mb_40">
                                <Comment />
                            </div>
                            <FormComments />
                        </div>
                        <div className="col-lg-4">
                            <div className="right sticky-top">
                                <div className="box-sellers mb_30">
                                    <BoxSeller1 />
                                </div>
                                <div className="tf-filter-sidebar ms-lg-auto">
                                    <BoxFilter />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
