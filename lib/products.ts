import type { Product } from "./types"

// Sample products data
export const products: Product[] = [
  {
    id: "cctv-1",
    name: "HD Security Camera System",
    description: "Complete HD security camera system with night vision and motion detection.",
    price: 12999,
    category: "CCTV",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 24,
    featured: true,
    isNew: true,
    discount: 10,
    specifications: [
      { name: "Resolution", value: "1080p HD" },
      { name: "Night Vision", value: "Yes, up to 30ft" },
      { name: "Motion Detection", value: "Yes" },
      { name: "Storage", value: "1TB HDD included" },
      { name: "Channels", value: "8 channels" },
      { name: "Weather Resistant", value: "IP66 rated" },
    ],
  },
  {
    id: "cctv-2",
    name: "Wireless Home Security System",
    description: "Easy to install wireless security system with smartphone integration.",
    price: 8999,
    category: "CCTV",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 18,
    featured: true,
    specifications: [
      { name: "Resolution", value: "720p HD" },
      { name: "Night Vision", value: "Yes, up to 20ft" },
      { name: "Motion Detection", value: "Yes" },
      { name: "Storage", value: "Cloud storage (subscription required)" },
      { name: "Channels", value: "4 channels" },
      { name: "Weather Resistant", value: "IP65 rated" },
    ],
  },
  {
    id: "cctv-3",
    name: "4K Ultra HD Security System",
    description: "Professional grade 4K security system for maximum clarity and detail.",
    price: 24999,
    discountedPrice: 22499,
    category: "CCTV",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 32,
    featured: true,
    discount: 10,
    specifications: [
      { name: "Resolution", value: "4K Ultra HD" },
      { name: "Night Vision", value: "Yes, up to 50ft" },
      { name: "Motion Detection", value: "Yes, with AI person detection" },
      { name: "Storage", value: "2TB HDD included" },
      { name: "Channels", value: "16 channels" },
      { name: "Weather Resistant", value: "IP67 rated" },
    ],
  },
  {
    id: "cct-4",
    name: "PTZ Dome Camera",
    description: "Pan-Tilt-Zoom camera with 360° coverage and 30x optical zoom.",
    price: 15999,
    category: "CCTV",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 15,
    featured: true,
    specifications: [
      { name: "Resolution", value: "1080p HD" },
      { name: "Pan/Tilt/Zoom", value: "360° pan, 90° tilt, 30x optical zoom" },
      { name: "Night Vision", value: "Yes, up to 40ft" },
      { name: "Motion Detection", value: "Yes" },
      { name: "Weather Resistant", value: "IP66 rated" },
      { name: "Audio", value: "Two-way audio" },
    ],
  },
  {
    id: "dvr-1",
    name: "8-Channel DVR Recorder",
    description: "Digital video recorder with 8 channels and 2TB storage capacity.",
    price: 7999,
    category: "DVR",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 12,
    specifications: [
      { name: "Channels", value: "8 channels" },
      { name: "Storage", value: "2TB HDD included" },
      { name: "Resolution", value: "Supports up to 4K" },
      { name: "Remote Access", value: "Yes, via smartphone app" },
      { name: "HDMI Output", value: "Yes" },
      { name: "Motion Detection", value: "Yes" },
    ],
  },
  {
    id: "dvr-2",
    name: "16-Channel NVR System",
    description: "Network video recorder with 16 channels and 4TB storage for IP cameras.",
    price: 12999,
    category: "DVR",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 22,
    isNew: true,
    specifications: [
      { name: "Channels", value: "16 channels" },
      { name: "Storage", value: "4TB HDD included" },
      { name: "Resolution", value: "Supports up to 4K" },
      { name: "Remote Access", value: "Yes, via smartphone app" },
      { name: "HDMI Output", value: "Yes" },
      { name: "AI Features", value: "Person and vehicle detection" },
    ],
  },
  {
    id: "acc-1",
    name: "CCTV Cable (100m)",
    description: "High-quality coaxial cable for CCTV installations, 100 meter roll.",
    price: 1299,
    category: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 28,
    specifications: [
      { name: "Length", value: "100 meters" },
      { name: "Type", value: "RG59 Coaxial" },
      { name: "Connectors", value: "BNC connectors included" },
      { name: "Shielding", value: "Double shielded" },
      { name: "Weather Resistant", value: "Yes" },
      { name: "Color", value: "Black" },
    ],
  },
  {
    id: "acc-2",
    name: "Power Supply Unit",
    description: "12V DC power supply unit for CCTV cameras with 8 outputs.",
    price: 1499,
    discountedPrice: 1299,
    category: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 14,
    discount: 13,
    specifications: [
      { name: "Output", value: "12V DC" },
      { name: "Channels", value: "8 outputs" },
      { name: "Protection", value: "Short circuit and overload protection" },
      { name: "Input", value: "100-240V AC" },
      { name: "Efficiency", value: "90%" },
      { name: "Dimensions", value: "200 x 150 x 50mm" },
    ],
  },
]

// Featured products (subset of all products)
export const featuredProducts = products.filter((product) => product.featured)

// Get all products
export const allProducts = products
