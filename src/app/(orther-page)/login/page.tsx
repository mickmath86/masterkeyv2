import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/header/Header";
import Footer1 from "@/components/footer/Footer1";

export const metadata: Metadata = {
    title: "Sign In | MasterKey Real Estate",
    description:
        "Sign in to your MasterKey account to save properties and manage your search.",
};

export default function LoginPage() {
    return (
        <>
            <Header />
            <main
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    padding: "120px 20px 80px",
                }}
            >
                <div style={{ width: "100%", maxWidth: 480 }}>
                    {/* Logo */}
                    <div style={{ textAlign: "center", marginBottom: 32 }}>
                        <Image
                            src="/assets/images/logo/mathias-logo.jpg"
                            alt="MasterKey"
                            width={180}
                            height={40}
                            style={{ objectFit: "contain" }}
                        />
                        <p style={{ marginTop: 12, color: "#6b7280", fontSize: 15 }}>
                            Sign in to save properties and track your search
                        </p>
                    </div>

                    {/* Clerk SignIn — handles email, Google, Apple */}
                    <SignIn
                        routing="hash"
                        forceRedirectUrl="/"
                        fallbackRedirectUrl="/"
                        appearance={{
                            elements: {
                                rootBox: { width: "100%" },
                                card: {
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
                                    border: "1px solid #e5e7eb",
                                    width: "100%",
                                },
                                headerTitle: { display: "none" },
                                headerSubtitle: { display: "none" },
                                socialButtonsBlockButton: {
                                    borderRadius: "10px",
                                    border: "1.5px solid #e5e7eb",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                },
                                formButtonPrimary: {
                                    backgroundColor: "#111827",
                                    borderRadius: "10px",
                                    fontWeight: "700",
                                    fontSize: "15px",
                                },
                                formFieldInput: {
                                    borderRadius: "10px",
                                    border: "1.5px solid #e5e7eb",
                                    fontSize: "15px",
                                },
                                footerActionLink: {
                                    color: "#111827",
                                    fontWeight: "600",
                                },
                            },
                        }}
                    />
                </div>
            </main>
            <Footer1 />
        </>
    );
}
