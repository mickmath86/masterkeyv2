import React from "react";
import Overview from "./Overview";
import PropertiesTitle from "./PropertiesTitle";
import Description from "./Description";
import PropertyUtility from "./Utility";
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
import type { ListingDetail } from "@/types/listing";

export default function PropertyDetails1({ listing }: { listing: ListingDetail }) {
    return (
        <>
            <div className="properties-details">
                <Slide1 listing={listing} />
                <div className="tf-container tf-spacing-7">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="properties-title">
                                <PropertiesTitle listing={listing} />
                            </div>
                            <div className="properties-overview tf-spacing-8">
                                <Overview listing={listing} />
                            </div>
                            <div className="properties-description tf-spacing-8">
                                <Description listing={listing} />
                            </div>
                            <div className="properties-utility tf-spacing-8">
                                <PropertyUtility listing={listing} />
                            </div>
                            {/* Video renders itself as null when no video URL */}
                            <Video listing={listing} />
                            <div className="properties-calculator tf-spacing-8">
                                <Caculator listing={listing} />
                            </div>
                            {/* Floor renders itself as null when no floor plans or docs */}
                            <Floor listing={listing} />
                            <div className="properties-location tf-spacing-8">
                                <Location property={{
                                    id: 0,
                                    imgSrc: listing.imgSrc,
                                    alt: listing.alt,
                                    address: listing.address,
                                    title: listing.title,
                                    beds: listing.beds,
                                    baths: listing.baths,
                                    sqft: listing.sqft,
                                    categories: listing.categories,
                                    type: listing.type,
                                    lat: listing.lat,
                                    long: listing.long,
                                    price: listing.price,
                                    coordinates: listing.coordinates,
                                    garages: listing.garages,
                                    city: listing.city,
                                }} />
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
