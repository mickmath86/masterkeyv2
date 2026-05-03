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
    { icon: "icon-SolarPanel", title: "Solar power", sttt: "Yes" },
    { icon: "icon-Fire", title: "Fireplace", sttt: "Yes" },
    { icon: "icon-Fan", title: "Ventilation", sttt: "Yes" },
];

export default function Utility2() {
    // Phân chia đều thành 3 cột
    function chunkArray<T>(arr: T[], columns: number): T[][] {
        const result: T[][] = Array.from({ length: columns }, () => []);
        arr.forEach((item, index) => {
            result[index % columns].push(item);
        });
        return result;
    }

    const columns = chunkArray(utility, 3); // Chia đều 3 cột
    return (
        <>
            <h5 className="properties-title mb_20">Property Utility</h5>
            <div className="tf-grid-layout md-col-3">
                {columns.map((colItems, colIdx) => (
                    <div className="col-utility" key={colIdx}>
                        {colItems.map((item, idx) => (
                            <div
                                className="item d-flex justify-content-between"
                                key={idx}
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
                ))}
            </div>
        </>
    );
}
