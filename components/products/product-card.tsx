"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Destructure product properties for easier access and updates
  const { id, name, category, price, discountedPrice, image, isNew, rating, reviews, discount } = product
  const [imgError, setImgError] = useState(false)

  // Calculate the display price
  const displayPrice = discountedPrice || price

  // Product URL
  const productUrl = `/products/${id}`

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
      {/* Product Image with Overlay */}
      <Link href={productUrl} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={imgError ? "/placeholder.svg" : image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* New Badge */}
        {isNew && <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-blue-900">New</Badge>}

        {/* Discount Badge */}
        {discount && discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white">{discount}% OFF</Badge>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Product Category */}
        <p className="text-blue-600 text-xs font-medium mb-1">{category}</p>

        {/* Product Name */}
        <Link href={productUrl}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Product Rating */}
        <div className="flex items-center mb-2">
          <StarRating rating={rating} size="sm" />
          <span className="ml-1 text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Product Price */}
        <div className="flex items-center mb-4 mt-auto">
          <span className="font-bold text-lg">₹{displayPrice.toLocaleString()}</span>
          {discountedPrice && (
            <span className="text-gray-400 line-through ml-2 text-sm">₹{price.toLocaleString()}</span>
          )}
        </div>

        {/* View Details Button */}
        <Button asChild className="w-full bg-blue-700 hover:bg-blue-800 group-hover:shadow-md transition-all">
          <Link href={productUrl}>View Details</Link>
        </Button>
      </div>
    </div>
  )
}
