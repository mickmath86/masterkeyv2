import React from "react";
import { handleSubmit } from "@/actions/commentAction";

export default function FormComments() {
    return (
        <div className="leave-comment">
            <div className="heading-title mb_20">
                <h5 className="mb_8">Add A Review</h5>
                <p>Your email address will not be published</p>
            </div>
            <form
                id="leaveComment"
                className="form-leave-comment"
                action={handleSubmit}
            >
                <div className="wrap mb_20">
                    <div className="tf-grid-layout md-col-2 mb_20">
                        <fieldset>
                            <label
                                htmlFor="name"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Name*"
                                name="name"
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <label
                                htmlFor="email"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Your Email*"
                                name="email"
                                required
                            />
                        </fieldset>
                    </div>
                    <fieldset>
                        <label
                            htmlFor="comment"
                            className="text-button text_primary-color fw-7 mb_8"
                        >
                            Review
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            placeholder="Write comment"
                            name="comment"
                            required
                        ></textarea>
                    </fieldset>
                </div>
                <div className="box-fieldset-item d-flex mb_20">
                    <fieldset>
                        <input type="checkbox" className="tf-check" id="note" />
                    </fieldset>
                    <p className="text-body-default">
                        Save your name, email for the next time review
                    </p>
                </div>
                <button className="tf-btn btn-bg-1 btn-px-28" type="submit">
                    <span>Submit Review</span>
                    <span className="bg-effect"></span>
                </button>
            </form>
        </div>
    );
}
