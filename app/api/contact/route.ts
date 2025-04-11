import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Format the email content for logging
    const emailContent = `
      New Contact Form Submission
      
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Subject: ${formData.subject}
      
      Message:
      ${formData.message}
    `

    console.log("Form submission received:", emailContent)

    // Save the form submission (client-side storage will happen when the function is called)
    // This is just to make the API aware of the structure
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || "Contact Form Submission",
      message: formData.message,
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Message received! We'll contact you soon.",
      data: submissionData,
    })
  } catch (error) {
    console.error("Error processing form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again.",
      },
      { status: 500 },
    )
  }
}
