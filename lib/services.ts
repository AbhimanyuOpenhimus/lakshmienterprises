import type { Service } from "./types"

export const services: Service[] = [
  {
    id: "installation",
    title: "CCTV Installation",
    description: "Professional installation of surveillance systems for homes and businesses.",
    icon: "video",
    features: [
      "Expert technicians with years of experience",
      "Proper camera placement for maximum coverage",
      "Clean and concealed wiring installation",
      "System testing and configuration",
      "User training on system operation",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Repair",
    description: "Regular maintenance and prompt repair services to keep your systems running.",
    icon: "tool",
    features: [
      "Scheduled maintenance plans",
      "Emergency repair services",
      "Camera cleaning and adjustment",
      "Software updates and upgrades",
      "System health monitoring",
    ],
  },
  {
    id: "consultation",
    title: "Security Consultation",
    description: "Expert advice on the best security solutions for your specific needs.",
    icon: "shield",
    features: [
      "On-site security assessment",
      "Customized security planning",
      "Budget-friendly recommendations",
      "Integration with existing systems",
      "Future-proof security solutions",
    ],
  },
  {
    id: "remote-monitoring",
    title: "Remote Monitoring",
    description: "24/7 monitoring services to keep an eye on your property when you can't.",
    icon: "eye",
    features: [
      "Real-time surveillance monitoring",
      "Immediate alert notifications",
      "Monthly activity reports",
      "Video verification of alarms",
      "Reduced false alarm rates",
    ],
  },
]
