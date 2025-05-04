"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { ArrowLeft, Check, Phone, MessageCircle, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/ui/star-rating"
import { getProductById } from "@/lib/product-service"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [imgError, setImgError] = useState(false)
  const phoneNumber = "+919771719682"
  const router = useRouter()

  useEffect(() => {
    // Fetch the product
    const fetchProduct = async () => {
      try {
        // Special case for accessories route
        if (params.id === "accessories") {
          console.log("Accessories route detected, redirecting")
          router.push("/products/accessories")
          return
        }

        // Add timestamp to prevent caching
        const timestamp = new Date().getTime()
        const foundProduct = await getProductById(params.id)

        if (foundProduct) {
          // Ensure all required fields have values
          const completeProduct = {
            ...foundProduct,
            // Ensure image is not a blob URL
            image:
              typeof foundProduct.image === "string" && !foundProduct.image.startsWith("blob:")
                ? foundProduct.image
                : "/placeholder.svg?height=300&width=300",
            rating: foundProduct.rating ?? 4.0,
            reviews: foundProduct.reviews ?? 0,
            features: foundProduct.features ?? [],
            specifications: foundProduct.specifications ?? [],
            inStock: foundProduct.inStock ?? true,
          }

          setProduct(completeProduct)
          console.log("Product loaded:", completeProduct.id)

          // Get related products
          try {
            const allProducts = await getProducts()
            const related = allProducts
              .filter(
                (p: Product) =>
                  // Filter out invalid products and the current product
                  p && p.id && p.category === completeProduct.category && p.id !== completeProduct.id,
              )
              .slice(0, 4)
            // Process related products
            const validRelated = related.map((p) => ({
              ...p,
              image:
                typeof p.image === "string" && !p.image.startsWith("blob:")
                  ? p.image
                  : "/placeholder.svg?height=300&width=300",
            }))
            setRelatedProducts(validRelated)
            console.log(`Loaded ${validRelated.length} related products`)
          } catch (error) {
            console.error("Error fetching related products:", error)
            setRelatedProducts([])
          }
        } else {
          console.error("Product not found:", params.id)
          // If product is not found, redirect to products page
          router.push("/products")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        // If there's an error, redirect to products page
        router.push("/products")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()

    // Set up a refresh interval to keep data fresh but with a longer interval
    const refreshInterval = setInterval(fetchProduct, 60000) // Refresh every 60 seconds

    return () => clearInterval(refreshInterval)
  }, [params.id, router])

  // Helper function to get products
  async function getProducts(): Promise<Product[]> {
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime()

      // Try to fetch from API first with explicit no-cache headers
      const response = await fetch(`/api/products?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data.products)) {
          return data.products
        }
      }

      // If API fails, try localStorage
      if (typeof window !== "undefined") {
        const storedProducts = localStorage.getItem("products")
        if (storedProducts) {
          try {
            const parsedProducts = JSON.parse(storedProducts)
            if (Array.isArray(parsedProducts)) {
              return parsedProducts
            }
          } catch (error) {
            console.error("Error parsing stored products:", error)
          }
        }
      }

      // Fallback to empty array
      return []
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  if (loading) {
    return (
      <main className="flex-1 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div>
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 w-1/3 bg-gray-200 rounded mb-6"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return notFound()
  }

  // Generate sample reviews based on the product's review count
  const sampleReviews = Array.from({ length: Math.min(product.reviews || 0, 5) }, (_, i) => {
    const randomRating = Math.max(3, Math.min(5, (product.rating || 4) + (Math.random() * 1.5 - 0.75)))
    return {
      id: `review-${i}`,
      author: [
        "Rajesh Kumar",
        "Amit Singh",
        "Priya Sharma",
        "Vikram Patel",
        "Neha Gupta",
        "Sanjay Verma",
        "Anita Desai",
      ][Math.floor(Math.random() * 7)],
      rating: randomRating,
      date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN"),
      content: [
        "Great product, works exactly as described. The quality is excellent and installation was easy.",
        "Very satisfied with this purchase. The camera quality is outstanding, especially at night.",
        "Good value for money. The setup was straightforward and the app works well.",
        "Excellent product. The picture quality is crystal clear and the motion detection works perfectly.",
        "This security camera has given me peace of mind. Customer service was also very helpful.",
      ][Math.floor(Math.random() * 5)],
      helpful: Math.floor(Math.random() * 15),
    }
  })

  return (
    <main className="flex-1 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <img
                src={imgError ? "/placeholder.svg" : product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto object-cover"
                onError={() => setImgError(true)}
              />
              {product.isNew && (
                <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900">New</Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Rating and Reviews Summary */}
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating || 4} size="md" />
              <span className="ml-2 text-gray-600">
                {(product.rating || 4).toFixed(1)} ({product.reviews || 0} reviews)
              </span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              {product.discount && product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-3">₹{product.discountedPrice}</span>
                  <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
                  <Badge className="ml-3 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                    {product.discount}% OFF
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold">₹{product.price}</span>
              )}
            </div>

            <div className="flex items-center mb-6 text-green-600">
              <Check className="h-5 w-5 mr-2" />
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800">
                <a href={`tel:${phoneNumber}`} className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now to Order: {phoneNumber}
                </a>
              </Button>
            </div>

            {/* Key Features Summary */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(product.features || []).slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="bg-white">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="p-6 bg-white rounded-lg shadow-sm mt-4">
            <ul className="space-y-3">
              {(product.features || []).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="specifications" className="p-6 bg-white rounded-lg shadow-sm mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(product.specifications) &&
                product.specifications.map((spec, index) => (
                  <div key={index} className="border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-700">{spec.name}: </span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="p-6 bg-white rounded-lg shadow-sm mt-4">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

              {/* Rating Summary */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-700">{(product.rating || 4).toFixed(1)}</div>
                  <StarRating rating={product.rating || 4} size="lg" className="justify-center my-2" />
                  <div className="text-sm text-gray-500">{product.reviews || 0} reviews</div>
                </div>

                <div className="flex-grow">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      // Calculate percentage of reviews for each star rating
                      const percentage = Math.round(
                        (star <= Math.round(product.rating || 4) ? (6 - star) * 20 : 5) * ((product.rating || 4) / 5),
                      )
                      return (
                        <div key={star} className="flex items-center">
                          <div className="w-12 text-sm text-gray-600">{star} stars</div>
                          <div className="flex-grow mx-3 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <div className="w-12 text-sm text-gray-600 text-right">{percentage}%</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {sampleReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-700 rounded-full p-2 mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{review.author}</div>
                          <div className="text-sm text-gray-500">Verified Purchase</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>

                    <div className="mb-2">
                      <StarRating rating={review.rating} size="sm" />
                    </div>

                    <p className="text-gray-700 mb-3">{review.content}</p>

                    <div className="flex items-center text-sm text-gray-500">
                      <button className="flex items-center hover:text-blue-700">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </button>
                      <span className="mx-2">•</span>
                      <button className="flex items-center hover:text-blue-700">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/products/${relatedProduct.id}`} className="block">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-blue-700 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <StarRating rating={relatedProduct.rating || 4} size="sm" />
                      <span className="ml-1 text-sm text-gray-500">({relatedProduct.reviews || 0})</span>
                    </div>
                    <div className="font-bold mb-3">₹{relatedProduct.price}</div>
                    <Button asChild className="w-full bg-blue-700 hover:bg-blue-800">
                      <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
