"use server";

export async function submitFooterContact(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Validate form data
    if (!name || !email || !message) {
        console.error(
            "Footer contact error: Please fill in all required fields"
        );
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error(
            "Footer contact error: Please enter a valid email address"
        );
        return;
    }

    if (typeof message !== "string" || message.length < 10) {
        console.error("Footer contact error: Message too short");
        return;
    }

    try {
        // Simulate footer contact submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Save contact form data to database
        // 2. Send notification email to admin
        // 3. Send confirmation email to user
        // 4. Log the contact request

        console.log("Footer contact submitted successfully:", {
            name,
            email,
            message,
        });
    } catch (error) {
        console.error("Footer contact error:", error);
    }
}
