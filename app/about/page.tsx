import { Award, Clock, MapPin, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About Lakshmi Enterprises</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted partner for premium CCTV and security solutions since 2022.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                In 2022, Lakshmi Enterprises was founded with the ambition to bring high-quality security solutions to
                households and businesses alike. From our modest beginnings in Siwan City, we have risen to become one
                of the region's most reliable security system providers.
              </p>
              <p className="text-gray-700 mb-4">
                Under the visionary leadership of Mr. Ishwar Dayal Singh, our founder, Lakshmi Enterprises has
                flourished. With his deep expertise in electronics and unwavering commitment to customer satisfaction,
                he established the business on the principles of quality, integrity, and innovation. Recognizing the
                growing need for dependable security systems in Siwan and its surroundings, Mr. Singh turned his passion
                into action, reshaping how people approach safety.
              </p>
              <p className="text-gray-700">
                Today, we serve customers across Siwan, Bihar and beyond, providing cutting-edge surveillance systems
                that blend efficiency with simplicity. At Lakshmi Enterprises, we remain dedicated to our core values,
                ensuring that every space we protect offers peace of mind and security.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://cdn.britannica.com/72/239172-050-AAC4A91E/security-CCTV-camera.jpg"
                  alt="Lakshmi Enterprises Store"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-yellow-500 rounded-full opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">4+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">5000+</div>
              <p className="text-gray-600">Installations Completed</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">24/7</div>
              <p className="text-gray-600">Technical Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">We never compromise on the quality of our products and services.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with honesty, transparency, and ethical practices.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-gray-600">We are committed to being dependable and consistent in all we do.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">We are dedicated to making our community safer and more secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Founder</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img src="/images/founder.png" alt="Ishwar Dayal Singh" className="w-full h-full object-cover" />
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-2">Ishwar Dayal Singh</h3>
                  <p className="text-blue-700 font-semibold mb-4">Founder & CEO</p>
                  <p className="text-gray-700 mb-4">
                    Mr. Ishwar Dayal Singh founded Lakshmi Enterprises in 2022 with a vision to provide high-quality
                    security solutions to homes and businesses in Siwan and surrounding areas. With his background in
                    electronics and a passion for customer service, he has built Lakshmi Enterprises into a trusted name
                    in security systems.
                  </p>
                  <p className="text-gray-700">
                    Under his leadership, the company has grown steadily, focusing on quality products, expert
                    installation, and exceptional customer support. Mr. Singh personally oversees many installations and
                    is committed to ensuring every customer receives the best possible service and security solution for
                    their needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
