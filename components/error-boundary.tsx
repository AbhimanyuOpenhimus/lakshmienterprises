"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error)
      setHasError(true)
      // Prevent the error from bubbling up
      event.preventDefault()
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">
            We're sorry for the inconvenience. Please try refreshing the page or contact us directly.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
            >
              Refresh Page
            </button>
            <a href="/" className="border border-blue-700 text-blue-700 px-4 py-2 rounded hover:bg-blue-50">
              Go to Home
            </a>
          </div>
        </div>
      </main>
    )
  }

  return <>{children}</>
}
