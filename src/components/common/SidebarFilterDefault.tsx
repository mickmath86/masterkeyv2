"use client";
import React, { useRef, useEffect, useState } from "react";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/optionfilter";
import DropdownSelect2 from "./DropdownSelect2";
import AdvanceSearchDefault from "./AdvanceSearchDefault";
import { useRouter } from "next/navigation";

export default function SidebarFilterDefault() {
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedBedrooms, setSelectedBedrooms] = useState("Any Bedrooms");
    const [selectedBudget, setSelectedBudget] = useState("Max. Price");
    const [activeTab, setActiveTab] = useState<"Rent" | "Sale">("Sale");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ddContainer.current &&
                !ddContainer.current.contains(event.target as Node) &&
                advanceBtnRef.current &&
                !advanceBtnRef.current.contains(event.target as Node)
            ) {
                ddContainer.current.classList.remove("show");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchKeyword.trim()) params.set("q", searchKeyword.trim());
        if (selectedCity && selectedCity !== "All Cities") params.set("city", selectedCity);
        if (selectedBedrooms && selectedBedrooms !== "Any Bedrooms") params.set("bedrooms", selectedBedrooms);
        if (selectedBudget && selectedBudget !== "Max. Price") params.set("budget", selectedBudget);
        params.set("type", activeTab);

        router.push(`/listing-half-map-grid?${params.toString()}`);
    };

    return (
        <div className="flat-tab flat-tab-form">
            <div className="tf-container">
                <ul
                    className="nav-tab-form style-1 justify-content-center"
                    role="tablist"
                >
                    <li className="nav-tab-item text-title fw-6" role="presentation">
                        <a
                            href="#forSale"
                            className={`nav-link-item${activeTab === "Sale" ? " active" : ""}`}
                            data-bs-toggle="tab"
                            onClick={() => setActiveTab("Sale")}
                        >
                            For Sale
                        </a>
                    </li>
                    <li className="nav-tab-item text-title fw-6" role="presentation">
                        <a
                            href="#forRent"
                            className={`nav-link-item${activeTab === "Rent" ? " active" : ""}`}
                            data-bs-toggle="tab"
                            onClick={() => setActiveTab("Rent")}
                        >
                            For Rent
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
                                            placeholder="City, address, keyword..."
                                            id="lookingFor"
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                        />
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        Location
                                    </div>
                                    <DropdownSelect2
                                        options={cityOptions}
                                        onChange={(val) => setSelectedCity(val)}
                                    />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        Bedrooms
                                    </div>
                                    <DropdownSelect2
                                        options={bedroomOptions}
                                        onChange={(val) => setSelectedBedrooms(val)}
                                    />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        Your Budget
                                    </div>
                                    <DropdownSelect2
                                        options={budgetOptions}
                                        onChange={(val) => setSelectedBudget(val)}
                                    />
                                </div>
                            </div>
                            <div className="wrap-btn">
                                <div
                                    className="btn-filter show-form"
                                    onClick={() =>
                                        ddContainer.current?.classList.toggle("show")
                                    }
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
                    <AdvanceSearchDefault
                        ddContainer={ddContainer as React.RefObject<HTMLDivElement>}
                    />
                </div>
            </div>
        </div>
    );
}
