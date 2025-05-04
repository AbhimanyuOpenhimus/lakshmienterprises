import type { FormSubmission } from "./types"

// Save a form submission to Vercel Blob
export async function saveFormSubmissionToBlob(
  formData: Omit<FormSubmission, "id" | "createdAt" | "read">,
): Promise<FormSubmission | null> {
  if (typeof window === "undefined") return null

  try {
    // Send to API
    const response = await fetch("/api/contact/blob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to save submission")
    }

    // Also save to localStorage as backup
    const existingSubmissionsStr = localStorage.getItem("formSubmissions")
    const existingSubmissions: FormSubmission[] = existingSubmissionsStr ? JSON.parse(existingSubmissionsStr) : []

    const updatedSubmissions = [result.data, ...existingSubmissions]
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))

    return result.data
  } catch (error) {
    console.error("Error saving form submission:", error)

    // Fallback to localStorage only
    const existingSubmissionsStr = localStorage.getItem("formSubmissions")
    const existingSubmissions: FormSubmission[] = existingSubmissionsStr ? JSON.parse(existingSubmissionsStr) : []

    // Create new submission
    const newSubmission: FormSubmission = {
      id: `submission-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...formData,
      createdAt: new Date().toISOString(),
      read: false,
    }

    // Add to existing submissions
    const updatedSubmissions = [newSubmission, ...existingSubmissions]
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))

    return newSubmission
  }
}

// Get all form submissions from Vercel Blob
export async function getFormSubmissionsFromBlob(): Promise<FormSubmission[]> {
  try {
    // Get submissions from API
    const response = await fetch("/api/contact/blob")
    const result = await response.json()

    if (result.submissions) {
      return result.submissions
    }

    // If API fails, fall back to localStorage
    if (typeof window !== "undefined") {
      const submissionsStr = localStorage.getItem("formSubmissions")
      return submissionsStr ? JSON.parse(submissionsStr) : []
    }

    return []
  } catch (error) {
    console.error("Error getting form submissions:", error)

    // Fall back to localStorage
    if (typeof window !== "undefined") {
      const submissionsStr = localStorage.getItem("formSubmissions")
      return submissionsStr ? JSON.parse(submissionsStr) : []
    }

    return []
  }
}

// Mark a submission as read in Vercel Blob
export async function markSubmissionAsReadInBlob(id: string): Promise<boolean> {
  try {
    // Update in API
    const response = await fetch("/api/contact/blob", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to mark submission as read")
    }

    // Also update in localStorage
    if (typeof window !== "undefined") {
      const submissions = getFormSubmissions()
      const updatedSubmissions = submissions.map((submission) =>
        submission.id === id ? { ...submission, read: true } : submission,
      )
      localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    }

    return true
  } catch (error) {
    console.error("Error marking submission as read:", error)

    // Fall back to localStorage only
    if (typeof window !== "undefined") {
      const submissions = getFormSubmissions()
      const updatedSubmissions = submissions.map((submission) =>
        submission.id === id ? { ...submission, read: true } : submission,
      )
      localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    }

    return false
  }
}

// Delete a submission from Vercel Blob
export async function deleteSubmissionFromBlob(id: string): Promise<boolean> {
  try {
    // Delete from API
    const response = await fetch("/api/contact/blob", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to delete submission")
    }

    // Also delete from localStorage
    if (typeof window !== "undefined") {
      const submissions = getFormSubmissions()
      const updatedSubmissions = submissions.filter((submission) => submission.id !== id)
      localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    }

    return true
  } catch (error) {
    console.error("Error deleting submission:", error)

    // Fall back to localStorage only
    if (typeof window !== "undefined") {
      const submissions = getFormSubmissions()
      const updatedSubmissions = submissions.filter((submission) => submission.id !== id)
      localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    }

    return false
  }
}

// Fallback functions that use localStorage only
export function getFormSubmissions(): FormSubmission[] {
  if (typeof window === "undefined") return []

  try {
    const submissionsStr = localStorage.getItem("formSubmissions")
    return submissionsStr ? JSON.parse(submissionsStr) : []
  } catch (error) {
    console.error("Error getting form submissions:", error)
    return []
  }
}

export function markSubmissionAsRead(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const submissions = getFormSubmissions()
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id ? { ...submission, read: true } : submission,
    )

    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    return true
  } catch (error) {
    console.error("Error marking submission as read:", error)
    return false
  }
}

export function deleteSubmission(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const submissions = getFormSubmissions()
    const updatedSubmissions = submissions.filter((submission) => submission.id !== id)

    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))
    return true
  } catch (error) {
    console.error("Error deleting submission:", error)
    return false
  }
}

export function saveFormSubmission(formData: Omit<FormSubmission, "id" | "createdAt" | "read">) {
  if (typeof window === "undefined") return null

  try {
    // Get existing submissions
    const existingSubmissionsStr = localStorage.getItem("formSubmissions")
    const existingSubmissions: FormSubmission[] = existingSubmissionsStr ? JSON.parse(existingSubmissionsStr) : []

    // Create new submission
    const newSubmission: FormSubmission = {
      id: `submission-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...formData,
      createdAt: new Date().toISOString(),
      read: false,
    }

    // Add to existing submissions
    const updatedSubmissions = [newSubmission, ...existingSubmissions]

    // Save back to localStorage
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))

    return newSubmission
  } catch (error) {
    console.error("Error saving form submission:", error)
    return null
  }
}
