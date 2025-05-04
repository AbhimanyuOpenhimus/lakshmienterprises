import type { FormSubmission } from "./types"

// Save form submission to API
export async function saveFormSubmission(
  formData: Omit<FormSubmission, "id" | "createdAt" | "read" | "replied">,
): Promise<FormSubmission | null> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Failed to save submission: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to save submission")
    }

    // Also save to localStorage as backup
    if (typeof window !== "undefined") {
      try {
        const existingSubmissions = getLocalSubmissions()
        existingSubmissions.unshift(result.data)
        localStorage.setItem("formSubmissions", JSON.stringify(existingSubmissions))
      } catch (e) {
        console.error("Error saving to localStorage:", e)
      }
    }

    return result.data
  } catch (error) {
    console.error("Error saving form submission:", error)

    // Fallback to localStorage only
    if (typeof window !== "undefined") {
      try {
        // Create new submission
        const newSubmission: FormSubmission = {
          id: `submission-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          ...formData,
          createdAt: new Date().toISOString(),
          read: false,
          replied: false,
        }

        const existingSubmissions = getLocalSubmissions()
        existingSubmissions.unshift(newSubmission)
        localStorage.setItem("formSubmissions", JSON.stringify(existingSubmissions))

        return newSubmission
      } catch (e) {
        console.error("Error saving to localStorage:", e)
      }
    }

    return null
  }
}

// Get form submissions from API
export async function getFormSubmissions(): Promise<FormSubmission[]> {
  try {
    const response = await fetch("/api/contact", {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.status}`)
    }

    const data = await response.json()

    if (data.messages && Array.isArray(data.messages)) {
      // Update localStorage with the latest data
      if (typeof window !== "undefined") {
        localStorage.setItem("formSubmissions", JSON.stringify(data.messages))
      }
      return data.messages
    }

    throw new Error("Invalid response format")
  } catch (error) {
    console.error("Error getting form submissions:", error)

    // Fallback to localStorage
    return getLocalSubmissions()
  }
}

// Mark submission as read
export async function markSubmissionAsRead(id: string): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ id, updates: { read: true } }),
    })

    if (!response.ok) {
      throw new Error(`Failed to mark as read: ${response.status}`)
    }

    const result = await response.json()

    // Update localStorage
    if (result.success && typeof window !== "undefined") {
      updateLocalSubmission(id, { read: true })
    }

    return result.success
  } catch (error) {
    console.error("Error marking submission as read:", error)

    // Fallback to localStorage
    if (typeof window !== "undefined") {
      return updateLocalSubmission(id, { read: true })
    }

    return false
  }
}

// Mark submission as replied
export async function markSubmissionAsReplied(id: string): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ id, updates: { replied: true } }),
    })

    if (!response.ok) {
      throw new Error(`Failed to mark as replied: ${response.status}`)
    }

    const result = await response.json()

    // Update localStorage
    if (result.success && typeof window !== "undefined") {
      updateLocalSubmission(id, { replied: true })
    }

    return result.success
  } catch (error) {
    console.error("Error marking submission as replied:", error)

    // Fallback to localStorage
    if (typeof window !== "undefined") {
      return updateLocalSubmission(id, { replied: true })
    }

    return false
  }
}

// Delete submission
export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/contact?id=${id}`, {
      method: "DELETE",
      headers: {
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete submission: ${response.status}`)
    }

    const result = await response.json()

    // Update localStorage
    if (result.success && typeof window !== "undefined") {
      removeLocalSubmission(id)
    }

    return result.success
  } catch (error) {
    console.error("Error deleting submission:", error)

    // Fallback to localStorage
    if (typeof window !== "undefined") {
      return removeLocalSubmission(id)
    }

    return false
  }
}

// Helper functions for localStorage operations
function getLocalSubmissions(): FormSubmission[] {
  if (typeof window === "undefined") return []

  try {
    const submissionsStr = localStorage.getItem("formSubmissions")
    return submissionsStr ? JSON.parse(submissionsStr) : []
  } catch (error) {
    console.error("Error getting local submissions:", error)
    return []
  }
}

function updateLocalSubmission(id: string, updates: Partial<FormSubmission>): boolean {
  if (typeof window === "undefined") return false

  try {
    const submissions = getLocalSubmissions()
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id ? { ...submission, ...updates } : submission,
    )

    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    return true
  } catch (error) {
    console.error("Error updating local submission:", error)
    return false
  }
}

function removeLocalSubmission(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const submissions = getLocalSubmissions()
    const updatedSubmissions = submissions.filter((submission) => submission.id !== id)

    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    return true
  } catch (error) {
    console.error("Error removing local submission:", error)
    return false
  }
}
