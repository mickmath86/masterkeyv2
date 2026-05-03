import Map3 from "@/components/common/Map3";
import Layout from "@/components/layouts/Layout-defaul";
import FormContact from "@/components/otherpage/contacts/FormContact";
import PageTitle from "@/components/otherpage/contacts/PageTitle";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <div className="tf-container section-contact tf-spacing-1">
                <div className="map-box ">
                    <Map3 />
                </div>
                <FormContact />
            </div>
        </Layout>
    );
}
