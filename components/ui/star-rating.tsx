import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating, size = "md", className = "" }: StarRatingProps) {
  // Ensure rating is between 0 and 5
  const safeRating = Math.max(0, Math.min(5, rating || 0))

  // Size classes
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const starSize = sizeClasses[size]

  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= safeRating
              ? "text-yellow-500 fill-yellow-500"
              : star - 0.5 <= safeRating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default StarRating
