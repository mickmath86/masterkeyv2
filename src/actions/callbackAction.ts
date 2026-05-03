"use server";

export async function submitCallback(formData: FormData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const helpType = formData.get("helpType");

    // Validate form data
    if (!fullName || !email || !phone) {
        console.error("Callback error: Please fill in all required fields");
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error("Callback error: Please enter a valid email address");
        return;
    }

    if (typeof phone !== "string" || phone.length < 10) {
        console.error("Callback error: Please enter a valid phone number");
        return;
    }

    try {
        // Simulate callback request submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Save callback request to database
        // 2. Send notification to sales team
        // 3. Send confirmation email to user
        // 4. Schedule follow-up call

        console.log("Callback request submitted successfully:", {
            fullName,
            email,
            phone,
            helpType,
        });
    } catch (error) {
        console.error("Callback submission error:", error);
    }
}
