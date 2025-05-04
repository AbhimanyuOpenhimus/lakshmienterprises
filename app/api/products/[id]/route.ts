import { list } from "@vercel/blob"
import { NextResponse } from "next/server"
import { products as initialProducts } from "@/lib/products"

// Helper function to sanitize product data
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
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

    // Special case for accessories route
    if (id === "accessories") {
      return NextResponse.json(
        { error: "Accessories should be handled by the dedicated page" },
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

    console.log(`Fetching product with ID: ${id}`)

    // List all blobs with the products/ prefix
    const { blobs } = await list({ prefix: "products/" })

    // If no products exist yet, search in initial products
    if (!blobs || blobs.length === 0) {
      console.log("No product blobs found, searching in initial products")
      const product = initialProducts.find((p) => p.id === id)

      if (!product) {
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

      return NextResponse.json(
        { product: sanitizeProduct(product) },
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
      console.log("No data blobs found, searching in initial products")
      const product = initialProducts.find((p) => p.id === id)

      if (!product) {
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

      return NextResponse.json(
        { product: sanitizeProduct(product) },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    console.log(`Found latest blob: ${latestBlob.url}`)

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

    const products = await response.json()

    // Ensure products is an array
    if (!Array.isArray(products)) {
      console.log("Products data is not an array, searching in initial products")
      const product = initialProducts.find((p) => p.id === id)

      if (!product) {
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

      return NextResponse.json(
        { product: sanitizeProduct(product) },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    // Find the product by ID
    const product = products.find((p: any) => p.id === id)

    if (!product) {
      console.log(`Product with ID ${id} not found in blob data, searching in initial products`)
      const initialProduct = initialProducts.find((p) => p.id === id)

      if (!initialProduct) {
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

      return NextResponse.json(
        { product: sanitizeProduct(initialProduct) },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    console.log(`Found product: ${product.id} - ${product.name}`)

    return NextResponse.json(
      { product: sanitizeProduct(product) },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching product:", error)

    // Try to find in initial products as fallback
    const product = initialProducts.find((p) => p.id === params.id)

    if (product) {
      return NextResponse.json(
        { product: sanitizeProduct(product) },
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
      { error: "Failed to fetch product", details: error instanceof Error ? error.message : String(error) },
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
