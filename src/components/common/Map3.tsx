"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map3() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!accessToken) {
            setError("Missing Mapbox access token.");
            return;
        }

        if (!mapContainer.current) return;

        let map: mapboxgl.Map | undefined;
        try {
            mapboxgl.accessToken = accessToken;
            const officeCoordinates: [number, number] = [-87.4548, 41.6389];

            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: officeCoordinates,
                zoom: 13,
                bearing: 0,
                pitch: 0,
                cooperativeGestures: true,
            });

            map.on("load", () => {
                const markerElement = document.createElement("div");
                markerElement.className = "office-marker";
                markerElement.innerHTML = `<i class="icon-HouseLine"></i>`;
                const popupContent = `
                    <div class="office-popup">
                        <div class="text-title text_primary-color fw-6 mb_4">My Office</div>
                        <p>101 E 129th St, East Chicago, 2nd Floor, NY</p>
                    </div>
                `;

                const popup = new mapboxgl.Popup({
                    closeButton: true,
                    closeOnClick: false,
                    offset: [0, -60],
                }).setHTML(popupContent);

                // TypeScript: map is always defined here
                new mapboxgl.Marker({
                    element: markerElement,
                    anchor: "bottom",
                })
                    .setLngLat(officeCoordinates)
                    .setPopup(popup)
                    .addTo(map! as mapboxgl.Map)
                    .togglePopup();

                map!.addControl(new mapboxgl.NavigationControl(), "top-right");
                map!.addControl(new mapboxgl.FullscreenControl(), "top-right");
            });

            map.on("error", (e) => {
                console.error("Mapbox error:", e);
                setError("Map load error.");
            });
        } catch (err) {
            console.error("Map init error:", err);
            setError("Map init failed.");
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    if (error) return <div className="text-red-600">{error}</div>;
    return <div ref={mapContainer} className="map-container" />;
}
