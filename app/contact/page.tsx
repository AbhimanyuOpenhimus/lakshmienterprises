"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { saveFormSubmission } from "@/lib/form-submissions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Simple email validation function
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const phoneNumber = "+919771719682"
  const emails = ["ishwardayalsingh38840@gmail.com", "idsingh12052001@gmail.com"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Save to API and database
      const result = await saveFormSubmission(formData)

      if (!result) {
        throw new Error("Failed to save submission")
      }

      // Show success dialog
      setShowSuccessDialog(true)

      // Reset the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error in form submission:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later or contact us directly by phone.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Alternative email sending approach using a simple mailto link
  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || "Contact Form Submission")
    const body = encodeURIComponent(`
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      
      Message:
      ${formData.message}
    `)

    window.location.href = `mailto:idsingh12052001@gmail.com?subject=${subject}&body=${body}`

    toast({
      title: "Email Client Opened",
      description: "We've opened your email client. Please send the pre-filled email to complete your message.",
    })
  }

  return (
    <main className="flex-1 bg-gray-50">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Sent Successfully!</DialogTitle>
            <DialogDescription>
              Thank you for contacting us. We'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-yellow-600 font-medium">
              If you don't receive a reply within one hour, please call the provided number: {phoneNumber}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or need a quote? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-700 mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-gray-600">Vill- Madaniya, Sewtapur, Mairwa Siwan, Bihar 841239</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-700 mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-gray-600">
                      <a href={`tel:${phoneNumber}`} className="hover:text-blue-700">
                        {phoneNumber}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-700 mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>
                    <div className="text-gray-600">
                      {emails.map((email, index) => (
                        <p key={index}>
                          <a href={`mailto:${email}`} className="hover:text-blue-700">
                            {email}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Saturday:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="text-red-600">9:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-red-500" : ""}
                    required
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="flex-1 bg-blue-700 hover:bg-blue-800" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={handleMailtoFallback}>
                    Open Email Client
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  If the form submission doesn't work, you can use the "Open Email Client" button or contact us
                  directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Visit Our Store</h2>
            <p className="mt-4 text-lg text-muted-foreground">Find us at our convenient location</p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.0456292877!2d84.16816837608!3d26.250138077953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399253f88d3936ff%3A0x64a4b7b717c860fe!2sLakshmi%20Enterprises%2FCCTV%20Sale%20and%20Service!5e0!3m2!1sen!2sin!4v1714384521345!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LAKSHMI ENTERPRISES Location"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
