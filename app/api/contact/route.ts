import { put, list, del } from "@vercel/blob"
import { NextResponse } from "next/server"

// Get all messages
export async function GET() {
  try {
    // List all blobs with the messages/ prefix
    const { blobs } = await list({ prefix: "messages/" })

    // If no messages exist yet, return an empty array
    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ messages: [] })
    }

    // Fetch all messages
    const messagesPromises = blobs.map(async (blob) => {
      try {
        const response = await fetch(blob.url, { cache: "no-store" })

        if (!response.ok) {
          console.error(`Failed to fetch message from ${blob.url}: ${response.status}`)
          return null
        }

        const message = await response.json()
        return {
          ...message,
          id: message.id || blob.pathname.split("/").pop()?.replace(".json", ""),
          blobUrl: blob.url,
        }
      } catch (error) {
        console.error(`Error fetching message from ${blob.url}:`, error)
        return null
      }
    })

    const messages = (await Promise.all(messagesPromises)).filter(Boolean)

    // Sort messages by date (newest first)
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ messages: [] }, { status: 500 })
  }
}

// Submit a new message
export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Create message object
    const messageData = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || "Contact Form Submission",
      message: formData.message,
      createdAt: new Date().toISOString(),
      read: false,
      replied: false,
    }

    // Store message in Vercel Blob
    const { url } = await put(`messages/${messageData.id}.json`, JSON.stringify(messageData), {
      access: "public",
      addRandomSuffix: false,
    })

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Message received! We'll contact you soon.",
      data: { ...messageData, blobUrl: url },
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

// Update a message (mark as read or replied)
export async function PUT(request: Request) {
  try {
    const { id, updates } = await request.json()

    if (!id) {
      return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 })
    }

    // Get the message blob
    const { blobs } = await list({ prefix: `messages/${id}` })

    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }

    // Get the message
    const response = await fetch(blobs[0].url, { cache: "no-store" })

    if (!response.ok) {
      throw new Error(`Failed to fetch message: ${response.status}`)
    }

    const message = await response.json()

    // Update the message
    const updatedMessage = { ...message, ...updates }

    // Store the updated message
    const { url } = await put(`messages/${id}.json`, JSON.stringify(updatedMessage), {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update message",
      },
      { status: 500 },
    )
  }
}

// Delete a message
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 })
    }

    // Get the message blob
    const { blobs } = await list({ prefix: `messages/${id}` })

    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }

    // Delete the message
    await del(blobs[0].url)

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      { status: 500 },
    )
  }
}
