"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Pagination from "@/components/common/Pagination";
import type { MappedProperty } from "@/lib/repliers";
import { mapListingToProperty } from "@/lib/repliers";
import DropdownSelect2 from "../common/DropdownSelect2";
import SidebarFilter3 from "../common/SidebarFilter3";
import Link from "next/link";
import MapComponent from "../common/Map";
import { useSearchParams, useRouter } from "next/navigation";
import {
    bedroomOptions,
    budgetOptions,
    cityOptions,
} from "@/data/optionfilter";

function buildBudgetParams(budget: string) {
    if (!budget || budget === "Max. Price") return {};
    if (budget.startsWith("Under $")) {
        return { maxPrice: budget.replace("Under $", "").replace(/,/g, "") };
    }
    if (budget.startsWith("Above $")) {
        return { minPrice: budget.replace("Above $", "").replace(/,/g, "") };
    }
    if (budget.startsWith("$")) {
        return { maxPrice: budget.replace("$", "").replace(/,/g, "") };
    }
    return {};
}

export default function Properties5() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);

    // Filter state — initialize from URL query params
    const [searchKeyword, setSearchKeyword] = useState(searchParams.get("q") || "");
    const [city, setCity] = useState(searchParams.get("city") || "All Cities");
    const [type, setType] = useState(searchParams.get("type") || "Any Type");
    const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "Any Bedrooms");
    const [bathrooms, setBathrooms] = useState(searchParams.get("bathrooms") || "Any Bathrooms");
    const [garages, setGarages] = useState(searchParams.get("garages") || "Any Garages");
    const [budget, setBudget] = useState(searchParams.get("budget") || "Max. Price");
    const [minSize, setMinSize] = useState(searchParams.get("minSize") || "Min (SqFt)");
    const [maxSize, setMaxSize] = useState(searchParams.get("maxSize") || "Max (SqFt)");
    const [features, setFeatures] = useState<string[]>([]);
    const [sortingOption, setSortingOption] = useState("Sort by (Default)");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;

    // Data state
    const [listings, setListings] = useState<MappedProperty[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // Sync URL params when filters change
    const updateUrl = useCallback((params: Record<string, string>) => {
        const url = new URL(window.location.href);
        Object.entries(params).forEach(([k, v]) => {
            if (v && v !== "All Cities" && v !== "Any Type" && v !== "Any Bedrooms"
                && v !== "Any Bathrooms" && v !== "Any Garages" && v !== "Max. Price"
                && v !== "Min (SqFt)" && v !== "Max (SqFt)") {
                url.searchParams.set(k, v);
            } else {
                url.searchParams.delete(k);
            }
        });
        router.replace(url.pathname + url.search, { scroll: false });
    }, [router]);

    // Fetch from Repliers API
    const fetchListings = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            // Map API type
            if (type && type !== "Any Type") {
                params.set("type", type.toLowerCase() === "sale" ? "sale" : "lease");
            }

            // City filter
            if (city && city !== "All Cities") {
                params.set("city", city);
            }

            // Bedrooms
            if (bedrooms && bedrooms !== "Any Bedrooms") {
                if (bedrooms === "4+") {
                    params.set("minBedrooms", "4");
                } else {
                    params.set("minBedrooms", bedrooms);
                    params.set("maxBedrooms", bedrooms);
                }
            }

            // Bathrooms
            if (bathrooms && bathrooms !== "Any Bathrooms") {
                if (bathrooms === "4+") {
                    params.set("minBaths", "4");
                } else {
                    params.set("minBaths", bathrooms);
                    params.set("maxBaths", bathrooms);
                }
            }

            // Budget
            const budgetParams = buildBudgetParams(budget);
            Object.entries(budgetParams).forEach(([k, v]) => params.set(k, v));

            // Size
            if (minSize && minSize !== "Min (SqFt)") {
                params.set("minSqft", minSize.replace(/[^0-9]/g, ""));
            }
            if (maxSize && maxSize !== "Max (SqFt)") {
                params.set("maxSqft", maxSize.replace(/[^0-9]/g, ""));
            }

            // Keyword search
            if (searchKeyword && searchKeyword.trim()) {
                params.set("search", searchKeyword.trim());
            }

            // Sorting
            if (sortingOption === "Price Ascending") {
                params.set("sortBy", "listPriceAsc");
            } else if (sortingOption === "Price Descending") {
                params.set("sortBy", "listPriceDesc");
            }

            // Pagination
            params.set("pageNum", String(currentPage));
            params.set("resultsPerPage", String(itemPerPage));

            const response = await fetch(`/api/listings?${params.toString()}`);
            if (!response.ok) throw new Error("Failed to fetch listings");

            const data = await response.json();
            const mapped = (data.listings || []).map(mapListingToProperty);
            setListings(mapped);
            setTotalCount(data.count || 0);
            setTotalPages(data.numPages || 1);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setListings([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    }, [type, city, bedrooms, bathrooms, budget, minSize, maxSize, searchKeyword, sortingOption, currentPage]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [type, city, bedrooms, bathrooms, budget, minSize, maxSize, searchKeyword, sortingOption]);

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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFeatureChange = (feature: string) => {
        setFeatures((prev) =>
            prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateUrl({ q: searchKeyword, city, type, bedrooms, bathrooms, budget });
    };

    const toggleAdvancedFilter = () => {
        ddContainer.current?.classList.toggle("show");
    };

    const allProps = {
        city,
        setCity: (v: string) => { setCity(v); updateUrl({ city: v }); },
        type,
        setType: (v: string) => { setType(v); updateUrl({ type: v }); },
        bedrooms,
        setBedrooms: (v: string) => { setBedrooms(v); updateUrl({ bedrooms: v }); },
        bathrooms,
        setBathrooms: (v: string) => { setBathrooms(v); updateUrl({ bathrooms: v }); },
        garages,
        setGarages: (v: string) => setGarages(v),
        budget,
        setBudget: (v: string) => { setBudget(v); updateUrl({ budget: v }); },
        minSize,
        setMinSize: (v: string) => setMinSize(v),
        maxSize,
        setMaxSize: (v: string) => setMaxSize(v),
        features,
        setFeatures: (feature: string) => handleFeatureChange(feature),
    };

    // Map listings to the shape MapComponent expects (needs coordinates)
    const mapListings = listings.map((p) => ({
        ...p,
        id: Number(p.mlsNumber.replace(/\D/g, "").slice(0, 8)) || 1,
    }));

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
                    advanceBtnRef={advanceBtnRef as React.RefObject<HTMLDivElement>}
                    toggleAdvancedFilter={toggleAdvancedFilter}
                />

                <div className="wrapper-layout">
                    <div className="wrap-left">
                        <div className="box-title mb_30">
                            <div>
                                <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                                    <li>
                                        <Link className="" href={"/"}>Home</Link>
                                    </li>
                                    <li>Property Listings</li>
                                </ul>
                                <h4>
                                    {loading
                                        ? "Loading listings..."
                                        : `${totalCount.toLocaleString()} Properties Found`}
                                </h4>
                            </div>
                            <div className="right d-flex gap_12">
                                <ul
                                    className="nav-tab-filter align-items-center group-layout d-flex gap_12"
                                    role="tablist"
                                >
                                    <li className="nav-tab-item" role="presentation">
                                        <a
                                            href="#gridLayout"
                                            className="btn-layout grid nav-link-item active"
                                            data-bs-toggle="tab"
                                        >
                                            <i className="icon-SquaresFour"></i>
                                        </a>
                                    </li>
                                    <li className="nav-tab-item" role="presentation">
                                        <a
                                            href="#listLayout"
                                            className="nav-link-item btn-layout list"
                                            data-bs-toggle="tab"
                                        >
                                            <i className="icon-Rows"></i>
                                        </a>
                                    </li>
                                </ul>
                                <DropdownSelect2
                                    onChange={(value) => setSortingOption(value)}
                                    addtionalParentClass="list-sort"
                                    options={[
                                        "Sort by (Default)",
                                        "Price Ascending",
                                        "Price Descending",
                                    ]}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flat-animate-tab">
                                <div className="tab-content">
                                    {/* Grid Layout */}
                                    <div className="tab-pane active show" id="gridLayout" role="tabpanel">
                                        <div className="tf-grid-layout md-col-2">
                                            {listings.length === 0 ? (
                                                <p className="text-center py-5">No listings found. Try adjusting your filters.</p>
                                            ) : (
                                                listings.map((property) => (
                                                    <div
                                                        key={property.mlsNumber}
                                                        className="card-house style-default hover-image"
                                                        data-id={property.mlsNumber}
                                                    >
                                                        <div className="img-style mb_20">
                                                            <Image
                                                                src={property.imgSrc}
                                                                width={410}
                                                                height={308}
                                                                alt={property.alt || "property"}
                                                                unoptimized
                                                            />
                                                            <div className="wrap-tag d-flex gap_8 mb_12">
                                                                <div
                                                                    className={`tag ${
                                                                        property.type === "Sale"
                                                                            ? "sale"
                                                                            : "rent"
                                                                    } text-button-small fw-6 text_primary-color`}
                                                                >
                                                                    For {property.type}
                                                                </div>
                                                                <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                                    {property.categories}
                                                                </div>
                                                            </div>
                                                            <Link
                                                                href={`/property-details-1/${property.mlsNumber}`}
                                                                className="overlay-link"
                                                            ></Link>
                                                            <div className="wishlist">
                                                                <div className="hover-tooltip tooltip-left box-icon">
                                                                    <span className="icon icon-Heart"></span>
                                                                    <span className="tooltip">Add to Wishlist</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            <h4 className="price mb_12" suppressHydrationWarning>
                                                                ${property.price.toLocaleString()}
                                                                <span className="text_secondary-color text-body-default">
                                                                    {property.type === "Sale" ? "" : "/month"}
                                                                </span>
                                                            </h4>
                                                            <Link
                                                                href={`/property-details-1/${property.mlsNumber}`}
                                                                className="title mb_8 h5 link text_primary-color"
                                                            >
                                                                {property.title}
                                                            </Link>
                                                            <p>{property.address}</p>
                                                            <ul className="info d-flex">
                                                                <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                    <i className="icon-Bed"></i>
                                                                    {property.beds} Bed
                                                                </li>
                                                                <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                    <i className="icon-Bathtub"></i>
                                                                    {property.baths} Bath
                                                                </li>
                                                                <li
                                                                    className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                                                                    suppressHydrationWarning
                                                                >
                                                                    <i className="icon-Ruler"></i>
                                                                    {property.sqft
                                                                        ? property.sqft.toLocaleString()
                                                                        : "N/A"}{" "}
                                                                    Sqft
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* List Layout */}
                                    <div className="tab-pane" id="listLayout" role="tabpanel">
                                        <div className="wrap-list d-grid gap_30">
                                            {listings.map((property) => (
                                                <div
                                                    className="card-house style-list v3"
                                                    data-id={property.mlsNumber}
                                                    key={property.mlsNumber}
                                                >
                                                    <div className="wrap-img">
                                                        <Link
                                                            href={`/property-details-1/${property.mlsNumber}`}
                                                            className="img-style"
                                                        >
                                                            <Image
                                                                src={property.imgSrc}
                                                                layout="responsive"
                                                                width={392}
                                                                height={260}
                                                                alt={property.alt || "property"}
                                                                unoptimized
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="content">
                                                        <div className="d-flex align-items-center gap_6 top mb_16 flex-wrap justify-content-between">
                                                            <h4 className="price" suppressHydrationWarning>
                                                                ${property.price.toLocaleString()}
                                                                <span className="text_secondary-color text-body-default">
                                                                    {property.type === "Sale" ? "" : "/month"}
                                                                </span>
                                                            </h4>
                                                            <div className="wrap-tag d-flex gap_8">
                                                                <div
                                                                    className={`tag ${
                                                                        property.type === "Sale" ? "sale" : "rent"
                                                                    } text-button-small fw-6 text_primary-color`}
                                                                >
                                                                    {property.type === "Sale" ? "For Sale" : "For Rent"}
                                                                </div>
                                                                <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                                    {property.categories}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={`/property-details-1/${property.mlsNumber}`}
                                                            className="title mb_8 h5 link text_primary-color"
                                                        >
                                                            {property.title}
                                                        </Link>
                                                        <p>{property.address}</p>
                                                        <ul className="info d-flex">
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bed"></i>
                                                                {property.beds} Bed
                                                            </li>
                                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                                <i className="icon-Bathtub"></i>
                                                                {property.baths} Bath
                                                            </li>
                                                            <li
                                                                className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                                                                suppressHydrationWarning
                                                            >
                                                                <i className="icon-Ruler"></i>
                                                                {property.sqft
                                                                    ? property.sqft.toLocaleString()
                                                                    : "N/A"}{" "}
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
                                        setPage={(value) => setCurrentPage(value)}
                                        itemLength={totalCount}
                                        itemPerPage={itemPerPage}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="wrap-right overflow-hidden">
                        <MapComponent sorted={mapListings as []} />
                    </div>
                </div>
            </div>
        </>
    );
}
