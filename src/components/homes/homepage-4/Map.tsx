import MapComponent from "@/components/common/Map";
import React from "react";
import { properties } from "@/data/properties";

export default function Map() {

    return (
        <div className="mapbox-3 ">
            <MapComponent
               sorted={properties as []}
            />
        </div>
    );
}
