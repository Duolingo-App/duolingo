"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { ProgressBar } from "@/app/components/ui/progress-bar"
import { Mascot } from "@/app/components/ui/mascot"
import { HeartDepletedModal } from "@/app/components/ui/HeartDepletedModal"
import { useParams } from "next/navigation"
type ExerciseType = "TRANSLATE" | "SELECT" | "ARRANGE" | "SPEAK" | "LISTEN"
console.log("useParam")
interface Exercise {
  id: string|number
  type: ExerciseType
  text: string
  correctAnswer: string | string[]
  options?: string[]
  hint?: string
}

export default function ExercisePage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExercise, setCurrentExercise] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isHeartDepleted, setIsHeartDepleted] = useState(false);
 const { questionId } = useParams<{ questionId: string }>()
        console.log(questionId)
  const progress = ((currentExercise + 1) / exercises.length) * 100

  // Fetch exercises from the backend
  useEffect(() => {
    if (!questionId) {
      setError("Question ID is missing")
      setIsLoading(false)
      return
    }
  
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch questions")
        }
        const data = await response.json()
  console.log("data",data)
        // Transform backend data to match the Exercise type
        const transformedExercises: Exercise[] = data.questions.map((question: any) => ({
          id: question.id,
          type: question.type,
          text: question.text,
          correctAnswer: question.correctAnswer,
          options: question.options,
          hint: question.hint
        }))
  
        setExercises(transformedExercises)
      } catch (error) {
        setError("Failed to load exercises. Please try again.")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchExercises()
  }, [questionId])
  const handleCheck = async() => {
    const current = exercises[currentExercise]
    
    // Normalize both answer and correctAnswer by trimming whitespace, converting to lowercase
    const normalizedAnswer = answer.trim().toLowerCase()
    const normalizedCorrectAnswer = Array.isArray(current.correctAnswer)
      ? current.correctAnswer.join(" ").trim().toLowerCase()
      : current.correctAnswer.trim().toLowerCase()
    
    // Check if the normalized answer is included in the correct answer or vice versa
    const correct = normalizedAnswer.includes(normalizedCorrectAnswer) || 
                   normalizedCorrectAnswer.includes(normalizedAnswer)
    
    setIsCorrect(correct)
   
    // Send the attempt to the backend
  try {
    const response = await fetch("/api/user-attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Replace with the actual user ID (e.g., from authentication)
        questionId: current.id, // Use the question ID from the current exercise
        isCorrect: correct,
      }),
    });
    console.log("ejaaa",response)
    const data = await response;
    if (response.status === 403) {
      setIsHeartDepleted(true)
        } else {
      console.log("Attempt recorded:", data);
    }
  } catch (error) {
    console.error("Error recording attempt:", error);
  }
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
    console.log("exercise",exercise)
    if (!exercise) {
      return <div>Loading exercise...</div>
    }
    switch (exercise.type) {
      case "TRANSLATE":
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
  
      case "SELECT":
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
  
        case "ARRANGE":
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
  
        case "LISTEN":
        return (
          <div className="space-y-4">
            <button 
              onClick={() => {
                // Create and configure TTS
                const speech = new SpeechSynthesisUtterance(exercise.text);
                speech.rate = 0.8; // Slow down the speech a bit
                speech.pitch = 1;
                speech.lang = 'fr-FR';
                
                // Play the audio
                window.speechSynthesis.cancel(); // Stop any current speech
                window.speechSynthesis.speak(speech);
              }}
              className="w-full p-4 bg-white border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
              </svg>
              Listen Again
            </button>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 border rounded-xl"
              placeholder="Write what you hear..."
              rows={2}
            />
          </div>
        )
  
      case "SPEAK":
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
  
      default:
        return null
    }
  }
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
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
          <Mascot message={exercises[currentExercise]?.text}/>
  
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
              <HeartDepletedModal isOpen={isHeartDepleted} onClose={() => setIsHeartDepleted(false)} />
  
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}