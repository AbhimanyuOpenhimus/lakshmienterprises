import type { FormSubmission } from "./types"

// In a real application, this would be stored in a database
// For this example, we'll use localStorage on the client side
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
