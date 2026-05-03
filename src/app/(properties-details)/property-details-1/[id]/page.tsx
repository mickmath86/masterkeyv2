import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails1 from "@/components/property-details/PropertyDetails1";
import Relatest from "@/components/property-details/Relatest";
import React from "react";
import type { RepliersListing } from "@/lib/repliers";
import { mapListingToDetail } from "@/lib/repliers";
import type { ListingDetail } from "@/types/listing";

type PageProps = {
    params: Promise<{ id: string }>;
};

async function fetchListing(mlsNumber: string): Promise<RepliersListing | null> {
    try {
        // Call Repliers directly from the server — avoids internal self-fetch
        // which breaks on Vercel (no reliable self-URL in SSR context)
        const apiKey = process.env.REPLIERS_API_KEY;
        if (!apiKey) {
            console.error("REPLIERS_API_KEY not set");
            return null;
        }
        const res = await fetch(`https://api.repliers.io/listings/${mlsNumber}`, {
            headers: {
                "REPLIERS-API-KEY": apiKey,
                "Content-Type": "application/json",
            },
            next: { revalidate: 300 },
        });
        if (!res.ok) return null;
        return await res.json() as RepliersListing;
    } catch {
        return null;
    }
}

function fallbackListing(id: string): ListingDetail {
    return {
        id: id,
        mlsNumber: id,
        imgSrc: "/assets/images/home/home-1.jpg",
        images: [],
        alt: "property",
        address: "Listing Unavailable",
        title: "Listing Unavailable",
        beds: 0,
        baths: 0,
        sqft: 0,
        categories: "House",
        type: "Sale",
        price: 0,
        coordinates: [-118.4912, 34.0195],
        garages: 0,
        city: "",
        features: [],
        filterOptions: [],
        floorPlans: [],
        documents: [],
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const rawListing = await fetchListing(id);
    const listing: ListingDetail = rawListing
        ? mapListingToDetail(rawListing)
        : fallbackListing(id);

    return (
        <Layout>
            <PropertyDetails1 listing={listing} />
            <Relatest />
        </Layout>
    );
}
