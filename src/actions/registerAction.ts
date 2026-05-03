"use server";

export async function registerAction(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!email || !password || !confirmPassword) {
        console.error("Registration error: All fields are required");
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error("Registration error: Invalid email address");
        return;
    }

    if (typeof password !== "string" || password.length < 8) {
        console.error("Registration error: Password too short");
        return;
    }

    if (password !== confirmPassword) {
        console.error("Registration error: Passwords don't match");
        return;
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Registration successful:", { email });
    } catch (error) {
        console.error("Registration error:", error);
    }
}
