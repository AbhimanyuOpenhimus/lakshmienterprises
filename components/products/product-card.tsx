"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { useState, useEffect } from "react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const [safeProduct, setSafeProduct] = useState<Product | null>(null)

  // Safely handle product data
  useEffect(() => {
    if (!product) {
      console.error("ProductCard received null or undefined product")
      return
    }

    // Ensure all required fields have values
    const completeProduct = {
      id: product.id || `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: product.name || "Product",
      description: product.description || "No description available",
      price: product.price || 0,
      category: product.category || "General",
      image: product.image || "/placeholder.svg",
      rating: product.rating || 4.0,
      reviews: product.reviews || 0,
      features: product.features || [],
      specifications: product.specifications || [],
      isNew: product.isNew || false,
      inStock: product.inStock !== false, // Default to true unless explicitly false
      discount: product.discount || 0,
      discountedPrice:
        product.discountedPrice ||
        (product.discount && product.discount > 0
          ? Math.round(product.price - product.price * (product.discount / 100))
          : undefined),
    }

    setSafeProduct(completeProduct)
  }, [product])

  // If product is invalid or still loading
  if (!safeProduct) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col animate-pulse">
        <div className="aspect-square bg-gray-200"></div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="mt-auto">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  // Product URL
  const productUrl = `/products/${safeProduct.id}`

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
      {/* Product Image with Overlay */}
      <Link href={productUrl} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {/* Use a more robust approach to image loading with error handling */}
          <div className="w-full h-full flex items-center justify-center">
            {imgError ? (
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Product image placeholder"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <img
                src={safeProduct.image || "/placeholder.svg?height=300&width=300"}
                alt={safeProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImgError(true)}
                loading="lazy"
                crossOrigin="anonymous" // Add crossOrigin to handle CORS issues with blob URLs
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* New Badge */}
        {safeProduct.isNew && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-blue-900">New</Badge>
        )}

        {/* Discount Badge */}
        {safeProduct.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white">
            {safeProduct.discount}% OFF
          </Badge>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Product Category */}
        <p className="text-blue-600 text-xs font-medium mb-1">{safeProduct.category}</p>

        {/* Product Name */}
        <Link href={productUrl}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
            {safeProduct.name}
          </h3>
        </Link>

        {/* Product Rating */}
        <div className="flex items-center mb-2">
          <StarRating rating={safeProduct.rating} size="sm" />
          <span className="ml-1 text-xs text-gray-500">({safeProduct.reviews})</span>
        </div>

        {/* Product Price */}
        <div className="flex items-center mb-4 mt-auto">
          <span className="font-bold text-lg">
            ₹{safeProduct.discountedPrice?.toLocaleString() || safeProduct.price.toLocaleString()}
          </span>
          {safeProduct.discountedPrice && (
            <span className="text-gray-400 line-through ml-2 text-sm">₹{safeProduct.price.toLocaleString()}</span>
          )}
        </div>

        {/* View Details Button */}
        <Link
          href={productUrl}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded text-center transition-all hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
