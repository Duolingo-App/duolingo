"use client"


import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const languages = [
  { id: "en", name: "Anglais", members: "15,6 M membres", flag: "🇺🇸" },
  { id: "es", name: "Espagnol", members: "4,81 M membres", flag: "🇪🇸" },
  { id: "it", name: "Italien", members: "2,28 M membres", flag: "🇮🇹" },
  { id: "de", name: "Allemand", members: "1,76 M membres", flag: "🇩🇪" },
  { id: "pt", name: "Portugais", members: "1,03 M membres", flag: "🇧🇷" },
]

const languageOptions = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "sv", name: "svenska", flag: "🇸🇪" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "th", name: "ภาษาไทย", flag: "🇹🇭" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "uk", name: "Українською", flag: "🇺🇦" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)

  
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1080px] px-6 py-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/f92d5f2f7d56636846861c458c0d0b6c.svg"
            alt="Duolingo"
            className="h-[45px] w-auto"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-[14px] text-[#777777] hover:text-[#4b4b4b]"
          >
            LANGUE DU SITE : FRANÇAIS
            <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </header>

        {/* Main Content */}
        <main className="mt-16">
          <h1 className="mb-16 text-center text-[32px] font-bold text-[#4B4B4B]">Choisis une langue</h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {languages.map((language) => (
              <div key={language.id} className="language-card cursor-pointer rounded-[20px] bg-white p-6">
                <div className="flex flex-col items-center">
                  <div className="flag-container mb-4">
                  
                  <span className="text-[40px]">{language.flag}</span>  
                  </div>
                  <Link href="/onboarding">       <h2 className="mb-1 text-[20px] font-bold text-[#4B4B4B]">{language.name}</h2>  </Link>
                  <p className="text-[14px] text-[#777777]">{language.members}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Language Selection Dropdown */}
          {isOpen && (
            <div className="absolute right-6 top-14 z-50 mt-2 w-[320px] rounded-[16px] border border-[#E5E5E5] bg-white p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-[#F7F7F7]"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-[14px] text-[#4B4B4B]">{lang.name}</span>
                  </button>


                ))}
              </div>

          
            </div>
          )}
        </main>


      </div>
    </div>
  )
}

