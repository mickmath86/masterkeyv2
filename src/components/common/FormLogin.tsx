"use client";
import Link from "next/link";
import React, { useState } from "react";
import { loginAction } from "@/actions/loginAction"; 

export default function FormLogin() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="tf-container tf-spacing-1">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form className="form-account" action={loginAction}>
                        <h3 className="text-center mb_23">Log In</h3>
                        <fieldset className="mb_20">
                            <label
                                htmlFor="email"
                                className="form-label text_primary-color text-button mb_8"
                            >
                                Your Email <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                required
                            />
                        </fieldset>
                        <label
                            htmlFor="password"
                            className="form-label text_primary-color text-button mb_8"
                        >
                            Password <span className="required">*</span>
                        </label>
                        <fieldset className="mb_20 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={handleTogglePassword}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                <i
                                    className={
                                        showPassword
                                            ? "icon-eye"
                                            : "icon-eye-slash"
                                    }
                                ></i>
                            </button>
                        </fieldset>
                        <div className="d-flex align-items-center justify-content-between">
                            <fieldset className="checkbox-item style-1">
                                <label>
                                    <input type="checkbox" name="remember" />
                                    <span className="btn-checkbox"></span>
                                    <span className="text-body-default">
                                        Remember me
                                    </span>
                                </label>
                            </fieldset>
                            <a
                                href="#"
                                className="hover-line-text forgot text-body-default"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div className="or">
                            <span className="text-body-default">or sign up with</span>
                        </div>
                        <div className="signin-with d-grid gap_9 mb_24">
                            <a href="#" className="tf-btn btn-border w-full">
                                <span className="d-flex align-items-center gap_12">
                                    <img src="/assets/images/logo/facebook.svg" alt="logo" />
                                    Continue With Facebook
                                </span>
                                <span className="bg-effect"></span>
                            </a>
                            <a href="#" className="tf-btn btn-border w-full">
                                <span className="d-flex align-items-center gap_12">
                                    <img src="/assets/images/logo/google.svg" alt="logo" />
                                    Continue With Google
                                </span>
                                <span className="bg-effect"></span>
                            </a>
                            <a href="#" className="tf-btn btn-border w-full">
                                <span className="d-flex align-items-center gap_12">
                                    <img src="/assets/images/logo/twitter.svg" alt="logo" />
                                    Continue With Twitter
                                </span>
                                <span className="bg-effect"></span>
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="btn-signup tf-btn btn-bg-1 w-full mb_12"
                        >
                            <span>Login</span>
                            <span className="bg-effect"></span>
                        </button>

                        <p className="login-link text-center">
                            Not registered yet?{" "}
                            <Link
                                href="/register"
                                className="hover-underline-link text_primary-color fw-6"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
