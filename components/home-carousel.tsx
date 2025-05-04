"use client"

import { useEffect } from "react"

export default function HomeCarouselScript() {
  useEffect(() => {
    // Get carousel elements
    const track = document.getElementById("carousel-track")
    const slides = track?.children
    const prevButton = document.getElementById("prev-slide")
    const nextButton = document.getElementById("next-slide")
    const indicators = document.querySelectorAll("[data-index]")
    const carousel = document.getElementById("carousel-container")

    if (!track || !slides || !slides.length || !carousel) return

    let currentIndex = 0
    let slideWidth = carousel.clientWidth // Use container width instead of slide width
    let autoplayInterval: NodeJS.Timeout
    let touchStartX = 0
    let touchEndX = 0
    let isSwiping = false

    // Function to update slide position
    const updateSlidePosition = (index: number) => {
      if (!track) return

      // Update current index
      currentIndex = index

      // Calculate the translation distance
      const translateX = -currentIndex * slideWidth

      // Apply the translation to the track with smooth transition
      track.style.transition = "transform 0.5s ease-in-out"
      track.style.transform = `translateX(${translateX}px)`

      // Update indicators
      indicators.forEach((indicator, i) => {
        if (i === currentIndex) {
          indicator.classList.add("bg-yellow-400", "w-8")
          indicator.classList.remove("bg-white/50")
        } else {
          indicator.classList.remove("bg-yellow-400", "w-8")
          indicator.classList.add("bg-white/50")
        }
      })
    }

    // Function to go to next slide
    const nextSlide = () => {
      if (currentIndex >= slides.length - 1) {
        updateSlidePosition(0)
      } else {
        updateSlidePosition(currentIndex + 1)
      }
    }

    // Function to go to previous slide
    const prevSlide = () => {
      if (currentIndex <= 0) {
        updateSlidePosition(slides.length - 1)
      } else {
        updateSlidePosition(currentIndex - 1)
      }
    }

    // Set up event listeners
    prevButton?.addEventListener("click", (e) => {
      e.preventDefault()
      prevSlide()
      resetAutoplay()
    })

    nextButton?.addEventListener("click", (e) => {
      e.preventDefault()
      nextSlide()
      resetAutoplay()
    })

    // Set up indicator clicks
    indicators.forEach((indicator) => {
      indicator.addEventListener("click", (e) => {
        e.preventDefault()
        const index = Number.parseInt(indicator.getAttribute("data-index") || "0")
        updateSlidePosition(index)
        resetAutoplay()
      })
    })

    // Touch events for mobile swipe
    if (track) {
      // Touch start
      try {
        track.addEventListener(
          "touchstart",
          (e) => {
            touchStartX = e.touches[0].clientX
            isSwiping = true
            // Pause transition during swipe
            track.style.transition = "none"
          },
          { passive: true },
        )

        // Touch move - for real-time dragging effect
        track.addEventListener(
          "touchmove",
          (e) => {
            if (!isSwiping) return

            const currentX = e.touches[0].clientX
            const diff = currentX - touchStartX
            const offset = -currentIndex * slideWidth + diff

            // Limit the drag to the next/prev slide only
            if (Math.abs(diff) < slideWidth) {
              track.style.transform = `translateX(${offset}px)`
            }
          },
          { passive: true },
        )

        // Touch end
        track.addEventListener("touchend", (e) => {
          if (!isSwiping) return

          touchEndX = e.changedTouches[0].clientX
          isSwiping = false

          // Restore transition
          track.style.transition = "transform 0.5s ease-in-out"

          handleSwipe()
        })

        // Touch cancel
        track.addEventListener("touchcancel", () => {
          if (!isSwiping) return

          isSwiping = false
          // Restore transition and position
          track.style.transition = "transform 0.5s ease-in-out"
          updateSlidePosition(currentIndex)
        })
      } catch (error) {
        console.error("Error setting up touch events:", error)
      }
    }

    // Handle swipe
    const handleSwipe = () => {
      const swipeThreshold = slideWidth * 0.2 // 20% of slide width
      const diff = touchEndX - touchStartX

      if (diff < -swipeThreshold) {
        // Swipe left - go to next slide
        nextSlide()
      } else if (diff > swipeThreshold) {
        // Swipe right - go to previous slide
        prevSlide()
      } else {
        // Not enough swipe distance, snap back
        updateSlidePosition(currentIndex)
      }

      resetAutoplay()
    }

    // Function to start autoplay
    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 5000)
    }

    // Function to reset autoplay
    const resetAutoplay = () => {
      clearInterval(autoplayInterval)
      startAutoplay()
    }

    // Handle window resize
    const handleResize = () => {
      if (!carousel) return

      // Update slide width based on container width
      slideWidth = carousel.clientWidth

      // Disable transition temporarily
      track.style.transition = "none"

      // Update position immediately without animation
      track.style.transform = `translateX(${-currentIndex * slideWidth}px)`

      // Re-enable transition after a short delay
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease-in-out"
      }, 50)
    }

    // Add resize listener with debounce
    let resizeTimer: NodeJS.Timeout
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    })

    // Initialize slide width
    handleResize()

    // Start autoplay
    startAutoplay()

    // Clean up event listeners
    return () => {
      prevButton?.removeEventListener("click", prevSlide)
      nextButton?.removeEventListener("click", nextSlide)
      window.removeEventListener("resize", handleResize)
      clearInterval(autoplayInterval)
      clearTimeout(resizeTimer)

      if (track) {
        track.removeEventListener("touchstart", () => {})
        track.removeEventListener("touchmove", () => {})
        track.removeEventListener("touchend", () => {})
        track.removeEventListener("touchcancel", () => {})
      }

      indicators.forEach((indicator) => {
        indicator.removeEventListener("click", () => {})
      })
    }
  }, [])

  return null
}
