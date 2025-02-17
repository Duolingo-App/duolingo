"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Language {
  id: number;
  name: string;
  flag: string;
}

export default function Page() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/sign-in')
          return
        }

        const response = await fetch('/api/languages', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch languages')
        }

        const data = await response.json()
        setLanguages(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching languages:', error)
        setError('Failed to load languages. Please try again.')
        setIsLoading(false)
      }
    }

    fetchLanguages()
  }, [router])

  const handleLanguageSelect = async (languageId: number) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/sign-in')
        return
      }

      const response = await fetch('/api/user/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ languageId }),
      })

      if (!response.ok) {
        throw new Error('Failed to update user language')
      }

      router.push('/onboarding')
    } catch (error) {
      console.error('Error selecting language:', error)
      setError('Failed to select language. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading languages...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1080px] px-6 py-4">
        <header className="flex items-center justify-between">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg"
            alt="Duolingo"
            className="h-[45px] w-auto"
          />
        </header>

        <main className="mt-16">
          <h1 className="mb-16 text-center text-[32px] font-bold text-[#4B4B4B]">Choisis une langue</h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {languages.map((language) => (
              <div 
                key={language.id} 
                onClick={() => handleLanguageSelect(language.id)}
                className="language-card cursor-pointer rounded-[20px] bg-white p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="flag-container mb-4">
                    <span className="text-[40px]">{language.flag}</span>  
                  </div>
                  <h2 className="mb-1 text-[20px] font-bold text-[#4B4B4B]">{language.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
