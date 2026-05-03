import React from "react";
import {
    bathroomOptions,
    garageOptions,
    minSizeOptions,
    maxSizeOptions,
    amenitiesList,
} from "@/data/optionfilter";
import DropdownSelect2 from "./DropdownSelect2";

interface AdvanceSearchProps {
    ddContainer: React.RefObject<HTMLDivElement>;
}


export default function AdvanceSearchDefault({
    ddContainer,
}: AdvanceSearchProps) {


    return (
        <div className="wd-search-form" ref={ddContainer}>
            <div className="group-select">
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Bathrooms
                        </div>
                        <DropdownSelect2
                            options={bathroomOptions}
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Garages
                        </div>
                        <DropdownSelect2
                            options={garageOptions}
                        />
                    </div>
                </div>
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Min size
                        </div>
                        <DropdownSelect2
                            options={minSizeOptions}
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Max size
                        </div>
                        <DropdownSelect2
                            options={maxSizeOptions}
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
