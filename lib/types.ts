export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  featured?: boolean
  isNew?: boolean
  discount?: number
  inStock?: boolean
  specifications: { name: string; value: string }[]
  features: string[]
}

export interface FormSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  createdAt: string
  read: boolean
  replied?: boolean
}
