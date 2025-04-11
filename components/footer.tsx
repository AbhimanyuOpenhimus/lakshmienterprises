import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const phoneNumber = "+919771719682"
  const emails = ["ishwardayalsingh38840@gmail.com", "idsingh12052001@gmail.com"]
  const developerPhone = "7762034687"

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Lakshmi</span>
              <span className="text-2xl font-bold text-yellow-500">Enterprises</span>
            </Link>
            <p className="mb-4">
              Your trusted partner for premium CCTV and security solutions. Serving homes and businesses since 2022.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Dome Cameras" className="hover:text-white">
                  CCTV Cameras
                </Link>
              </li>
              <li>
                <Link href="/products?category=DVR Systems" className="hover:text-white">
                  DVR & NVR Systems
                </Link>
              </li>
              <li>
                <Link href="/products?category=IP Cameras" className="hover:text-white">
                  IP Cameras
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Security Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-yellow-500" />
                <span>Vill- Madaniya, Sewtapur, Mairwa Siwan, Bihar 841239</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-500" />
                <a href={`tel:${phoneNumber}`} className="hover:text-white">
                  {phoneNumber}
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-1 text-yellow-500" />
                <div className="flex flex-col">
                  {emails.map((email, index) => (
                    <a key={index} href={`mailto:${email}`} className="hover:text-white">
                      {email}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Developer Credit - Simple and on the left */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <span>Design and Developed by </span>
              <a href={`tel:${developerPhone}`} className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Abhimanyu Kumar ({developerPhone})
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <p className="mb-2 md:mb-0 md:mr-6">
                &copy; {new Date().getFullYear()} Lakshmi Enterprises. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
