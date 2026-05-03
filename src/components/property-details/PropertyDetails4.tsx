import React from "react";
import Nearby from "./Nearby";
import FormComments from "../common/FormComments";
import PropertiesTitle2 from "./PropertiesTitle2";
import Description from "./Description";
import Overview2 from "./Overview2";
import PropertyUtility from "./Utility";
import Video from "./Video";
import Caculator from "./Caculator";
import Location from "./Location";
import Floor2 from "./Floor2";
import BoxSeller3 from "./BoxSeller3";
import Gallery2 from "./Gallery2";
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

export default function PropertyDetails4({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-details">
                <Gallery2 />
                <div className="tf-container  tf-spacing-1">
                    <div className="properties-title v2">
                        <PropertiesTitle2 property={property} />
                    </div>
                    <div className="properties-overview v4 tf-spacing-8">
                        <Overview2 />
                    </div>

                    <div className="properties-description">
                        <Description />
                    </div>

                    <div className="properties-utility tf-spacing-8">
                        <PropertyUtility />
                    </div>

                    <div className="properties-video v2">
                        <Video property={property} />
                    </div>

                    <div className="properties-calculator tf-spacing-8">
                        <Caculator />
                    </div>

                    <div className="properties-floor">
                        <Floor2 />
                    </div>

                    <div className="properties-location v3 tf-spacing-8">
                        <Location property={property} />
                    </div>

                    <div className="properties-nearby ">
                        <Nearby />
                    </div>
                    <div className="properties-seller tf-spacing-8">
                        <BoxSeller3 />
                    </div>
                    <div className="mb_40">
                        <Comment />
                    </div>
                    <FormComments />
                </div>
            </div>
        </>
    );
}
