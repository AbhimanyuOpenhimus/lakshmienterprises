import { allProducts, featuredProducts } from "./products"
import type { Product } from "./types"
import { saveProductsToBlob, getProductsFromBlob } from "./blob-service"

// Update getProductsFromStorage to prevent caching

export async function getProductsFromStorage(): Promise<Product[]> {
  try {
    // Try to get products from Vercel Blob with no-cache
    const blobProducts = await getProductsFromBlob()

    if (blobProducts && blobProducts.length > 0) {
      // Also update localStorage for offline access
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_products", JSON.stringify(blobProducts))
      }
      return blobProducts
    }

    // If no products in Blob, try localStorage
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("admin_products")
      if (storedProducts) {
        return JSON.parse(storedProducts)
      }
    }

    // If no products in localStorage, return default products
    return allProducts
  } catch (error) {
    console.error("Error getting products:", error)
    return allProducts
  }
}

// Get featured products
export async function getFeaturedProductsFromStorage(): Promise<Product[]> {
  const products = await getProductsFromStorage()
  const featuredIds = featuredProducts.map((p) => p.id)
  return products.filter((p) => featuredIds.includes(p.id))
}

// Get a single product by ID
export async function getProductByIdFromStorage(id: string): Promise<Product | undefined> {
  const products = await getProductsFromStorage()
  return products.find((p) => p.id === id)
}

// Update a product
export async function updateProductInStorage(updatedProduct: Product): Promise<boolean> {
  try {
    // Get current products
    const products = await getProductsFromStorage()
    const index = products.findIndex((p) => p.id === updatedProduct.id)

    if (index === -1) return false

    // Update the product
    products[index] = updatedProduct

    // Save to Vercel Blob
    const blobSuccess = await saveProductsToBlob(products)

    // Also save to localStorage as backup
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_products", JSON.stringify(products))
    }

    return blobSuccess
  } catch (error) {
    console.error("Error updating product:", error)
    return false
  }
}

// Reset products to default
export async function resetProductsInStorage(): Promise<boolean> {
  try {
    // Save default products to Vercel Blob
    const blobSuccess = await saveProductsToBlob(allProducts)

    // Also reset localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_products")
    }

    return blobSuccess
  } catch (error) {
    console.error("Error resetting products:", error)
    return false
  }
}
