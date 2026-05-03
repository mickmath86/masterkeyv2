"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Property {
    id: number | string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    lat: number;
    long: number;
    coordinates?: [number, number];
    imgSrc: string;
}

interface ProcessedProperty {
    id: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    coordinates: [number, number];
    image: string;
}

interface MapComponentProps {
    sorted: Property[];
}

export default function MapComponent({ sorted }: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const currentPopup = useRef<mapboxgl.Popup | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Helper to create popup HTML
    const createPopupContent = (property: ProcessedProperty): string => {
        return `
            <div class="popup-property">
                <div class="img-style">
                    <img src="${
                        property.image
                    }" width="120" height="120" alt="popup-property" />
                </div>
                <div class="content">
                    <p class="text-caption-1 mb_4">${property.address}</p>
                    <h6 class="mb_12 line-clamp-1">${property.title}</h6>
                    <ul class="info d-flex">
                        <li><i class="icon-Bed"></i> ${
                            property.beds ?? 0
                        } Bed</li>
                        <li><i class="icon-Bathtub"></i> ${
                            property.baths ?? 0
                        } Bath</li>
                        <li><i class="icon-Ruler"></i> ${
                            property.sqft ?? 0
                        } sqft</li>
                    </ul>
                </div>
            </div>
        `;
    };

    // Show popup for a property
    const showPopup = (property: ProcessedProperty): void => {
        if (currentPopup.current) {
            currentPopup.current.remove();
        }

        currentPopup.current = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            anchor: "bottom",
            offset: [0, -50],
        })
            .setLngLat(property.coordinates)
            .setHTML(createPopupContent(property))
            .addTo(map.current!);
    };

    // Bind hover events to property cards
    const bindCardHoverEvents = (properties: ProcessedProperty[]): void => {
        const cardElements = document.querySelectorAll(".card-house");

        if (cardElements.length === 0) {
            // Retry with MutationObserver if cards not found
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "childList") {
                        const cards = document.querySelectorAll(".card-house");
                        if (cards.length > 0) {
                            bindCardHoverEvents(properties);
                            observer.disconnect();
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
            return;
        }

        cardElements.forEach((card) => {
            const dataId = card.getAttribute("data-id");
            if (!dataId) return;

            const property = properties.find((p) => p.id === dataId);
            if (!property) return;

            card.addEventListener("mouseenter", () => {
                map.current?.flyTo({
                    center: property.coordinates,
                    zoom: 14,
                    speed: 1.2,
                });
                showPopup(property);
            });
        });
    };

    useEffect(() => {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!accessToken) {
            setError("Missing Mapbox access token.");
            return;
        }

        if (map.current || !mapContainer.current) return;

        try {
            mapboxgl.accessToken = accessToken;

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v10",
                center: [-122.4194, 37.7749],
                zoom: 13,
                cooperativeGestures: true,
            });

            // Process properties from sorted prop
            const properties: ProcessedProperty[] = (sorted as Property[])
                .map((p) => ({
                    id: p.id.toString(),
                    address: p.address,
                    title: p.title,
                    beds: p.beds,
                    baths: p.baths,
                    sqft: p.sqft,
                    coordinates: p.coordinates ?? [p.long, p.lat],
                    image: p.imgSrc,
                }));

            // Add markers
            properties.forEach((property) => {
                const markerElement = document.createElement("div");
                markerElement.className = "office-marker";
                markerElement.innerHTML = `<i class="icon-HouseLine"></i>`;

                new mapboxgl.Marker(markerElement)
                    .setLngLat(property.coordinates)
                    .addTo(map.current!);

                markerElement.addEventListener("click", () => {
                    document.querySelectorAll(".office-marker").forEach((m) => {
                        m.classList.remove("active");
                    });
                    markerElement.classList.add("active");
                    showPopup(property);
                });
            });

            // Bind card hover events
            bindCardHoverEvents(properties);

            // Close popup when clicking outside markers
            map.current.on("click", (e: mapboxgl.MapMouseEvent) => {
                const target = e.originalEvent.target as HTMLElement;
                if (!target.closest(".office-marker") && currentPopup.current) {
                    currentPopup.current.remove();
                    currentPopup.current = null;
                }
            });

            // Add map controls
            map.current.addControl(
                new mapboxgl.NavigationControl(),
                "top-right"
            );
            map.current.addControl(
                new mapboxgl.FullscreenControl(),
                "top-right"
            );
            map.current.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: { enableHighAccuracy: true },
                    trackUserLocation: true,
                    showUserHeading: true,
                }),
                "top-right"
            );

            map.current.on("error", (e: mapboxgl.ErrorEvent) => {
                console.error("Mapbox error:", e);
                setError("Map load error.");
            });
        } catch (err) {
            console.error("Init error:", err);
            setError("Map init failed.");
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
        // Only run on mount/unmount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Re-render markers when sorted changes
    useEffect(() => {
        if (!map.current) return;

        // Remove all existing markers
        document.querySelectorAll(".office-marker").forEach((marker) => {
            marker.remove();
        });

        // Remove popup if open
        if (currentPopup.current) {
            currentPopup.current.remove();
            currentPopup.current = null;
        }

        // Process properties from sorted prop
        const properties: ProcessedProperty[] = (sorted as Property[])
            .filter(
                (p): p is Property & { lat: number; long: number } =>
                    typeof p.lat === "number" && typeof p.long === "number"
            )
            .map((p) => ({
                id: p.id.toString(),
                address: p.address,
                title: p.title,
                beds: p.beds,
                baths: p.baths,
                sqft: p.sqft,
                coordinates: p.coordinates ?? [p.long, p.lat],
                image: p.imgSrc,
            }));

        // Add markers
        properties.forEach((property) => {
            const markerElement = document.createElement("div");
            markerElement.className = "office-marker";
            markerElement.innerHTML = `<i class="icon-HouseLine"></i>`;

            new mapboxgl.Marker(markerElement)
                .setLngLat(property.coordinates)
                .addTo(map.current!);

            markerElement.addEventListener("click", () => {
                document.querySelectorAll(".office-marker").forEach((m) => {
                    m.classList.remove("active");
                });
                markerElement.classList.add("active");
                showPopup(property);
            });
        });

        // Bind card hover events
        bindCardHoverEvents(properties);

        // Optionally, fit map to bounds of visible properties
        if (properties.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            properties.forEach((p) => bounds.extend(p.coordinates));
            map.current.fitBounds(bounds, {
                padding: 60,
                maxZoom: 15,
                duration: 800,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorted]);

    if (error) {
        return <div className="mapbox-3 text-red-600">{error}</div>;
    }

    return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}
