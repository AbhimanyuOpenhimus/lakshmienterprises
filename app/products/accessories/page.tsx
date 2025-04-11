"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccessoriesPage() {
  // State for image errors
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  // Sample accessories data - you can replace with your actual data
  const accessories = [
    {
      id: "acc-1",
      name: "CCTV Cable",
      description: "High-quality coaxial cable for CCTV installations",
      price: 999,
      image: "https://images-cdn.ubuy.co.in/6353e821089582532d12b952-amcrest-2-pack-4k-security-camera-cable.jpg",
      category: "Cables",
    },
    {
      id: "acc-2",
      name: "Power Supply Unit",
      description: "12V DC power supply for CCTV cameras",
      price: 599,
      image: "https://www.nccadapter.in/wp-content/uploads/2020/06/camera-power-supply-500x500-1.jpg",
      category: "Power",
    },
    {
      id: "acc-3",
      name: "BNC Connectors",
      description: "Pack of 10 BNC connectors for CCTV cables",
      price: 299,
      image:
        "https://rukminim3.flixcart.com/image/850/1000/xif0q/wire-joint-connector/b/9/c/bnc-connector-with-copper-wire-moulded-for-connecting-for-cctv-original-imagqdy3yyxydzfd.jpeg?q=90&crop=false",
      category: "Connectors",
    },
    {
      id: "acc-4",
      name: "HDMI Cable",
      description: "3-meter HDMI cable for DVR/NVR connection",
      price: 399,
      image: "https://m.media-amazon.com/images/I/61KUaE1R97L._SL1500_.jpg",
      category: "Cables",
    },
    {
      id: "acc-5",
      name: "Hard Drive",
      description: "2TB surveillance-grade hard drive for DVR/NVR",
      price: 4999,
      image: "https://5.imimg.com/data5/FS/DE/SX/SELLER-21067398/wd-2-tb-hard-disk-blue-500x500.jpeg",
      category: "Storage",
    },
    {
      id: "acc-6",
      name: "Camera Mount",
      description: "Adjustable wall mount for CCTV cameras",
      price: 249,
      image: "https://images-cdn.ubuy.co.in/63416f47dd72e4286c4cefb2-compcctv-cctv-security-camera-mount.jpg",
      category: "Mounts",
    },
    {
      id: "acc-7",
      name: "Junction Box",
      description: "Weatherproof junction box for outdoor installations",
      price: 349,
      image: "https://m.media-amazon.com/images/I/31O9ZV+GqlL._AC_UF1000,1000_QL80_.jpg",
      category: "Installation",
    },
    {
      id: "acc-8",
      name: "Video Balun",
      description: "Pair of passive video baluns for CCTV transmission",
      price: 199,
      image: "https://m.media-amazon.com/images/I/718sJsmfz1L.jpg",
      category: "Transmission",
    },
  ]

  // Group accessories by category
  const categories = Array.from(new Set(accessories.map((acc) => acc.category)))

  const phoneNumber = "+919771719682"

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({
      ...prev,
      [id]: true,
    }))
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Background */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://png.pngtree.com/background/20240916/original/pngtree-cctv-camera-in-urban-landscape-with-available-space-for-text-photo-picture-image_10530750.jpg')",
              opacity: 0.6,
            }}
          ></div>
          <div className="relative py-12 px-6 text-center">
            <h1 className="text-4xl font-bold mb-2 text-white">CCTV Accessories</h1>
            <p className="text-xl text-blue-100">Essential components and accessories for your security system</p>
          </div>
        </div>

        <Link href="/products" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        {/* Category Navigation */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-blue-50 border-blue-200 hover:bg-blue-100">
              All Accessories
            </Button>
            {categories.map((category) => (
              <Button key={category} variant="outline" className="hover:bg-blue-50">
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Accessories Grid with Fixed Heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {accessories.map((accessory) => (
            <div
              key={accessory.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full"
            >
              <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={imgErrors[accessory.id] ? "/placeholder.svg" : accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={() => handleImgError(accessory.id)}
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    {accessory.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{accessory.name}</h3>
                <p className="text-gray-500 text-sm mb-3 flex-grow">{accessory.description}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-blue-700">₹{accessory.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1 bg-blue-700 hover:bg-blue-800">
                      <a href={`tel:${phoneNumber}`} className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-blue-200 hover:bg-blue-50">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Inquire
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 rounded-lg shadow-md text-center mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Custom Accessories?</h2>
          <p className="mb-6 text-blue-100">
            We offer a wide range of accessories not listed here. Contact us for specific requirements or bulk orders.
          </p>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
            <a href={`tel:${phoneNumber}`} className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Call Us: {phoneNumber}
            </a>
          </Button>
        </div>

        {/* Additional Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Accessories?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">Quality Assured</h3>
              <p className="text-gray-600">
                All our accessories are sourced from trusted manufacturers and tested for reliability.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">Compatibility Guaranteed</h3>
              <p className="text-gray-600">Our accessories are compatible with all major CCTV brands and models.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">Expert Advice</h3>
              <p className="text-gray-600">
                Not sure what you need? Our team can help you select the right accessories for your system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
