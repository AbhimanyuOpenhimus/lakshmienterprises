"use client"
import Link from "next/link"
import { Menu, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const phoneNumber = "+919771719682"
  const whatsappNumber = phoneNumber.replace(/[^0-9]/g, "")
  const whatsappLink = `https://wa.me/${whatsappNumber}`

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-800">Lakshmi</span>
                <span className="text-2xl font-bold text-yellow-500">Enterprises</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    pathname === item.href
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <Button asChild className="bg-blue-700 hover:bg-blue-800">
                <a href={`tel:${phoneNumber}`} className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now: {phoneNumber}
                </a>
              </Button>
            </div>

            {/* Mobile Section */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Call Button */}
              <Button
                asChild
                size="icon"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              >
                <a href={`tel:${phoneNumber}`} aria-label="Call Now">
                  <Phone className="h-5 w-5" />
                </a>
              </Button>
              {/* --- Mobile Menu Sheet --- */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  {/* --- Add Accessible Title (Visually Hidden) --- */}
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  {/* --------------------------------------------- */}

                  <div className="flex flex-col h-full pt-4">
                    {" "}
                    {/* Added pt-4 to give space if title were visible */}
                    {/* Mobile Menu Logo */}
                    <div className="pb-6 border-b mb-6">
                      {" "}
                      {/* Changed py-6 to pb-6 */}
                      <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-blue-800">Lakshmi</span>
                        <span className="text-2xl font-bold text-yellow-500">Enterprises</span>
                      </Link>
                    </div>
                    {/* Mobile Menu Navigation */}
                    <nav className="flex flex-col space-y-4 flex-grow">
                      {navigation.map((item) => (
                        <SheetClose key={item.name} asChild>
                          <Link
                            href={item.href}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                              pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                  {/* Note: SheetContent automatically adds a close button (X) */}
                  {/* which also benefits from having an associated SheetTitle */}
                </SheetContent>
              </Sheet>
              {/* --- End Mobile Menu Sheet --- */}
            </div>
          </div>
        </div>
      </header>

      {/* WhatsApp Floating Action Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <FaWhatsapp className="h-6 w-6" />
      </a>
    </>
  )
}
