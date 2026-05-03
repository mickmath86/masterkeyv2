"use server";

export async function sendContact(formData: FormData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Validate form data
    if (!firstName || !lastName || !email || !message) {
        console.error("Contact error: Please fill in all required fields");
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error("Contact error: Please enter a valid email address");
        return;
    }

    if (typeof message !== "string" || message.length < 10) {
        console.error("Contact error: Message too short");
        return;
    }

    try {
        // Simulate contact form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Save contact form data to database
        // 2. Send notification email to admin
        // 3. Send confirmation email to user
        // 4. Log the contact request

        console.log("Contact form submitted successfully:", {
            firstName,
            lastName,
            email,
            phone,
            message,
        });
    } catch (error) {
        console.error("Contact form error:", error);
    }
}
