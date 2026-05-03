"use server";

export async function loginAction(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const remember = formData.get("remember");

    // Validate form data
    if (!email || !password) {
        console.error("Login error: Email and password are required");
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error("Login error: Invalid email address");
        return;
    }

    if (typeof password !== "string" || password.length < 6) {
        console.error("Login error: Password too short");
        return;
    }

    try {
        // Simulate authentication process
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Verify user credentials against database
        // 2. Create session/token
        // 3. Set cookies if remember is true
        // 4. Log the login attempt

        console.log("Login successful:", { email, remember: !!remember });
    } catch (error) {
        console.error("Login error:", error);
    }
}
