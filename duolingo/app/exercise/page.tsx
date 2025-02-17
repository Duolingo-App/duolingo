 "use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { ProgressBar } from "@/app/components/ui/progress-bar"
import { Mascot } from "@/app/components/ui/mascot"

type ExerciseType = "translate" | "select" | "arrange" | "speak" | "listen"

interface Exercise {
  type: ExerciseType
  question: string
  correctAnswer: string | string[]
  options?: string[]
  hint?: string
}

const exercises: Exercise[] = [
  {
    type: "translate",
    question: "Translate this sentence: 'The cat drinks milk'",
    correctAnswer: "Le chat boit du lait",
    hint: "Remember: chat = cat, boit = drinks",
  },
  {
    type: "select",
    question: "Select the correct translation for 'Hello'",
    correctAnswer: "Bonjour",
    options: ["Au revoir", "Bonjour", "Merci", "S'il vous plaît"],
  },
  {
    type: "arrange",
    question: "Arrange the words to form 'I am a student'",
    correctAnswer: ["I", "am", "a", "student"],
    options: ["am", "student", "I", "a"],
  },
  {
    type: "listen",
    question: "Type what you hear",
    correctAnswer: "Good morning",
  },


]

export default function ExercisePage() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const progress = ((currentExercise + 1) / exercises.length) * 100

  const handleCheck = () => {
    const current = exercises[currentExercise]
    const correct = Array.isArray(current.correctAnswer)
      ? answer === current.correctAnswer.join(" ")
      : answer === current.correctAnswer
    setIsCorrect(correct)
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
      setAnswer("")
      setIsCorrect(null)
    }
  }

  const renderExerciseContent = () => {
    const exercise = exercises[currentExercise]

    switch (exercise.type) {
      case "translate":
        return (
          <div className="space-y-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 border rounded-xl"
              placeholder="Type your translation..."
              rows={3}
            />
            {exercise.hint && (
              <p className="text-sm text-gray-500">💡 {exercise.hint}</p>
            )}
          </div>
        )

      case "select":
        return (
          <div className="grid grid-cols-2 gap-4">
            {exercise.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setAnswer(option)}
                className={`p-4 rounded-xl border-2 transition-all
                  ${answer === option 
                    ? "border-[#58CC02] bg-[#58CC02]/10" 
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        )

      case "arrange":
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {exercise.options?.map((word, index) => (
                <button
                  key={index}
                  onClick={() => setAnswer(prev => `${prev} ${word}`.trim())}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="p-4 min-h-[60px] border rounded-xl bg-gray-50">
              {answer}
            </div>
            <button
              onClick={() => setAnswer("")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        )
        case "listen":
            return (
              <div className="space-y-4">
                <button className="w-full p-4 bg-white border rounded-xl flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                  </svg>
                  Play Audio
                </button>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-4 border rounded-xl"
                  placeholder="Type what you hear..."
                />
              </div>
            )

      case "speak":
        return (
          <div className="text-center">
            <button className="w-20 h-20 rounded-full bg-[#58CC02] text-white flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <p className="mt-4 text-gray-500">Click to start speaking</p>
          </div>
        )

     
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <header className="fixed top-0 left-0 right-0 bg-gray-50 z-10">
          <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <ProgressBar progress={progress} />
            </div>
          </div>
        </header>

        <main className="pt-20">
          <Mascot message={exercises[currentExercise].question} />

          <div className="my-8">
            {renderExerciseContent()}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
            <div className="max-w-2xl mx-auto">
              {isCorrect === null ? (
                <Button
                  onClick={handleCheck}
                  className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white"
                  disabled={!answer}
                >
                  VÉRIFIER
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white"
                >
                  CONTINUER
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}