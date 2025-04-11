"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/products/product-card"
import { getProducts } from "@/lib/product-service"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/types"

export default function ProductsPage() {
  // State for products
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Get unique categories
  const [categories, setCategories] = useState<string[]>([])

  // Brands we carry with logos
  const brands = [
    {
      name: "Hikvision",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Hikvision_logo.svg/2560px-Hikvision_logo.svg.png",
    },
    { name: "CP Plus", logo: "https://velacctv.com/blog/wp-content/uploads/2018/03/CP_Plus_logo.jpg" },
    {
      name: "Dahua",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dahua_Technology_logo.svg/2560px-Dahua_Technology_logo.svg.png",
    },
    {
      name: "D-Link",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/D-Link_wordmark.svg/1024px-D-Link_wordmark.svg.png",
    },
    { name: "Lapcare", logo: "https://www.lapcare.com/cdn/shop/files/lapcare-logo.png?v=1680656804&width=1964" },
    { name: "Ranz", logo: "https://ranz.in/wp-content/uploads/2020/02/cropped-Logo-3.jpg" },
    { name: "frontech", logo: "https://nationalpc.in/image/cache/catalog/Brand/Logo/frontech-600x315w.png.webp" },
    {
      name: "consistent",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNbmIc3bZR5BvOOr0aMOh5N1By-i2Gux8VcQ&s",
    },
  ]

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleBrands, setVisibleBrands] = useState(4)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [brandImgErrors, setBrandImgErrors] = useState<Record<string, boolean>>({})

  // Load products on component mount
  useEffect(() => {
    const loadData = () => {
      const products = getProducts()
      setAllProducts(products)

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(products.map((product) => product.category)))
      setCategories(uniqueCategories)

      setLoading(false)
    }

    // Small delay to ensure client-side code runs properly
    setTimeout(loadData, 100)
  }, [])

  // Update visible brands based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleBrands(1)
      } else if (window.innerWidth < 768) {
        setVisibleBrands(2)
      } else if (window.innerWidth < 1024) {
        setVisibleBrands(3)
      } else {
        setVisibleBrands(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Carousel navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (brands.length - visibleBrands + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? brands.length - visibleBrands : prevIndex - 1))
  }

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentIndex, visibleBrands])

  // Filter products by category
  const getFilteredProducts = (category: string) => {
    if (category === "all") return allProducts
    return allProducts.filter((product) => product.category === category)
  }

  const handleBrandImgError = (brandName: string) => {
    setBrandImgErrors((prev) => ({
      ...prev,
      [brandName]: true,
    }))
  }

  if (loading) {
    return (
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-20 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Security Products with Background Image - Responsive */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://static.vecteezy.com/system/resources/thumbnails/006/899/440/small_2x/data-protection-cyber-security-privacy-business-internet-technology-concept-free-photo.jpg')",
              opacity: 0.6,
            }}
          ></div>
          <div className="relative py-8 sm:py-12 px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white">Security Products</h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Browse our wide range of CCTV and security products
            </p>
          </div>
        </div>

        {/* Brands We Carry - Carousel */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Brands We Carry</h2>

          <div className="relative">
            {/* Carousel Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-700 text-white p-2 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
              aria-label="Previous brands"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-700 text-white p-2 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
              aria-label="Next brands"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden px-10" ref={carouselRef}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleBrands)}%)` }}
              >
                {brands.map((brand, index) => (
                  <div key={brand.name} className="flex-none px-2" style={{ width: `${100 / visibleBrands}%` }}>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 hover:shadow-md transition-shadow">
                      <img
                        src={brandImgErrors[brand.name] ? "/placeholder.svg" : brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        className="h-12 mb-2"
                        onError={() => handleBrandImgError(brand.name)}
                      />
                      <span className="font-semibold text-sm">{brand.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: brands.length - visibleBrands + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? "bg-blue-700" : "bg-gray-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
          <TabsList className="mb-6 flex flex-wrap bg-white">
            <TabsTrigger value="all">All Products</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Products Tab */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <div key={product.id} className="transform transition-all duration-300 hover:-translate-y-2">
                  <ProductCard product={product} />
                </div>
              ))}

              {/* CCTV Accessories Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow transform transition-all duration-300 hover:-translate-y-2">
                <Link href="/products/accessories" className="block">
                  <div className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src="https://5.imimg.com/data5/LV/WM/MY-3471797/cctv-accessories.jpg"
                      alt="CCTV Accessories"
                      className="w-3/4 h-3/4 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href="/products/accessories">
                    <h3 className="font-semibold text-lg mb-1 hover:text-blue-700 transition-colors">
                      CCTV Accessories
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-3">Cables, Connectors, Power Supplies & More</p>
                  <Button asChild className="w-full bg-blue-700 hover:bg-blue-800">
                    <Link href="/products/accessories">View All Accessories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Category Tabs */}
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFilteredProducts(category).map((product) => (
                  <div key={product.id} className="transform transition-all duration-300 hover:-translate-y-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}
