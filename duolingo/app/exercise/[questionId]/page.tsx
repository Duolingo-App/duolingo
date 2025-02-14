"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const { questionId } = params;
  
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestion(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching question:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!question) return <div>Question not found</div>;

  const handleCheck = () => {
    const correct = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    setIsCorrect(correct);
  };

  const handleNext = () => {
    const nextId = parseInt(questionId) + 1;
    router.push(`/exercise/${nextId}`);
  };

  return (
    <div className="min-h-screen flex flex-col gap-y-4 max-w-xl mx-auto p-6">
      <Progress value={100} className="w-full" />
      
      <div className="flex-1 mt-12">
        <h2 className="text-xl font-medium">{question.text}</h2>

        {question.type === "select" && (
          <div className="mt-6 flex flex-col gap-y-2">
            {question.options?.map((option) => (
              <Button
                key={option}
                onClick={() => setAnswer(option)}
                variant={answer === option ? "default" : "outline"}
                className="w-full p-6"
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {question.type === "translate" && (
          <div className="mt-6">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 border rounded-lg"
              placeholder="Type your answer here..."
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="mt-auto">
        {isCorrect === null ? (
          <Button
            onClick={handleCheck}
            className="w-full p-6"
            disabled={!answer}
          >
            Check
          </Button>
        ) : (
          <div className="flex flex-col gap-y-4">
            <div
              className={`p-6 rounded-lg flex items-center gap-x-4 ${
                isCorrect ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {isCorrect ? (
                <>
                  <Check /> Correct!
                </>
              ) : (
                <>
                  <X /> Incorrect. The answer is: {question.correctAnswer}
                </>
              )}
            </div>
            <Button onClick={handleNext} className="w-full p-6">
              Next <ArrowRight className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 