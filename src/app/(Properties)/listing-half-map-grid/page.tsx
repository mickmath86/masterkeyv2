import Header from "@/components/header/Header";
import Properties5 from "@/components/properties/Properties5";
import React, { Suspense } from "react";

export default function page() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="d-flex justify-content-center py-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}>
                <Properties5 />
            </Suspense>
        </>
    );
}
