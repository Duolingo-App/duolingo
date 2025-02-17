"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/Button"
import { ProgressBar } from "@/app/components/ui/progress-bar"
import { OptionCard } from "@/app/components/ui/option-card"
import { Mascot } from "@/app/components/ui/mascot"
import { ArrowLeft, Book, Compass } from "lucide-react"

const steps = [
  {
    question: "Pourquoi veux-tu apprendre l'anglais ?",
    options: [
      { title: "M'aider dans mes études", icon: "📚" },
      { title: "Me divertir", icon: "🎮" },
      { title: "Tisser des liens", icon: "🤝" },
      { title: "Booster ma carrière", icon: "💼" },
      { title: "Préparer un voyage", icon: "✈️" },
      { title: "Bien utiliser mon temps", icon: "⏰" },
      { title: "Autre", icon: "..." },
    ],
  },
  {
    question: "Quel est ton objectif quotidien ?",
    options: [
      { title: "5 min/jour", subtitle: "Tranquille" },
      { title: "10 min/jour", subtitle: "Normal" },
      { title: "15 min/jour", subtitle: "Intensif" },
      { title: "20 min/jour", subtitle: "Extrême" },
    ],
  },
  {
    question: "Tu connais déjà un peu l'anglais ?",
    options: [
      { title: "Je débute en anglais", progress: 20 },
      { title: "Je connais quelques mots de base", progress: 40 },
      { title: "Je peux avoir une conversation simple", progress: 60 },
      { title: "Je peux parler de sujets variés", progress: 80 },
      { title: "Je peux parler de nombreux sujets de façon approfondie", progress: 100 },
    ],
  },
  {
    question: "Allez, on va trouver par où tu dois commencer !",
    options: [
      {
        title: "Commencer par les bases",
        subtitle: "Fais la leçon la plus facile du cours d'anglais",
        icon: <Book className="w-6 h-6 text-[#58CC02]" />,
      },
      {
        title: "Déterminer mon niveau",
        subtitle: "Laisse Duo trouver le meilleur point de départ pour toi",
        icon: <Compass className="w-6 h-6 text-[#58CC02]" />,
      },
    ],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<number[]>([])

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      router.push('/homepage')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSelect = (index: number) => {
    setSelections((prev) => {
      const newSelections = [...prev]
      newSelections[currentStep] = index
      return newSelections
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <header className="fixed top-0 left-0 right-0 bg-gray-50 z-10">
          <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
              <button onClick={handleBack} className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <ProgressBar progress={progress} />
            </div>
          </div>
        </header>

        <main className="pt-20">
          <Mascot message={steps[currentStep].question} />

          <div className="space-y-4">
            {steps[currentStep].options.map((option, index) => (
              <OptionCard
                key={index}
                icon={option.icon}
                title={option.title}
                subtitle={option.subtitle}
                selected={selections[currentStep] === index}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
            <div className="max-w-2xl mx-auto">
              <Button
                onClick={handleNext}
                className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white"
                disabled={selections[currentStep] === undefined}
              >
                CONTINUER
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

