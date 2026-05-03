"use server";

export async function handleSubmit(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const comment = formData.get("comment");

    // Validate form data
    if (!name || !email || !comment) {
        console.error("Comment error: Please fill in all required fields");
        return;
    }

    if (typeof email !== "string" || !email.includes("@")) {
        console.error("Comment error: Please enter a valid email address");
        return;
    }

    if (typeof comment !== "string" || comment.length < 10) {
        console.error("Comment error: Comment too short");
        return;
    }

    try {
        // Simulate comment submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically:
        // 1. Save comment to database
        // 2. Send notification to admin for moderation
        // 3. Log the comment submission
        // 4. Check for spam/abuse

        console.log("Comment submitted successfully:", {
            name,
            email,
            comment,
        });
    } catch (error) {
        console.error("Comment submission error:", error);
    }
}
