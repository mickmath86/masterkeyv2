"use client";
import { useState, useEffect, useCallback } from "react";
import type { MappedProperty } from "@/lib/repliers";
import { mapListingToProperty } from "@/lib/repliers";

type UseRepliersListingsOptions = {
    resultsPerPage?: number;
    sortBy?: string;
    type?: string;
    city?: string;
    minBedrooms?: string;
    maxBedrooms?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    pageNum?: number;
};

type UseRepliersListingsResult = {
    listings: MappedProperty[];
    totalCount: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    refetch: () => void;
};

export function useRepliersListings(
    options: UseRepliersListingsOptions = {}
): UseRepliersListingsResult {
    const {
        resultsPerPage = 20,
        sortBy,
        type,
        city,
        minBedrooms,
        maxBedrooms,
        minPrice,
        maxPrice,
        search,
        pageNum = 1,
    } = options;

    const [listings, setListings] = useState<MappedProperty[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    const refetch = useCallback(() => setTrigger((t) => t + 1), []);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("resultsPerPage", String(resultsPerPage));
        params.set("pageNum", String(pageNum));
        if (sortBy) params.set("sortBy", sortBy);
        if (type && type !== "Any Type") {
            params.set("type", type.toLowerCase() === "rent" ? "lease" : "sale");
        }
        if (city && city !== "All Cities") params.set("city", city);
        if (minBedrooms) params.set("minBedrooms", minBedrooms);
        if (maxBedrooms) params.set("maxBedrooms", maxBedrooms);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (search) params.set("search", search);

        setLoading(true);
        setError(null);

        fetch(`/api/listings?${params.toString()}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch listings");
                return res.json();
            })
            .then((data) => {
                setListings((data.listings || []).map(mapListingToProperty));
                setTotalCount(data.count || 0);
                setTotalPages(data.numPages || 1);
            })
            .catch((err) => {
                console.error("useRepliersListings error:", err);
                setError(err.message);
                setListings([]);
            })
            .finally(() => setLoading(false));
    }, [resultsPerPage, sortBy, type, city, minBedrooms, maxBedrooms, minPrice, maxPrice, search, pageNum, trigger]);

    return { listings, totalCount, totalPages, loading, error, refetch };
}
