import { Button } from "@/app/components/ui/button";

interface ButtonExerciseProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

export const ButtonExercise = ({ onClick, disabled, label }: ButtonExerciseProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-xl ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#58CC02] hover:bg-[#4CAF50]"
      } text-white font-bold`}
    >
      {label}
    </Button>
  );
};