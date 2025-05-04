import type { Product } from "./types"
import { products as initialProducts } from "./products"

// Add this helper function to detect and fix blob URLs
function sanitizeImageUrl(url: string | undefined): string {
  if (!url) return "/placeholder.svg?height=300&width=300"
  if (typeof url !== "string") return "/placeholder.svg?height=300&width=300"
  if (url.startsWith("blob:")) return "/placeholder.svg?height=300&width=300"
  return url
}

// Function to get all products with improved cache busting and error handling
export async function getProducts(): Promise<Product[]> {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()

    // Try to fetch from API first with explicit no-cache headers
    try {
      const response = await fetch(`/api/products?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      })

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data.products)) {
          // Process products to ensure they don't have problematic blob URLs
          const processedProducts = data.products.map((product: Product) => ({
            ...product,
            // Replace blob URLs with placeholder
            image: sanitizeImageUrl(product.image),
            // Ensure other required fields
            id: product.id || `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: product.name || "Product",
            description: product.description || "No description available",
            price: product.price || 0,
            category: product.category || "General",
            rating: product.rating || 4.0,
            reviews: product.reviews || 0,
            features: Array.isArray(product.features) ? product.features : [],
            specifications: Array.isArray(product.specifications) ? product.specifications : [],
          }))

          // Also update localStorage for offline access
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("products", JSON.stringify(processedProducts))
              // Add timestamp to localStorage to track freshness
              localStorage.setItem("products_timestamp", timestamp.toString())
            } catch (storageError) {
              console.error("Error saving to localStorage:", storageError)
            }
          }
          return processedProducts
        }
      }
    } catch (fetchError) {
      console.error("Error fetching products from API:", fetchError)
    }

    // Try localStorage as fallback
    if (typeof window !== "undefined") {
      try {
        const storedProducts = localStorage.getItem("products")
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts)
          if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
            console.log("Using cached products from localStorage")
            // Process products to ensure they don't have problematic blob URLs
            return parsedProducts.map((product: Product) => ({
              ...product,
              image: sanitizeImageUrl(product.image),
            }))
          }
        }
      } catch (e) {
        console.error("Error parsing stored products:", e)
      }
    }

    // Final fallback to initial products
    console.log("Using initial products as fallback")
    return initialProducts
  } catch (error) {
    console.error("Error in getProducts:", error)
    return initialProducts
  }
}

