import React, { useState } from "react";
import DropdownSelect from "./DropdownSelect";
import { useEffect } from "react";
import {
    bathroomOptions,
    bedroomOptions,
    budgetOptions,
    cityOptions,
    garageOptions,
    maxSizeOptions,
    minSizeOptions,
} from "@/data/optionfilter";
import AdvanceSearch2 from "./AdvanceSearch2";
import { Modal } from "react-bootstrap";

// Helper to update the tab slide effect
function updateTabSlideEffect() {
    const tabSlide = document.querySelector(".tab-slide");
    if (!tabSlide) return;

    const activeTab = tabSlide.querySelector("li.active") as HTMLElement | null;
    const effect = tabSlide.querySelector(
        ".item-slide-effect"
    ) as HTMLElement | null;

    if (activeTab && effect) {
        const width = activeTab.offsetWidth;
        const left = activeTab.offsetLeft;
        effect.style.width = `${width}px`;
        effect.style.transform = `translateX(${left}px)`;
    }
}

// Custom hook to handle tab slide effect
function useTabSlide() {
    useEffect(() => {
        const tabSlide = document.querySelector(".tab-slide");
        if (!tabSlide) return;

        const tabItems = Array.from(
            tabSlide.querySelectorAll("li.nav-tab-item")
        );

        function handleTabClick(this: HTMLElement) {
            tabItems.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
            updateTabSlideEffect();
        }

        tabItems.forEach((item) => {
            item.addEventListener("click", handleTabClick as EventListener);
        });

        window.addEventListener("resize", updateTabSlideEffect);

        // Initial update
        updateTabSlideEffect();

        // Cleanup
        return () => {
            tabItems.forEach((item) => {
                item.removeEventListener(
                    "click",
                    handleTabClick as EventListener
                );
            });
            window.removeEventListener("resize", updateTabSlideEffect);
        };
    }, []);
}

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

export default function SidebarFilter4({
    allProps,
    searchKeyword,
    setSearchKeyword,
    handleSearch,
    handleFeatureChange,
    ddContainer,
}: SidebarFilter1Props) {
    const { city, bedrooms, budget, bathrooms, minSize, maxSize, garages } =
        allProps;
    useTabSlide();
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleShowAdvanced = () => setShowAdvanced(true);
    const handleCloseAdvanced = () => setShowAdvanced(false);

    return (
        <>
            <div className="tf-filter-sidebar style-1">
                <div className="tab-slide mb_14">
                    <ul
                        className="menu-tab tf-grid-layout tf-col-2 gap_8"
                        role="tablist"
                    >
                        <li className="item-slide-effect"></li>
                        <li className="nav-tab-item active" role="presentation">
                            <a
                                href="#standard-plan"
                                className="text-title tab-link fw-6 active"
                                data-bs-toggle="tab"
                            >
                                For Rent
                            </a>
                        </li>
                        <li className="nav-tab-item" role="presentation">
                            <a
                                href="#premium-plan"
                                className="text-title tab-link fw-6"
                                data-bs-toggle="tab"
                            >
                                For Sale
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade active show" role="tabpanel">
                        <div className="form-sl">
                            <div className="wd-filter-select">
                                <div className="inner-group d-grid gap_16">
                                    <form
                                        className="w-full"
                                        onSubmit={handleSearch}
                                    >
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
                                                    setSearchKeyword(
                                                        e.target.value
                                                    )
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
                                    <div className="tf-grid-layout sm-col-2 gap_20">
                                        <div className="box-select">
                                            <div className="text-button text_primary-color mb_8">
                                                Min Size
                                            </div>
                                            <DropdownSelect
                                                options={minSizeOptions}
                                                selected={minSize}
                                                setSelected={
                                                    allProps.setMinSize
                                                }
                                            />
                                        </div>
                                        <div className="box-select">
                                            <div className="text-button text_primary-color mb_8">
                                                Max Size
                                            </div>
                                            <DropdownSelect
                                                options={maxSizeOptions}
                                                selected={maxSize}
                                                setSelected={
                                                    allProps.setMaxSize
                                                }
                                            />
                                        </div>
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
                                    <div
                                        className="show-avanced d-flex gap_4 align-items-center text_primary-color text-button link"
                                        onClick={handleShowAdvanced}
                                    >
                                        <i className="icon-Faders"></i>
                                        Show Advanced
                                    </div>
                                    <div className="form-style">
                                        <button
                                            type="submit"
                                            className="tf-btn w-full"
                                        >
                                            <span>Search</span>
                                            <span className="bg-effect"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <Modal
                show={showAdvanced}
                onHide={handleCloseAdvanced}
                className="modal-filter"
                centered
            >
                <AdvanceSearch2
                    allProps={allProps}
                    ddContainer={ddContainer}
                    handleFeatureChange={handleFeatureChange}
                />
            </Modal>
        </>
    );
}
