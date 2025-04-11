import { Shield, PenToolIcon as Tool, Video, Eye, Laptop, Printer, Cpu, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/lib/services"

export default function ServicesPage() {
  // Map service icons to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "video":
        return <Video className="h-6 w-6" />
      case "tool":
        return <Tool className="h-6 w-6" />
      case "shield":
        return <Shield className="h-6 w-6" />
      case "eye":
        return <Eye className="h-6 w-6" />
      default:
        return <Shield className="h-6 w-6" />
    }
  }

  // Additional IT services
  const itServices = [
    {
      id: "computer-repair",
      title: "Computer/Laptop Repair",
      description: "Professional repair services for all types of computers and laptops.",
      icon: <Laptop className="h-6 w-6" />,
      features: [
        "Hardware troubleshooting and repair",
        "Software installation and updates",
        "Virus and malware removal",
        "Data recovery services",
        "Performance optimization",
      ],
    },
    {
      id: "printer-repair",
      title: "Printer Repair",
      description: "Expert repair and maintenance for all printer brands and models.",
      icon: <Printer className="h-6 w-6" />,
      features: [
        "Printer hardware repair",
        "Print quality troubleshooting",
        "Driver installation and updates",
        "Network printer setup",
        "Regular maintenance services",
      ],
    },
    {
      id: "cartridge-refill",
      title: "Cartridge Refill",
      description: "Cost-effective cartridge refilling services for all printer types.",
      icon: <Tool className="h-6 w-6" />,
      features: [
        "Ink cartridge refilling",
        "Toner cartridge refilling",
        "Quality ink and toner materials",
        "Quick turnaround time",
        "Eco-friendly recycling options",
      ],
    },
    {
      id: "pc-assembly",
      title: "New PC Assembly",
      description: "Custom PC building services tailored to your specific requirements.",
      icon: <Cpu className="h-6 w-6" />,
      features: [
        "Custom PC configuration",
        "High-quality component selection",
        "Performance optimization",
        "Operating system installation",
        "Software setup and configuration",
      ],
    },
    {
      id: "biometric",
      title: "Biometric Installation",
      description: "Professional installation of biometric security systems for businesses.",
      icon: <Fingerprint className="h-6 w-6" />,
      features: [
        "Fingerprint scanner installation",
        "Facial recognition systems",
        "Integration with existing security",
        "Software configuration and training",
        "Ongoing technical support",
      ],
    },
  ]

  return (
    <main className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Lakshmi Enterprises offers comprehensive security solutions from consultation to installation and
            maintenance.
          </p>
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
            <a href="#services">Explore Our Services</a>
          </Button>
        </div>
      </section>

      {/* CCTV Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">CCTV & Security Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                className="overflow-hidden bg-white hover:shadow-lg transition-shadow"
              >
                <CardHeader className="bg-blue-50 flex flex-row items-center gap-4">
                  <div className="bg-blue-700 text-white p-3 rounded-lg">{getIcon(service.icon)}</div>
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* IT Services Section */}
      <section id="it-services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">IT Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itServices.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                className="overflow-hidden bg-gray-50 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="bg-blue-50 flex flex-row items-center gap-4">
                  <div className="bg-blue-700 text-white p-3 rounded-lg">{service.icon}</div>
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Service Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-600">We discuss your needs and assess your requirements.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Planning</h3>
              <p className="text-gray-600">We design a customized solution for your specific requirements.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600">Our expert technicians install and configure your system.</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-gray-600">We provide ongoing maintenance and technical support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to schedule a consultation with our experts.
          </p>
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
            <a href="/contact">Contact Us Now</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
