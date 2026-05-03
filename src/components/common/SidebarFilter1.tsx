import React from "react";
import DropdownSelect from "./DropdownSelect";
import AdvanceSearch from "./AdvanceSearch1";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/optionfilter";

interface SidebarFilter1Props {
    allProps: {
        city: string;
        setCity: (city: string) => void;
        bedrooms: string;
        setBedrooms: (bedrooms: string) => void;
        bathrooms: string;
        setBathrooms: (bathrooms: string) => void;
        garages: string;
        setGarages: (garages: string) => void;
        budget: string;
        setBudget: (budget: string) => void;
        minSize: string;
        setMinSize: (minSize: string) => void;
        maxSize: string;
        setMaxSize: (maxSize: string) => void;
        features: string[];
        setFeatures: (feature: string) => void;
    };
    searchKeyword: string;
    setSearchKeyword: (val: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    handleFeatureChange: (feature: string) => void;
    ddContainer: React.RefObject<HTMLDivElement>;
    advanceBtnRef: React.RefObject<HTMLDivElement>;
    toggleAdvancedFilter: () => void;
}

export default function SidebarFilter1({
    allProps,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
    handleFeatureChange,
    ddContainer,
    advanceBtnRef,
    toggleAdvancedFilter,
}: SidebarFilter1Props) {
    const { city, bedrooms, budget } = allProps;

    return (
        <div className="flat-tab flat-tab-form">
            <ul
                className="nav-tab-form style-1 justify-content-center"
                role="tablist"
            >
                <li
                    className="nav-tab-item text-title fw-6"
                    role="presentation"
                >
                    <a
                        href="#forRent"
                        className="nav-link-item active"
                        data-bs-toggle="tab"
                    >
                        For Rent
                    </a>
                </li>
                <li
                    className="nav-tab-item text-title fw-6"
                    role="presentation"
                >
                    <a
                        href="#forSale"
                        className="nav-link-item"
                        data-bs-toggle="tab"
                    >
                        For Sale
                    </a>
                </li>
            </ul>

            <div className="wg-filter">
                <div className="widget-content-inner active">
                    <div className="form-title">
                        <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2">
                            <form className="w-full" onSubmit={handleSearch}>
                                <label
                                    htmlFor="lookingFor"
                                    className="text-button text_primary-color mb_8"
                                >
                                    Looking For
                                </label>
                                <fieldset>
                                    <input
                                        type="text"
                                        placeholder="Search keyword"
                                        id="lookingFor"
                                        value={searchKeyword}
                                        onChange={(e) =>
                                            setSearchKeyword(e.target.value)
                                        }
                                    />
                                </fieldset>
                            </form>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    Location
                                </div>
                                <DropdownSelect
                                    options={cityOptions}
                                    selected={city}
                                    setSelected={allProps.setCity}
                                />
                            </div>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    Bedrooms
                                </div>
                                <DropdownSelect
                                    options={bedroomOptions}
                                    selected={bedrooms}
                                    setSelected={allProps.setBedrooms}
                                />
                            </div>
                            <div>
                                <div className="text-button text_primary-color mb_8">
                                    Your Budget
                                </div>
                                <DropdownSelect
                                    options={budgetOptions}
                                    selected={budget}
                                    setSelected={allProps.setBudget}
                                />
                            </div>
                        </div>
                        <div className="wrap-btn">
                            <div
                                className="btn-filter show-form"
                                onClick={toggleAdvancedFilter}
                                ref={advanceBtnRef}
                            >
                                <div className="icons">
                                    <i className="icon-Faders"></i>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="tf-btn btn-px-28 btn-bg-1"
                                onClick={handleSearch}
                            >
                                <span>Search </span>
                                <span className="bg-effect"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <AdvanceSearch
                    allProps={allProps}
                    ddContainer={ddContainer}
                    handleFeatureChange={handleFeatureChange}
                />
            </div>
        </div>
    );
}
