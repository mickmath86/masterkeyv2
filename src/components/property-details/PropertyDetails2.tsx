import React from "react";
import Nearby from "./Nearby";
import FormComments from "../common/FormComments";
import PropertiesTitle2 from "./PropertiesTitle2";
import Image from "next/image";
import Description from "./Description";
import Overview2 from "./Overview2";
import Utility2 from "./Utility2";
import MenuTab from "./MenuTab";
import Caculator2 from "./Caculator2";
import BoxSeller2 from "./BoxSeller2";
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

export default function PropertyDetails2({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-details tf-spacing-1">
                <div className="tf-container">
                    <div className="properties-title v2">
                        <PropertiesTitle2 property={property} />
                    </div>
                    <div className="tf-spacing-8">
                        <div className="properties-thumbs ">
                            <Image
                                width={1290}
                                height={680}
                                src="/assets/images/section/properties-details-4.jpg"
                                alt="properties"
                                priority
                            />
                        </div>
                    </div>
                    <div className="row wrap-properties">
                        <div className="col-lg-6">
                            <Description />
                        </div>
                        <div className="col-lg-5 offset-xl-1">
                            <div className="properties-overview v2">
                                <Overview2 />
                            </div>
                        </div>
                    </div>
                    <div className="properties-utility v2 tf-spacing-8">
                        <Utility2 />
                    </div>
                    <div className="properties-menutab">
                        <MenuTab property={property} />
                    </div>
                    <div className="properties-calculator tf-spacing-8">
                        <Caculator2 />
                    </div>
                    <div className="properties-nearby tf-spacing-8 pt-0">
                        <Nearby />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="box-sellers style-1">
                                <BoxSeller2 />
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="properties-comment">
                                <Comment />
                                <FormComments />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
