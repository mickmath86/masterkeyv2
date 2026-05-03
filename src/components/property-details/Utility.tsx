import React from "react";

type UtilityItem = {
    icon: string;
    title: string;
    sttt: string;
};

const utility: UtilityItem[] = [
    { icon: "icon-Thermometer", title: "Heating", sttt: "Natural Gas" },
    { icon: "icon-Snowflake", title: "Air Conditioning", sttt: "Yes" },
    { icon: "icon-WifiHigh", title: "Wifi", sttt: "Yes" },
    {
        icon: "icon-FingerprintSimple",
        title: "Self check-in with lockbox",
        sttt: "Yes",
    },
    { icon: "icon-SecurityCamera", title: "Security cameras", sttt: "Yes" },
    { icon: "icon-Television", title: "Cable TV", sttt: "Yes" },
    { icon: "icon-CloudWarning", title: "Carbon monoxide alarm", sttt: "Yes" },
    { icon: "icon-SolarPanel", title: "Solar power", sttt: "Yes" },
    { icon: "icon-Fire", title: "Fireplace", sttt: "Yes" },
    { icon: "icon-Fan", title: "Ventilation", sttt: "Yes" },
];

export default function PropertyUtility() {
    const middleIndex = Math.ceil(utility.length / 2);
    const firstColumn = utility.slice(0, middleIndex);
    const secondColumn = utility.slice(middleIndex);

    const renderColumn = (items: UtilityItem[]) => (
        <div className="col-utility">
            {items.map((item, index) => (
                <div
                    className="item d-flex justify-content-between"
                    key={index}
                >
                    <div className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                        <i className={item.icon}></i>
                        {item.title}
                    </div>
                    <span className="text-button text_primary-color">
                        {item.sttt}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <h5 className="properties-title mb_20">Property Utility</h5>
            <div className="tf-grid-layout md-col-2">
                {renderColumn(firstColumn)}
                {renderColumn(secondColumn)}
            </div>
        </>
    );
}
