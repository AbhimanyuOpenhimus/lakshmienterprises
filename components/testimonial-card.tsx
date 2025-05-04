import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/ui/star-rating"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  content: string
  rating?: number
}

export function TestimonialCard({ name, role, image, content, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <div className="mr-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
            {rating && <StarRating rating={rating} size="sm" className="mt-1" />}
          </div>
        </div>
        <p className="text-gray-700 italic">&ldquo;{content}&rdquo;</p>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
