"use client";
import React, { useState, useCallback } from "react";
import { registerAction } from "@/actions/registerAction";

export default function FormRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleToggleConfirmPassword = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    return (
        <div className="tf-container tf-spacing-1">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form className="form-account" action={registerAction}>
                        <h3 className="text-center mb_24">Register</h3>
                        <fieldset className="mb_20">
                            <label
                                htmlFor="email"
                                className="form-label text_primary-color text-button mb_8"
                            >
                                Username Or email address{" "}
                                <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                            />
                        </fieldset>

                        {/* Password */}
                        <label
                            htmlFor="password"
                            className="form-label text_primary-color text-button mb_8"
                        >
                            Password <span className="required">*</span>
                        </label>
                        <fieldset className="mb_20 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                className="toggle-password"
                            >
                                {showPassword ? (
                                    <i className="icon-eye-slash"></i>
                                ) : (
                                    <i className="icon-eye"></i>
                                )}
                            </button>
                        </fieldset>

                        {/* Confirm Password */}
                        <label
                            htmlFor="confirmPassword"
                            className="form-label text_primary-color text-button mb_8"
                        >
                            Confirm Password <span className="required">*</span>
                        </label>
                        <fieldset className="mb_20 position-relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleToggleConfirmPassword}
                                className="toggle-password"
                            >
                                {showConfirmPassword ? (
                                    <i className="icon-eye-slash"></i>
                                ) : (
                                    <i className="icon-eye"></i>
                                )}
                            </button>
                        </fieldset>
                        <div className="d-flex align-items-center justify-content-between mb_24 flex-wrap gap_12">
                            <fieldset className="checkbox-item style-1">
                                <label>
                                    <input type="checkbox" required />
                                    <span className="btn-checkbox"></span>
                                    <span className="text-body-default">
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="hover-underline-link text_primary-color fw-7"
                                        >
                                            Terms Of User
                                        </a>
                                    </span>
                                </label>
                            </fieldset>
                            <a
                                href="reset-password.html"
                                className="hover-line-text forgot text-body-default"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="btn-signup tf-btn btn-bg-1 w-full mb_12"
                        >
                            <span>Register</span>
                            <span className="bg-effect"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
