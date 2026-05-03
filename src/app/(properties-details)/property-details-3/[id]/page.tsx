import Layout from "@/components/layouts/Layout-defaul";
import PropertyDetails3 from "@/components/property-details/PropertyDetails3";
import Relatest from "@/components/property-details/Relatest";
import { allProperties } from "@/data/properties";
import React from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const property =
    allProperties.find((elm) => String(elm.id) === id) || allProperties[0];

    return (
        <div className="bg-light-color">
            <Layout>
                <PropertyDetails3 property={property} />
                <Relatest />
            </Layout>
        </div>
    );
}

export async function generateStaticParams() {
    return allProperties.map((property) => ({
      id: String(property.id),
    }));
  }
