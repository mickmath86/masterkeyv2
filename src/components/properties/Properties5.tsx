"use client";
import { allProperties } from "@/data/properties";
import Image from "next/image";
import React, { useEffect, useRef, useState, useReducer } from "react";
import { initialState, reducer } from "@/context/propertiesFilterReduce";
import Pagination from "@/components/common/Pagination";
import type { Property } from "@/data/properties";
import DropdownSelect2 from "../common/DropdownSelect2";
import SidebarFilter3 from "../common/SidebarFilter3";
import Link from "next/link";
import MapComponent from "../common/Map";

function parseSizeValue(val: string) {
    if (val === "Min (SqFt)" || val === "Max (SqFt)") return val;
    return val.replace(/[^0-9]/g, "");
}

export default function Properties5() {
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);

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

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        bedrooms,
        bathrooms,
        garages,
        city,
        budget,
        minSize,
        maxSize,
        features,
        filtered,
        sortingOption,
        type,
        sorted,
        currentPage,
        itemPerPage,
    } = state;

    // Additional state for form elements
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    // Filtering logic
    useEffect(() => {
        let filteredList: Property[] = allProperties;

        // City filter
        if (city && city !== "All Cities") {
            filteredList = filteredList.filter(
                (p) => p.city && p.city === city
            );
        }

        // Type filter
        if (type && type !== "Any Type") {
            filteredList = filteredList.filter(
                (p) => p.type && p.type === type
            );
        }

        // Bedrooms filter
        if (bedrooms && bedrooms !== "Any Bedrooms") {
            if (bedrooms === "4+") {
                filteredList = filteredList.filter((p) => Number(p.beds) >= 4);
            } else {
                const bedroomNum = parseInt(bedrooms, 10);
                filteredList = filteredList.filter(
                    (p) => p.beds === bedroomNum
                );
            }
        }

        // Bathrooms filter
        if (bathrooms && bathrooms !== "Any Bathrooms") {
            if (bathrooms === "4+") {
                filteredList = filteredList.filter((p) => Number(p.baths) >= 4);
            } else {
                const bathroomNum = parseInt(bathrooms, 10);
                filteredList = filteredList.filter(
                    (p) => p.baths === bathroomNum
                );
            }
        }

        // Garages filter
        if (garages && garages !== "Any Garages") {
            if (garages === "3+") {
                filteredList = filteredList.filter(
                    (p) => Number(p.garages) >= 3
                );
            } else {
                const garageNum = parseInt(garages, 10);
                filteredList = filteredList.filter(
                    (p) => p.garages === garageNum
                );
            }
        }

        // Budget filter
        if (budget && budget !== "Max. Price") {
            let maxBudget = 0;
            if (budget.startsWith("Under $")) {
                maxBudget = parseInt(
                    budget.replace("Under $", "").replace(/,/g, ""),
                    10
                );
                filteredList = filteredList.filter(
                    (p) => Number(p.price) <= maxBudget
                );
            } else if (budget.startsWith("$")) {
                maxBudget = parseInt(
                    budget.replace("$", "").replace(/,/g, ""),
                    10
                );
                filteredList = filteredList.filter(
                    (p) => Number(p.price) <= maxBudget
                );
            } else if (budget.startsWith("Above $")) {
                maxBudget = parseInt(
                    budget.replace("Above $", "").replace(/,/g, ""),
                    10
                );
                filteredList = filteredList.filter(
                    (p) => Number(p.price) > maxBudget
                );
            }
        }

        // Min size filter
        if (minSize && minSize !== "Min (SqFt)") {
            const min = parseInt(parseSizeValue(minSize), 10);
            if (!isNaN(min)) {
                filteredList = filteredList.filter(
                    (p) => p.sqft !== undefined && Number(p.sqft) >= min
                );
            }
        }

        // Max size filter
        if (maxSize && maxSize !== "Max (SqFt)") {
            const max = parseInt(parseSizeValue(maxSize), 10);
            if (!isNaN(max)) {
                filteredList = filteredList.filter(
                    (p) => p.sqft !== undefined && Number(p.sqft) <= max
                );
            }
        }

        // Features filter
        if (features && features.length > 0) {
            filteredList = filteredList.filter(
                (p) =>
                    Array.isArray(p.features) &&
                    features.every((f) => p.features!.includes(f))
            );
        }

        // Search keyword filter
        if (searchKeyword && searchKeyword.trim() !== "") {
            const kw = searchKeyword.trim().toLowerCase();
            filteredList = filteredList.filter(
                (p) =>
                    (p.title && p.title.toLowerCase().includes(kw)) ||
                    (p.address && p.address.toLowerCase().includes(kw)) ||
                    (p.city && p.city.toLowerCase().includes(kw))
            );
        }

        dispatch({ type: "SET_FILTERED", payload: filteredList });
    }, [
        bedrooms,
        bathrooms,
        garages,
        city,
        type,
        budget,
        minSize,
        maxSize,
        features,
        searchKeyword,
    ]);

    // Sorting logic
    useEffect(() => {
        const sortedList = [...filtered];
        if (sortingOption === "Price Ascending") {
            sortedList.sort((a, b) => a.price - b.price);
        } else if (sortingOption === "Price Descending") {
            sortedList.sort((a, b) => b.price - a.price);
        }
        dispatch({ type: "SET_SORTED", payload: sortedList });
        dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    }, [filtered, sortingOption]);

    const handleFeatureChange = (feature: string) => {
        const updated = features.includes(feature)
            ? features.filter((elm) => elm !== feature)
            : [...features, feature];
        dispatch({ type: "SET_FEATURES", payload: updated });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const toggleAdvancedFilter = () => {
        if (ddContainer.current) {
            ddContainer.current.classList.toggle("show");
        }
    };

    // Props for DropdownSelect
    const allProps = {
        city,
        setCity: (newCity: string) =>
            dispatch({ type: "SET_CITY", payload: newCity }),
        type,
        setType: (newType: string) =>
            dispatch({ type: "SET_TYPE", payload: newType }),
        bedrooms,
        setBedrooms: (newBedrooms: string) =>
            dispatch({ type: "SET_BEDROOMS", payload: newBedrooms }),
        bathrooms,
        setBathrooms: (newBathrooms: string) =>
            dispatch({ type: "SET_BATHROOMS", payload: newBathrooms }),
        garages,
        setGarages: (newGarages: string) =>
            dispatch({ type: "SET_GARAGES", payload: newGarages }),
        budget,
        setBudget: (newBudget: string) =>
            dispatch({ type: "SET_BUDGET", payload: newBudget }),
        minSize,
        setMinSize: (newMinSize: string) =>
            dispatch({ type: "SET_MINSIZE", payload: newMinSize }),
        maxSize,
        setMaxSize: (newMaxSize: string) =>
            dispatch({ type: "SET_MAXSIZE", payload: newMaxSize }),
        features,
        setFeatures: (newFeature: string) => {
            const updated = features.includes(newFeature)
                ? features.filter((elm) => elm !== newFeature)
                : [...features, newFeature];
            dispatch({ type: "SET_FEATURES", payload: updated });
        },
    };

    return (
        <>
            <div className="main-content">
                <SidebarFilter3
                    allProps={allProps}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                    handleSearch={handleSearch}
                    handleFeatureChange={handleFeatureChange}
                    ddContainer={ddContainer as React.RefObject<HTMLDivElement>}
                    advanceBtnRef={
                        advanceBtnRef as React.RefObject<HTMLDivElement>
                    }
                    toggleAdvancedFilter={toggleAdvancedFilter}
                />

                <div className="wrapper-layout">
                    <div className="wrap-left">
                        <div className="box-title mb_30">
                            <div>
                                <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                                    <li>
                                        <Link className="" href={"/"}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>With Half Map</li>
                                </ul>
                                <h4>With Half Map</h4>
                            </div>
                            <div className="right d-flex gap_12">
                                <ul
                                    className="nav-tab-filter align-items-center group-layout  d-flex gap_12"
                                    role="tablist"
                                >
                                    <li
                                        className="nav-tab-item"
                                        role="presentation"
                                    >
                                        <a
                                            href="#gridLayout"
                                            className=" btn-layout grid nav-link-item active"
                                            data-bs-toggle="tab"
                                        >
                                            <i className="icon-SquaresFour"></i>
                                        </a>
                                    </li>
                                    <li
                                        className="nav-tab-item"
                                        role="presentation"
                                    >
                                        <a
                                            href="#listLayout"
                                            className="nav-link-item btn-layout list "
                                            data-bs-toggle="tab"
                                        >
                                            <i className="icon-Rows"></i>
                                        </a>
                                    </li>
                                </ul>
                                <DropdownSelect2
                                    onChange={(value) =>
                                        dispatch({
                                            type: "SET_SORTING_OPTION",
                                            payload: value,
                                        })
                                    }
                                    addtionalParentClass="list-sort"
                                    options={[
                                        "Sort by (Default)",
                                        "Price Ascending",
                                        "Price Descending",
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="flat-animate-tab">
                            <div className="tab-content">
                                <div
                                    className="tab-pane active show"
                                    id="gridLayout"
                                    role="tabpanel"
                                >
                                    <div className="tf-grid-layout md-col-2">
                                        {sorted
                                            .slice(
                                                (currentPage - 1) * 8,
                                                currentPage * 8
                                            )
                                            .map((property) => (
                                                <div
                                                    key={property.id}
                                                    className="card-house style-default hover-image"
                                                    data-id={property.id}
                                                >
                                                    <div className="img-style mb_20">
                                                        <Image
                                                            src={
                                                                property.imgSrc
                                                            }
                                                            width={410}
                                                            height={308}
                                                            alt="home"
                                                        />
                                                        <div className="wrap-tag d-flex gap_8 mb_12">
                                                            <div
                                                                className={`tag ${
                                                                    property.type ===
                                                                    "Sale"
                                                                        ? "sale"
                                                                        : property.type ===
                                                                          "Rent"
                                                                        ? "rent"
                                                                        : property.type
                                                                } text-button-small fw-6 text_primary-color`}
                                                            >
                                                                For{" "}
                                                                {property.type}
                                                            </div>
                                                            <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                                {
                                                                    property.categories
                                                                }
                                                            </div>
                                                        </div>

                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="overlay-link"
                                                        ></Link>
                                                        <div className="wishlist">
                                                            <div className="hover-tooltip tooltip-left box-icon">
                                                                <span className="icon icon-Heart"></span>
                                                                <span className="tooltip">
                                                                    Add to
                                                                    Wishlist
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <h4
                                                            className="price mb_12"
                                                            suppressHydrationWarning
                                                        >
                                                            $
                                                            {property.price.toLocaleString()}
                                                            <span className="text_secondary-color text-body-default">
                                                                {property.type ===
                                                                "Sale"
                                                                    ? "/Sqft"
                                                                    : "/month"}
                                                            </span>
                                                        </h4>
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="title mb_8 h5 link text_primary-color"
                                                        >
                                                            {property.title}
                                                        </Link>
                                                        <p>
                                                            {property.address}
                                                        </p>
                                                        <ul className="info d-flex">
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bed"></i>
                                                                {property.beds}{" "}
                                                                Bed
                                                            </li>
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bathtub"></i>
                                                                {property.baths}{" "}
                                                                Bath
                                                            </li>
                                                            <li
                                                                className="d-flex align-items-center gap_8 text-title text_primary-color fw-6 "
                                                                suppressHydrationWarning
                                                            >
                                                                <i className="icon-Ruler"></i>
                                                                {property.sqft
                                                                    ? property.sqft.toLocaleString()
                                                                    : "0"}{" "}
                                                                Sqft
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div
                                    className="tab-pane "
                                    id="listLayout"
                                    role="tabpanel"
                                >
                                    <div className="wrap-list d-grid gap_30">
                                        {sorted
                                            .slice(
                                                (currentPage - 1) * itemPerPage,
                                                currentPage * itemPerPage
                                            )
                                            .map((property) => (
                                                <div
                                                    className="card-house style-list v3"
                                                    data-id={property.id}
                                                    key={property.id}
                                                >
                                                    <div className="wrap-img">
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="img-style"
                                                        >
                                                            <Image
                                                                src={
                                                                    property.imgSrc
                                                                }
                                                                layout="responsive"
                                                                width={392}
                                                                height={260}
                                                                alt={
                                                                    property.alt ||
                                                                    "home"
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <div className="d-flex align-items-center gap_6 top mb_16 flex-wrap justify-content-between">
                                                            <h4
                                                                className="price "
                                                                suppressHydrationWarning
                                                            >
                                                                $
                                                                {property.price.toLocaleString()}
                                                                <span className="text_secondary-color text-body-default">
                                                                    {property.type ===
                                                                    "Sale"
                                                                        ? "/Sqft"
                                                                        : "/month"}
                                                                </span>
                                                            </h4>
                                                            <div className="wrap-tag d-flex gap_8">
                                                                <div
                                                                    className={`tag ${
                                                                        property.type ===
                                                                        "Sale"
                                                                            ? "sale"
                                                                            : "rent"
                                                                    } text-button-small fw-6 text_primary-color`}
                                                                >
                                                                    {property.type ===
                                                                    "Sale"
                                                                        ? "For Sale"
                                                                        : "For Rent"}
                                                                </div>
                                                                <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                                    {
                                                                        property.categories
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={`/property-details-1/${property.id}`}
                                                            className="title mb_8 h5 link text_primary-color"
                                                        >
                                                            {property.title}
                                                        </Link>
                                                        <p>
                                                            {property.address}
                                                        </p>
                                                        <ul className="info d-flex">
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bed"></i>
                                                                {property.beds}{" "}
                                                                Bed
                                                            </li>
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bathtub"></i>
                                                                {property.baths}{" "}
                                                                Bath
                                                            </li>
                                                            <li
                                                                className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                                                                suppressHydrationWarning
                                                            >
                                                                <i className="icon-Ruler"></i>
                                                                {property.sqft
                                                                    ? property.sqft.toLocaleString()
                                                                    : "0"}{" "}
                                                                Sqft
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    setPage={(value) =>
                                        dispatch({
                                            type: "SET_CURRENT_PAGE",
                                            payload: value,
                                        })
                                    }
                                    itemLength={sorted.length}
                                    itemPerPage={itemPerPage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="wrap-right overflow-hidden">
                        <MapComponent sorted={sorted as []} />
                    </div>
                </div>
            </div>
        </>
    );
}
