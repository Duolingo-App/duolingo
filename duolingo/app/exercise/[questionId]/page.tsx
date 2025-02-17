"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ProgressBar } from "@/app/components/ui/progress-bar";
import { Mascot } from "@/app/components/ui/mascot";

export default function ExercisePage() {
  const router = useRouter();
  const params = useParams();
  const { questionId } = params;
  
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

  // Fetch the question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question');
        }
        const data = await response.json();
        setQuestion({
          ...data,
          options: data.options, // Already parsed in the API route
        });
        setError(null);
        setProgress(calculateProgress(questionId));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchQuestion();
  }, [questionId]);

  const handleCheck = () => {
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = question.correctAnswer.trim().toLowerCase();

    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    
    // Save attempt to database
    fetch(`/api/questions/${questionId}/attempt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isCorrect: correct,
        answer
      })
    });
  };

  const handleNext = () => {
    const nextQuestionId = getNextQuestionId(questionId);
    router.push(`/exercise/${nextQuestionId}`);
  };

  const calculateProgress = (currentId) => {
    const totalQuestions = 10; // Replace with actual total
    return (parseInt(currentId) / totalQuestions) * 100;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Question not found</div>;

  const renderExerciseContent = () => {
    switch (question.type) {
      case 'TRANSLATE':
        return (
          <div className="space-y-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
              placeholder="Type your translation..."
              rows={3}
              disabled={isCorrect !== null}
            />
            {question.hint && (
              <p className="text-sm text-gray-500">💡 {question.hint}</p>
            )}
          </div>
        );

      case 'SELECT':
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setAnswer(option)}
                className={`p-4 rounded-xl border-2 transition-all text-lg font-medium
                  ${answer === option 
                    ? isCorrect !== null
                      ? option === question.correctAnswer
                        ? "border-[#58CC02] bg-[#58CC02]/10"
                        : "border-red-500 bg-red-50"
                      : "border-[#58CC02] bg-[#58CC02]/10"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                disabled={isCorrect !== null}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'ARRANGE':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {question.options.map((word, index) => (
                <button
                  key={index}
                  onClick={() => setAnswer(prev => `${prev} ${word}`.trim())}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-lg"
                  disabled={isCorrect !== null}
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="p-4 min-h-[60px] border rounded-xl bg-gray-50 text-lg">
              {answer}
            </div>
            <button
              onClick={() => setAnswer("")}
              className="text-sm text-gray-500 hover:text-gray-700"
              disabled={isCorrect !== null}
            >
              Clear
            </button>
          </div>
        );

      case 'LISTEN':
        return (
          <div className="space-y-4">
            <button
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(question.text);
                utterance.lang = 'fr-FR'; // Set language to French
                speechSynthesis.speak(utterance);
              }}
              className="w-full p-4 bg-white border rounded-xl flex items-center justify-center gap-2 text-lg hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
              </svg>
              Play Question
            </button>

            {/* Button to play the correct answer */}
            <button
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(question.correctAnswer);
                utterance.lang = 'fr-FR'; // Set language to French
                speechSynthesis.speak(utterance);
              }}
              className="w-full p-4 bg-white border rounded-xl flex items-center justify-center gap-2 text-lg hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
              </svg>
              Play Correct Answer
            </button>

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#58CC02]"
              placeholder="Type what you hear..."
              disabled={isCorrect !== null}
            />
          </div>
        );

      case 'SPEAK':
        if (!('webkitSpeechRecognition' in window)) {
          return (
            <div className="text-center">
              <p className="text-red-500">Speech recognition is not supported in your browser. Please use Chrome or Edge.</p>
            </div>
          );
        }

        return (
          <div className="text-center">
            <button
              onClick={() => {
                const recognition = new (window as any).webkitSpeechRecognition();
                recognition.lang = 'fr-FR';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                // Set a timeout for no speech
                const timeout = setTimeout(() => {
                  recognition.stop();
                  alert('No speech detected. Please try again.');
                }, 5000); // 5 seconds

                recognition.start();

                recognition.onresult = (event: any) => {
                  clearTimeout(timeout); // Clear the timeout if speech is detected
                  const spokenText = event.results[0][0].transcript;
                  setAnswer(spokenText);
                };

                recognition.onerror = (event: any) => {
                  clearTimeout(timeout); // Clear the timeout on error
                  console.error('Speech recognition error:', event.error);
                  if (event.error === 'no-speech') {
                    alert('No speech detected. Please try again.');
                  }
                };
              }}
              className="w-20 h-20 rounded-full bg-[#58CC02] text-white flex items-center justify-center hover:bg-[#58CC02]/90"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <p className="mt-4 text-gray-500">Click to start speaking</p>
            {answer && (
              <p className="mt-4 text-lg">You said: <span className="font-semibold">{answer}</span></p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <header className="fixed top-0 left-0 right-0 bg-gray-50 z-10">
          <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <ProgressBar progress={progress} className="bg-[#58CC02]/20" />
            </div>
          </div>
        </header>

        <main className="pt-20">
          <Mascot message={question.text} className="bg-[#58CC02]/10 p-4 rounded-xl" />

          <div className="my-8">
            {renderExerciseContent()}
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
            <div className="max-w-2xl mx-auto">
              {isCorrect === null ? (
                <Button
                  onClick={handleCheck}
                  className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white font-bold py-3 rounded-xl text-lg"
                  disabled={!answer}
                >
                  CHECK
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white font-bold py-3 rounded-xl text-lg"
                >
                  CONTINUE
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function getNextQuestionId(currentId) {
  return parseInt(currentId) + 1;
}