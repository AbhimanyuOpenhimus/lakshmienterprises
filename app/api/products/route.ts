import { put, list } from "@vercel/blob"
import { NextResponse } from "next/server"
import { products as initialProducts } from "@/lib/products"

// Add this function at the top of the file
function sanitizeProduct(product: any) {
  return {
    id: product.id || `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name: product.name || "Product",
    description: product.description || "No description available",
    price: product.price || 0,
    category: product.category || "General",
    // Replace blob URLs with placeholder
    image:
      typeof product.image === "string" && !product.image.startsWith("blob:")
        ? product.image
        : "/placeholder.svg?height=300&width=300",
    rating: product.rating || 4.0,
    reviews: product.reviews || 0,
    specifications: Array.isArray(product.specifications) ? product.specifications : [],
    features: Array.isArray(product.features) ? product.features : [],
    // Ensure other fields have defaults
    isNew: !!product.isNew,
    inStock: product.inStock !== false,
    discount: product.discount || 0,
    discountedPrice: product.discountedPrice || undefined,
  }
}

// Get all products with improved error handling and cache busting
export async function GET() {
  try {
    // List all blobs with the products/ prefix
    try {
      const { blobs } = await list({ prefix: "products/" })

      // If no products exist yet, initialize with default products
      if (!blobs || blobs.length === 0) {
        console.log("No product blobs found, returning default products")
        return NextResponse.json(
          { products: initialProducts },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          },
        )
      }

      // Get the latest products blob
      const latestBlob = blobs
        .filter((blob) => blob.pathname.includes("data-"))
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0]

      if (!latestBlob) {
        console.log("No data blobs found, using initial products")
        return NextResponse.json(
          { products: initialProducts },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          },
        )
      }

      console.log("Latest product blob found:", latestBlob.url)

      try {
        // Fetch the products data with no-cache
        const response = await fetch(latestBlob.url, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch blob data: ${response.status}`)
        }

        let products
        try {
          products = await response.json()
        } catch (parseError) {
          console.error("Error parsing JSON from blob:", parseError)
          throw new Error("Invalid JSON in blob data")
        }

        // Ensure products is an array and process it to ensure valid data
        if (Array.isArray(products)) {
          // Process products to ensure they have valid data
          const validProducts = products.map(sanitizeProduct)

          return NextResponse.json(
            { products: validProducts },
            {
              headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
              },
            },
          )
        } else {
          console.error("Products data is not an array:", products)
          return NextResponse.json(
            { products: initialProducts },
            {
              headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
              },
            },
          )
        }
      } catch (fetchError) {
        console.error("Error fetching blob data:", fetchError)
        return NextResponse.json(
          { products: initialProducts },
          {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          },
        )
      }
    } catch (listError) {
      console.error("Error listing blobs:", listError)
      return NextResponse.json(
        { products: initialProducts },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { products: initialProducts },
      {
        status: 200, // Return 200 even on error, with fallback data
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }
}

// Update products with improved error handling
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { products, product } = body

    // If products array is provided, use it for reset functionality
    if (products && Array.isArray(products)) {
      console.log("Resetting all products")

      // Process products to ensure they have valid data
      const validProducts = products.map(sanitizeProduct)

      // Store products in Vercel Blob
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const { url } = await put(`products/data-${timestamp}.json`, JSON.stringify(validProducts), {
        access: "public",
        addRandomSuffix: false,
      })

      console.log("Products reset stored at:", url)

      return NextResponse.json(
        { success: true, url },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }
    // If a single product is provided, add it to the existing products
    else if (product) {
      console.log("Adding new product:", product.id)

      // Sanitize the product data
      const validProduct = sanitizeProduct(product)

      // Get current products
      const productsResponse = await GET()
      const productsData = await productsResponse.json()
      const currentProducts = productsData.products || []

      // Add the new product
      const updatedProducts = [...currentProducts, validProduct]

      // Store updated products
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const { url } = await put(`products/data-${timestamp}.json`, JSON.stringify(updatedProducts), {
        access: "public",
        addRandomSuffix: false,
      })

      console.log("Updated products with new product stored at:", url)

      return NextResponse.json(
        { success: true, url, product: validProduct },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    return NextResponse.json(
      { error: "Invalid request data" },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error updating products:", error)
    return NextResponse.json(
      { error: "Failed to update products", details: error instanceof Error ? error.message : String(error) },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }
}

// Update a single product with improved error handling
export async function PUT(request: Request) {
  try {
    const { product } = await request.json()

    if (!product || !product.id) {
      return NextResponse.json(
        { error: "Invalid product data" },
        {
          status: 400,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    console.log("Updating product:", product.id)

    // Sanitize the product data
    const validProduct = sanitizeProduct(product)

    // Get current products
    const productsResponse = await GET()
    const productsData = await productsResponse.json()
    const currentProducts = productsData.products || []

    // Check if product exists
    const existingProductIndex = currentProducts.findIndex((p: any) => p.id === validProduct.id)

    if (existingProductIndex === -1) {
      console.error("Product not found for update:", validProduct.id)
      return NextResponse.json(
        { error: "Product not found" },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    // Update the product
    const updatedProducts = [...currentProducts]
    updatedProducts[existingProductIndex] = validProduct

    // Store updated products
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const { url } = await put(`products/data-${timestamp}.json`, JSON.stringify(updatedProducts), {
      access: "public",
      addRandomSuffix: false,
    })

    console.log("Updated product stored at:", url)

    return NextResponse.json(
      { success: true, url, product: validProduct },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { error: "Failed to update product", details: error instanceof Error ? error.message : String(error) },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }
}