// Function to get a single product by ID with improved cache busting
export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    // If id is empty, return undefined
    if (!id) return undefined

    // Special case for accessories route
    if (id === "accessories") {
      console.log("Accessories route detected, redirecting to dedicated page")
      return undefined
    }

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()

    // Try to fetch directly from API first
    try {
      const response = await fetch(`/api/products/${id}?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.product) {
          return ensureCompleteProduct(data.product)
        }
      }
    } catch (directFetchError) {
      console.error(`Error fetching product directly by ID ${id}:`, directFetchError)
      // Continue to fallback methods
    }

    // If direct API fetch fails, get all products and find the one we need
    try {
      const products = await getProducts()
      const product = products.find((product) => product.id === id)

      if (product) {
        return ensureCompleteProduct(product)
      }
    } catch (productsError) {
      console.error("Error getting all products:", productsError)
      // Continue to next fallback
    }

    // If not found in API or localStorage, check initial products
    const initialProduct = initialProducts.find((p) => p.id === id)
    if (initialProduct) {
      return ensureCompleteProduct(initialProduct)
    }

    console.error(`Product with ID ${id} not found in any source`)
    return undefined
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)

    // Check initial products as last resort
    const initialProduct = initialProducts.find((p) => p.id === id)
    if (initialProduct) {
      return ensureCompleteProduct(initialProduct)
    }

    return undefined
  }
}

// Helper function to ensure a product has all required fields
function ensureCompleteProduct(product: Product): Product {
  return {
    ...product,
    image: sanitizeImageUrl(product.image),
    rating: product.rating ?? 4.0,
    reviews: product.reviews ?? 0,
    features: product.features ?? [],
    specifications: product.specifications ?? [],
    inStock: product.inStock ?? true,
    discount: product.discount ?? 0,
    discountedPrice:
      product.discountedPrice ??
      (product.discount && product.discount > 0
        ? Math.round(product.price - product.price * (product.discount / 100))
        : undefined),
  }
}

// Function to update a product with improved error handling and cache busting
export async function updateProduct(updatedProduct: Product): Promise<boolean> {
  try {
    // Ensure the product has all required fields
    const completeProduct = ensureCompleteProduct(updatedProduct)

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()

    // Try to update via API first
    const response = await fetch(`/api/products?t=${timestamp}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({ product: completeProduct }),
    })

    if (response.ok) {
      const result = await response.json()

      if (result.success) {
        console.log("Product updated successfully via API:", completeProduct.id)

        // If API update succeeds, also update localStorage
        if (typeof window !== "undefined") {
          try {
            const products = await getProducts()
            const updatedProducts = products.map((product) =>
              product.id === completeProduct.id ? completeProduct : product,
            )
            localStorage.setItem("products", JSON.stringify(updatedProducts))
            localStorage.setItem("products_timestamp", timestamp.toString())
          } catch (localStorageError) {
            console.error("Error updating localStorage after API success:", localStorageError)
          }
        }
        return true
      } else {
        throw new Error(result.error || "API update returned false success status")
      }
    } else {
      console.error("API update failed:", response.status, response.statusText)
      const errorText = await response.text()
      console.error("Error details:", errorText)
      throw new Error(`API update failed: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error updating product:", error)

    // Try localStorage as fallback
    if (typeof window !== "undefined") {
      try {
        const storedProductsStr = localStorage.getItem("products")
        if (storedProductsStr) {
          const storedProducts = JSON.parse(storedProductsStr)
          if (Array.isArray(storedProducts)) {
            const updatedProducts = storedProducts.map((product: Product) =>
              product.id === updatedProduct.id ? ensureCompleteProduct(updatedProduct) : product,
            )
            localStorage.setItem("products", JSON.stringify(updatedProducts))
            localStorage.setItem("products_timestamp", new Date().getTime().toString())
            console.log("Product updated in localStorage as fallback:", updatedProduct.id)
            return true
          }
        }
      } catch (e) {
        console.error("Error updating product in localStorage:", e)
      }
    }

    return false
  }
}

// Function to create a new product with improved error handling and cache busting
export async function createProduct(newProduct: Product): Promise<boolean> {
  try {
    // Ensure the product has all required fields
    const completeProduct = ensureCompleteProduct(newProduct)

    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()

    // Try to create via API first
    const response = await fetch(`/api/products?t=${timestamp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({ product: completeProduct }),
    })

    if (response.ok) {
      const result = await response.json()

      if (result.success) {
        console.log("Product created successfully via API:", completeProduct.id)

        // If API update succeeds, also update localStorage
        if (typeof window !== "undefined") {
          try {
            const products = await getProducts()
            const updatedProducts = [...products, completeProduct]
            localStorage.setItem("products", JSON.stringify(updatedProducts))
            localStorage.setItem("products_timestamp", timestamp.toString())
          } catch (localStorageError) {
            console.error("Error updating localStorage after API success:", localStorageError)
          }
        }
        return true
      } else {
        throw new Error(result.error || "API create returned false success status")
      }
    } else {
      console.error("API create failed:", response.status, response.statusText)
      throw new Error(`API create failed: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error creating product:", error)

    // Try localStorage as fallback
    if (typeof window !== "undefined") {
      try {
        const storedProductsStr = localStorage.getItem("products")
        const products = storedProductsStr ? JSON.parse(storedProductsStr) : []
        if (Array.isArray(products)) {
          products.push(ensureCompleteProduct(newProduct))
          localStorage.setItem("products", JSON.stringify(products))
          localStorage.setItem("products_timestamp", new Date().getTime().toString())
          return true
        }
      } catch (e) {
        console.error("Error creating product in localStorage:", e)
      }
    }

    return false
  }
}

// Function to reset products to their initial state with improved error handling
export async function resetProducts(): Promise<boolean> {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()

    // Reset via API first
    const response = await fetch(`/api/products?t=${timestamp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({ products: initialProducts }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error resetting products:", errorText)
      throw new Error(`API reset failed: ${response.status} ${response.statusText}`)
    }

    // Also reset localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(initialProducts))
      localStorage.setItem("products_timestamp", timestamp.toString())
    }

    return response.ok
  } catch (error) {
    console.error("Error resetting products:", error)

    // Try to reset localStorage even if API fails
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(initialProducts))
      localStorage.setItem("products_timestamp", new Date().getTime().toString())
    }

    return false
  }
}
