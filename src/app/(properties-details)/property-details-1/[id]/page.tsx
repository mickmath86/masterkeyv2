import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails1 from "@/components/property-details/PropertyDetails1";
import Relatest from "@/components/property-details/Relatest";
import React from "react";
import type { RepliersListing } from "@/lib/repliers";
import { mapListingToProperty } from "@/lib/repliers";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

async function fetchListing(mlsNumber: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/listing/${mlsNumber}`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data as RepliersListing;
    } catch {
        return null;
    }
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const listing = await fetchListing(id);
    const property = listing
        ? mapListingToProperty(listing)
        : null;

    // Build a property shape compatible with PropertyDetails1
    const propertyForDetails = property
        ? {
            id: 1,
            imgSrc: property.imgSrc,
            alt: property.alt,
            address: property.address,
            title: property.title,
            beds: property.beds,
            baths: property.baths,
            sqft: property.sqft,
            categories: property.categories,
            type: property.type,
            price: property.price,
            coordinates: property.coordinates,
            garages: property.garages,
            city: property.city,
            description: property.description,
            lat: property.lat,
            long: property.long,
            features: property.features,
            filterOptions: property.filterOptions,
            mlsNumber: property.mlsNumber,
        }
        : {
            id: 1,
            imgSrc: "/assets/images/home/home-1.jpg",
            alt: "property",
            address: "Property not found",
            title: "Listing Unavailable",
            beds: 0,
            baths: 0,
            sqft: 0,
            categories: "House",
            type: "Sale",
            price: 0,
            coordinates: [-118.4912, 34.0195] as [number, number],
            garages: 0,
            city: "",
            features: [],
            filterOptions: [],
            mlsNumber: id,
        };

    return (
        <Layout>
            <PropertyDetails1 property={propertyForDetails} />
            <Relatest />
        </Layout>
    );
}
