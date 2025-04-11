"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { FormSubmission, Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { LogOut, Mail, Search, RefreshCw, Package, MessageSquare, Edit, Save, X } from "lucide-react"
import { getFormSubmissions, markSubmissionAsRead, deleteSubmission } from "@/lib/form-submissions"
import { getProducts, updateProduct, resetProducts } from "@/lib/product-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/ui/star-rating"
import { Switch } from "@/components/ui/switch"

export default function AdminDashboard() {
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [selectedMessage, setSelectedMessage] = useState<FormSubmission | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  // Product management state
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editForm, setEditForm] = useState<Partial<Product>>({})

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("adminLoggedIn") === "true"
      setIsLoggedIn(loggedIn)

      if (loggedIn) {
        loadSubmissions()
        loadProducts()
      }
    }

    // Small delay to ensure client-side code runs properly
    setTimeout(checkLogin, 100)
  }, [])

  const loadSubmissions = () => {
    const data = getFormSubmissions()
    setSubmissions(data)
  }

  const loadProducts = () => {
    const data = getProducts()
    setProducts(data)
    setFilteredProducts(data)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple hardcoded authentication for demo purposes
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("adminLoggedIn", "true")
        setIsLoggedIn(true)
        loadSubmissions()
        loadProducts()
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsLoggedIn(false)
    setSelectedMessage(null)
    setEditingProduct(null)
  }

  const handleMarkAsRead = (id: string) => {
    markSubmissionAsRead(id)
    loadSubmissions()
    setSelectedMessage(null)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteSubmission(id)
      loadSubmissions()
      setSelectedMessage(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Filter submissions based on search term and filter
  const filteredSubmissions = submissions.filter((submission) => {
    // Apply read/unread filter
    if (filter === "unread" && submission.read) return false
    if (filter === "read" && !submission.read) return false

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        submission.name.toLowerCase().includes(term) ||
        submission.email.toLowerCase().includes(term) ||
        (submission.subject?.toLowerCase() || "").includes(term) ||
        submission.message.toLowerCase().includes(term)
      )
    }

    return true
  })

  // Product management functions
  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setProductSearchTerm(term)

    if (!term.trim()) {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()),
    )

    setFilteredProducts(filtered)
  }

  const startEditingProduct = (product: Product) => {
    setEditingProduct(product)
    setEditForm({ ...product })
  }

  const cancelEditing = () => {
    setEditingProduct(null)
    setEditForm({})
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discountedPrice" ? Number(value) : value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEditForm((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountValue = Number(e.target.value) || 0
    const price = editForm.price || 0

    // Calculate discounted price
    const discountedPrice = price - price * (discountValue / 100)

    setEditForm((prev) => ({
      ...prev,
      discount: discountValue,
      discountedPrice: discountValue > 0 ? Math.round(discountedPrice) : undefined,
    }))
  }

  const saveProductChanges = () => {
    if (!editingProduct || !editForm.id) return

    const updatedProduct = {
      ...editingProduct,
      ...editForm,
    } as Product

    const success = updateProduct(updatedProduct)

    if (success) {
      toast({
        title: "Product Updated",
        description: `${updatedProduct.name} has been updated successfully.`,
      })
      loadProducts()
      setEditingProduct(null)
      setEditForm({})
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleResetProducts = () => {
    if (window.confirm("Are you sure you want to reset all products to default? This cannot be undone.")) {
      const success = resetProducts()
      if (success) {
        toast({
          title: "Products Reset",
          description: "All products have been reset to their default values.",
        })
        loadProducts()
      } else {
        toast({
          title: "Reset Failed",
          description: "Failed to reset products. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>For demo purposes, use:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="messages" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            {selectedMessage ? (
              // Message Detail View
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMessage(null)}
                    className="flex items-center"
                  >
                    Back to Messages
                  </Button>
                  <div className="flex space-x-2">
                    {!selectedMessage.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className="flex items-center"
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="flex items-center"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject || "Contact Form Submission"}</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-4">From: {selectedMessage.name}</span>
                    <span>Received: {formatDate(selectedMessage.createdAt)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Phone:</span>
                    <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Message:</h3>
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            ) : (
              // Message List View
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Form Submissions</h2>

                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 border-b">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search messages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={filter === "all" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilter("all")}
                        >
                          All
                        </Button>
                        <Button
                          variant={filter === "unread" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilter("unread")}
                        >
                          Unread
                        </Button>
                        <Button
                          variant={filter === "read" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilter("read")}
                        >
                          Read
                        </Button>
                        <Button variant="outline" size="sm" onClick={loadSubmissions} title="Refresh">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {filteredSubmissions.length} {filteredSubmissions.length === 1 ? "message" : "messages"} found
                    </div>
                  </div>

                  {filteredSubmissions.length === 0 ? (
                    <div className="p-8 text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-1">No messages found</h3>
                      <p className="text-gray-500">
                        {searchTerm || filter !== "all"
                          ? "Try changing your search or filter"
                          : "You haven't received any messages yet"}
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {filteredSubmissions.map((submission) => (
                        <li
                          key={submission.id}
                          className={`hover:bg-gray-50 cursor-pointer ${!submission.read ? "bg-blue-50" : ""}`}
                          onClick={() => setSelectedMessage(submission)}
                        >
                          <div className="p-4">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">
                                {submission.subject || "Contact Form Submission"}
                                {!submission.read && (
                                  <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    New
                                  </span>
                                )}
                              </h3>
                              <span className="text-sm text-gray-500">{formatDate(submission.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">From: {submission.name}</p>
                            <p className="text-sm text-gray-500 mt-1 truncate">{submission.message}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            {editingProduct ? (
              // Product Edit Form
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Edit Product</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEditing} className="flex items-center">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={saveProductChanges}
                      className="flex items-center bg-blue-700 hover:bg-blue-800"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={editForm.name || ""}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={editForm.category || ""}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={editForm.price || 0}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        name="discount"
                        type="number"
                        min="0"
                        max="100"
                        value={editForm.discount || 0}
                        onChange={handleDiscountChange}
                      />
                    </div>

                    {editForm.discount && editForm.discount > 0 && (
                      <div>
                        <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                        <Input
                          id="discountedPrice"
                          name="discountedPrice"
                          type="number"
                          value={editForm.discountedPrice || 0}
                          disabled
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        name="image"
                        value={editForm.image || ""}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isNew"
                          checked={editForm.isNew || false}
                          onCheckedChange={(checked) => handleSwitchChange("isNew", checked)}
                        />
                        <Label htmlFor="isNew">New Product</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="inStock"
                          checked={editForm.inStock || false}
                          onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={editForm.description || ""}
                        onChange={handleEditFormChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="rating">Rating (1-5)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="rating"
                          name="rating"
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={editForm.rating || 5}
                          onChange={handleEditFormChange}
                          required
                        />
                        <StarRating rating={Number(editForm.rating) || 5} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reviews">Number of Reviews</Label>
                      <Input
                        id="reviews"
                        name="reviews"
                        type="number"
                        min="0"
                        value={editForm.reviews || 0}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>

                    <div className="mt-4">
                      <Label className="mb-2 block">Product Preview</Label>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                            {editForm.image && (
                              <img
                                src={editForm.image || "/placeholder.svg"}
                                alt={editForm.name || "Product"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{editForm.name || "Product Name"}</h3>
                            <p className="text-sm text-gray-500">{editForm.category || "Category"}</p>
                            <div className="flex items-center mt-1">
                              <span className="font-bold mr-2">₹{editForm.price || 0}</span>
                              {editForm.discount && editForm.discount > 0 && (
                                <span className="text-sm text-green-600">({editForm.discount}% off)</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Product List View
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Manage Products</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetProducts}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Reset to Default
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        value={productSearchTerm}
                        onChange={handleProductSearch}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="p-8 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-1">No products found</h3>
                      <p className="text-gray-500">Try changing your search term</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rating
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0 mr-3">
                                    <img
                                      className="h-10 w-10 rounded-md object-cover"
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      onError={(e) => {
                                        ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                                      }}
                                    />
                                  </div>
                                  <div className="max-w-xs truncate">
                                    <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{product.category}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">₹{product.price}</div>
                                {product.discount && product.discount > 0 && (
                                  <div className="text-xs text-green-600">{product.discount}% off</div>
                                )}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {product.isNew && (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-2">
                                      New
                                    </span>
                                  )}
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <StarRating rating={product.rating} size="sm" />
                                  <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => startEditingProduct(product)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
