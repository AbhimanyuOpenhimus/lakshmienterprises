import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, PenToolIcon as Tool, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TestimonialCard } from "@/components/testimonial-card"
import HomeCarouselScript from "@/components/home-carousel"

export const revalidate = 0 // Disable caching for this page

export default function Home() {
  // Simple carousel images
  const carouselImages = [
    {
      id: 1,
      src: "https://5.imimg.com/data5/SELLER/Default/2024/11/463767606/EN/IR/CC/1119861/home-security-cctv.jpg",
      alt: "CCTV Security Camera",
      title: "Advanced Surveillance Systems",
      description: "State-of-the-art security cameras for complete peace of mind",
    },
    {
      id: 2,
      src: "https://lh3.googleusercontent.com/hMocN5AmKXj8bZF96zINiX8hfZRW-fcsEe0cMHP1ir6cogNe4sbzYspw0WweNm7w7ZWwtdwicDoxZmxoswA-GLMnYOfJQneYSQ=w3840-h2160-c-rw-v3",
      alt: "Home Security System",
      title: "Complete Home Security",
      description: "Protect what matters most with our integrated security solutions",
    },
    {
      id: 3,
      src: "https://infygain.com/uploads/77755f32-d5a2-487b-9626-26f685830a71Home-security-cameras-Wireless.webp",
      alt: "Wireless Security Camera",
      title: "Professional Monitoring",
      description: "24/7 monitoring services for businesses and residential properties",
    },
    {
      id: 4,
      src: "https://5.imimg.com/data5/SELLER/Default/2024/1/380102119/FT/MB/SB/94947412/biometric-access-control-system-500x500.jpg",
      alt: "Biometric Access Control",
      title: "Biometric Access Control",
      description: "Advanced biometric and card-based access control solutions",
    },
    {
      id: 5,
      src: "https://crystalheatingandcooling.ca/wp-content/uploads/2021/06/Crystal-smart-home-security-system-scaled.jpeg",
      alt: "Smart Home Security",
      title: "Smart Security Integration",
      description: "Seamlessly integrate security with your smart home ecosystem",
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section with Gradient Overlay */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="inline-block px-4 py-1 bg-blue-800 bg-opacity-70 rounded-full text-yellow-400 font-semibold text-sm mb-6 animate-pulse">
              Trusted Security Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Secure Your Space with Advanced CCTV Solutions
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Lakshmi Enterprises provides top-quality surveillance systems for homes and businesses. Professional
              installation and 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold shadow-lg transform transition hover:scale-105"
              >
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:text-white shadow-lg transform transition hover:scale-105"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500">
              <img
                src="/images/cctv-hero.jpeg"
                alt="CCTV Security System"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-yellow-500 rounded-full opacity-20 z-0 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Lakshmi Enterprises?</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4 transform transition-transform hover:rotate-12">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">We offer only the highest quality CCTV systems from trusted brands.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4 transform transition-transform hover:rotate-12">
                <Tool className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Installation</h3>
              <p className="text-gray-600">Our certified technicians ensure proper setup and configuration.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4 transform transition-transform hover:rotate-12">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Service</h3>
              <p className="text-gray-600">Quick and best installation services across the region.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-transparent hover:border-blue-600">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4 transform transition-transform hover:rotate-12">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock technical support and maintenance services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Image Carousel Section - IMPROVED */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Security Solutions</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our range of high-quality security products designed to keep your home and business safe
            </p>
          </div>

          {/* Improved Image Carousel */}
          <div className="relative mx-auto max-w-5xl" id="carousel-container">
            {/* Carousel Navigation Buttons - Improved for mobile */}
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous slide"
              id="prev-slide"
              type="button"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next slide"
              id="next-slide"
              type="button"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Carousel Container - Improved for touch */}
            <div className="overflow-hidden rounded-xl shadow-2xl touch-pan-y">
              <div className="flex" id="carousel-track">
                {carouselImages.map((image) => (
                  <div key={image.id} className="min-w-full flex-shrink-0 relative">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback if image fails to load
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=500&width=800"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                        {image.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-lg">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators - Improved for mobile */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className="h-2 sm:h-3 w-2 sm:w-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={`Go to slide ${index + 1}`}
                  data-index={index}
                  type="button"
                ></button>
              ))}
            </div>
          </div>

          {/* See Products Button */}
          <div className="mt-8 sm:mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
            >
              <Link href="/products" className="flex items-center">
                See All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section with Improved Design */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg hover:bg-blue-100 transition-colors duration-300 border border-blue-200 shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Tool className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">CCTV Installation</h3>
              <p className="mb-6 text-gray-700">
                Professional installation of surveillance systems for homes and businesses.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
              >
                <Link href="/services#installation">Learn More</Link>
              </Button>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg hover:bg-blue-100 transition-colors duration-300 border border-blue-200 shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Tool className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">Maintenance & Repair</h3>
              <p className="mb-6 text-gray-700">
                Regular maintenance and prompt repair services to keep your systems running.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
              >
                <Link href="/services#maintenance">Learn More</Link>
              </Button>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg hover:bg-blue-100 transition-colors duration-300 border border-blue-200 shadow-lg transform transition-transform hover:scale-105">
              <div className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">Security Consultation</h3>
              <p className="mb-6 text-gray-700">
                Expert advice on the best security solutions for your specific needs.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
              >
                <Link href="/services#consultation">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Enhanced Design */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transform transition-all duration-300 hover:-translate-y-2">
              <TestimonialCard
                name="Rakesh Singh"
                role="Business Owner (R.K.Flex)"
                image="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
                content="Lakshmi Enterprises provided excellent service from consultation to installation. Their team was professional and knowledgeable. Highly recommended!"
              />
            </div>
            <div className="transform transition-all duration-300 hover:-translate-y-2">
              <TestimonialCard
                name="Munna Singh"
                role="Homeowner"
                image="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
                content="I'm extremely satisfied with the CCTV system installed by Lakshmi Enterprises. The quality is excellent and their after-sales support is outstanding."
              />
            </div>
            <div className="transform transition-all duration-300 hover:-translate-y-2">
              <TestimonialCard
                name="Vikram Singh"
                role="Office Manager"
                image="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
                content="We upgraded our office security with Lakshmi Enterprises and the difference is remarkable. Great products, great service, and great value."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Design */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231e40af' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Ready to Secure Your Property?</h2>
          <p className="text-xl text-blue-900 mb-8 max-w-3xl mx-auto">
            Contact Lakshmi Enterprises today for a free consultation and quote. Our experts are ready to help you find
            the perfect security solution.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-800 hover:bg-blue-900 text-white shadow-lg transform transition hover:scale-105"
          >
            <Link href="/contact">Contact Us Now</Link>
          </Button>
        </div>
      </section>

      {/* Include the carousel script */}
      <HomeCarouselScript />
    </main>
  )
}
