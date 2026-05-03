import React from "react";
import DropdownSelect2 from "../common/DropdownSelect2";
import { calculateLoan } from "@/actions/calculatorAction";

export default function Caculator() {
    return (
        <div>
            <h5 className="properties-title mb_20">Loan Calculator</h5>
            <div className="wrap-form">
                <form className="form-calculator" action={calculateLoan}>
                    <div className=" tf-grid-layout xl-col-4 md-col-2">
                        <fieldset className="">
                            <label
                                htmlFor="total"
                                className="text-body-default text_primary-color mb_8"
                            >
                                Total Amount:
                            </label>
                            <input
                                className=""
                                id="total"
                                type="text"
                                name="text"
                                tabIndex={2}
                                defaultValue="$480.300|"
                                aria-required="true"
                                required
                            />
                        </fieldset>
                        <fieldset className="">
                            <label
                                htmlFor="interest"
                                className="text-body-default text_primary-color mb_8"
                            >
                                Interest Rate
                            </label>
                            <input
                                className=""
                                id="interest"
                                type="text"
                                name="text"
                                tabIndex={2}
                                defaultValue="1.2%"
                                aria-required="true"
                                required
                            />
                        </fieldset>
                        <div>
                            <div className="text-body-default text_primary-color mb_8">
                                Loan Term (months)
                            </div>
                            <DropdownSelect2
                                defaultOption="60 months"
                                options={[
                                    "60 months",
                                    "40 months",
                                    "30 months",
                                ]}
                            />
                        </div>
                        <fieldset className="">
                            <label
                                htmlFor="payment"
                                className="text-body-default text_primary-color mb_8"
                            >
                                Down Payment
                            </label>
                            <input
                                className=""
                                id="payment"
                                type="text"
                                name="text"
                                tabIndex={2}
                                defaultValue="$400"
                                aria-required="true"
                                required
                            />
                        </fieldset>
                    </div>
                    <button
                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                        type="submit"
                    >
                        <span>Calculate</span>
                        <span className="bg-effect"></span>
                    </button>
                </form>
                <ul className="info tf-grid-layout sm-col-3 gap_8">
                    <li>
                        <p className="mb_4">Monthly Payment:</p>
                        <div className="text-button text_primary-color fw-7">
                            $788.56/month
                        </div>
                    </li>
                    <li>
                        <p className="mb_4">Total Interest Payment:</p>
                        <div className="text-button text_primary-color fw-7">
                            $1413.60
                        </div>
                    </li>
                    <li>
                        <p className="mb_4">Est. Total Loan:</p>
                        <div className="text-button text_primary-color fw-7">
                            $47713.60
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
