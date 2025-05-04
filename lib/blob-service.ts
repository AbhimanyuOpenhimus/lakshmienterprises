import type { Product, FormSubmission } from "./types"

// Function to save products to Vercel Blob
export async function saveProductsToBlob(products: Product[]): Promise<boolean> {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
      cache: "no-store",
    })

    const result = await response.json()
    return result.success
  } catch (error) {
    console.error("Error saving products to Blob:", error)
    return false
  }
}

// Function to get products from Vercel Blob
// Update getProductsFromBlob function with better error handling
export async function getProductsFromBlob(): Promise<Product[] | null> {
  try {
    const response = await fetch("/api/products", {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    const result = await response.json()

    if (result.products && Array.isArray(result.products)) {
      return result.products
    } else {
      console.error("Invalid product data structure:", result)
    }

    return null
  } catch (error) {
    console.error("Error getting products from Blob:", error)
    return null
  }
}

// Function to save form submissions to Vercel Blob
export async function saveSubmissionToBlob(submission: FormSubmission): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(submission),
    })

    if (!response.ok) {
      throw new Error(`Failed to save submission: ${response.status}`)
    }

    const result = await response.json()
    return result.success
  } catch (error) {
    console.error("Error saving submission to Blob:", error)
    return false
  }
}
