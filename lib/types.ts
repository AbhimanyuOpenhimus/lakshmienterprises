export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  discount?: number
  category: string
  image: string
  features: string[]
  specifications: Record<string, string>
  isNew: boolean
  inStock: boolean
  rating: number
  reviews: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface FormSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}
