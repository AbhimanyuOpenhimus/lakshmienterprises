import { put, list, del } from "@vercel/blob"
import { NextResponse } from "next/server"
import type { FormSubmission } from "@/lib/types"

// Get all contact form submissions
export async function GET() {
  try {
    // List all blobs with the contact/ prefix
    const { blobs } = await list({ prefix: "contact/" })

    // If no submissions exist yet, return an empty array
    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ submissions: [] })
    }

    // Get all submissions
    const submissions: FormSubmission[] = []

    for (const blob of blobs) {
      const response = await fetch(blob.url)
      const submission = await response.json()
      submissions.push(submission)
    }

    // Sort by date (newest first)
    submissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}

// Save a new contact form submission
export async function POST(request: Request) {
  try {
    const formData = await request.json()

    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create submission object
    const submission: FormSubmission = {
      id: `submission-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      subject: formData.subject || "Contact Form Submission",
      message: formData.message,
      createdAt: new Date().toISOString(),
      read: false,
    }

    // Store submission in Vercel Blob
    const { url } = await put(`contact/${submission.id}.json`, JSON.stringify(submission), {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({
      success: true,
      message: "Message received! We'll contact you soon.",
      data: submission,
      url,
    })
  } catch (error) {
    console.error("Error saving submission:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }
}

// Mark a submission as read
export async function PATCH(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 })
    }

    // List all blobs to find the submission
    const { blobs } = await list({ prefix: `contact/${id}` })

    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    // Get the submission
    const response = await fetch(blobs[0].url)
    const submission: FormSubmission = await response.json()

    // Update the read status
    submission.read = true

    // Store the updated submission
    const { url } = await put(`contact/${id}.json`, JSON.stringify(submission), {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error updating submission:", error)
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 })
  }
}

// Delete a submission
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 })
    }

    // Delete the submission
    await del(`contact/${id}.json`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting submission:", error)
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 })
  }
}
