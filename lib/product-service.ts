import { allProducts, featuredProducts } from "./products"
import type { Product } from "./types"

// Get all products from localStorage or default data
export function getProducts(): Product[] {
  if (typeof window === "undefined") return allProducts

  try {
    const storedProducts = localStorage.getItem("admin_products")
    return storedProducts ? JSON.parse(storedProducts) : allProducts
  } catch (error) {
    console.error("Error getting products:", error)
    return allProducts
  }
}

// Get featured products from localStorage or default data
export function getFeaturedProducts(): Product[] {
  const products = getProducts()
  const featuredIds = featuredProducts.map((p) => p.id)
  return products.filter((p) => featuredIds.includes(p.id))
}

// Get a single product by ID
export function getProductById(id: string): Product | undefined {
  const products = getProducts()
  return products.find((p) => p.id === id)
}

// Update a product
export function updateProduct(updatedProduct: Product): boolean {
  if (typeof window === "undefined") return false

  try {
    const products = getProducts()
    const index = products.findIndex((p) => p.id === updatedProduct.id)

    if (index === -1) return false

    products[index] = updatedProduct
    localStorage.setItem("admin_products", JSON.stringify(products))
    return true
  } catch (error) {
    console.error("Error updating product:", error)
    return false
  }
}

// Reset products to default
export function resetProducts(): boolean {
  if (typeof window === "undefined") return false

  try {
    localStorage.removeItem("admin_products")
    return true
  } catch (error) {
    console.error("Error resetting products:", error)
    return false
  }
}
