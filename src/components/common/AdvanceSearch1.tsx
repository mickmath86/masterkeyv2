import React from "react";
import DropdownSelect from "./DropdownSelect";
import {
    bathroomOptions,
    garageOptions,
    minSizeOptions,
    maxSizeOptions,
    amenitiesList,
} from "@/data/optionfilter";

interface AdvanceSearchProps {
    allProps: {
        bathrooms: string;
        setBathrooms: (bathrooms: string) => void;
        garages: string;
        setGarages: (garages: string) => void;
        minSize: string;
        setMinSize: (minSize: string) => void;
        maxSize: string;
        setMaxSize: (maxSize: string) => void;
        features: string[];
        setFeatures: (feature: string) => void;
    };
    handleFeatureChange: (feature: string) => void;
    ddContainer: React.RefObject<HTMLDivElement>;
}



export default function AdvanceSearch({
    allProps,
    handleFeatureChange,
    ddContainer,
}: AdvanceSearchProps) {
    const { bathrooms, garages, minSize, maxSize, features } = allProps;

    return (
        <div className="wd-search-form" ref={ddContainer}>
            <div className="group-select">
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Bathrooms
                        </div>
                        <DropdownSelect
                            options={bathroomOptions}
                            selected={bathrooms}
                            setSelected={allProps.setBathrooms}
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Garages
                        </div>
                        <DropdownSelect
                            options={garageOptions}
                            selected={garages}
                            setSelected={allProps.setGarages}
                        />
                    </div>
                </div>
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Min size
                        </div>
                        <DropdownSelect
                            options={minSizeOptions}
                            selected={minSize}
                            setSelected={allProps.setMinSize}
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Max size
                        </div>
                        <DropdownSelect
                            options={maxSizeOptions}
                            selected={maxSize}
                            setSelected={allProps.setMaxSize}
                        />
                    </div>
                </div>
            </div>
            <div className="group-checkbox">
                <div className="text-title text_primary-color mb_12 fw-6">
                    Amenities:
                </div>
                <div className="group-amenities">
                    {amenitiesList.map((amenity) => (
                        <fieldset
                            key={amenity}
                            className="checkbox-item style-1"
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={features.includes(amenity)}
                                    onChange={() =>
                                        handleFeatureChange(amenity)
                                    }
                                />
                                <span className="btn-checkbox"></span>
                                <span className="text-body-default">
                                    {amenity}
                                </span>
                            </label>
                        </fieldset>
                    ))}
                </div>
            </div>
        </div>
    );
}
