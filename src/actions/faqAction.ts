"use server";

export async function submitFAQQuestion(formData: FormData) {
    const name = formData.get("name");
    const helpType = formData.get("helpType");
    const message = formData.get("message");

    // Validate form data
    if (!name || !message) {
        console.error("FAQ error: Please fill in all required fields");
        return;
    }

    if (typeof message !== "string" || message.length < 10) {
        console.error("FAQ error: Message too short");
        return;
    }

    try {
        // Simulate FAQ question submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Save question to database
        // 2. Send notification to support team
        // 3. Log the question for analytics
        // 4. Check for similar existing questions

        console.log("FAQ question submitted successfully:", {
            name,
            helpType,
            message,
        });
    } catch (error) {
        console.error("FAQ submission error:", error);
    }
}
