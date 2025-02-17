export type LessonStatus = "locked" | "active" | "completed" | "legendary"
export type UnitColor = "green" | "purple" | "teal"

export interface Lesson {
  id: string
  status: LessonStatus
  position: number
  xpPoints ?: number
  title: string
}

export interface Unit {
  id: string
  title: string
  description: string
  color: UnitColor
  lessons: Lesson[]
  guidebook?: boolean
}

export interface XPProgress {
  daily: number
  goal: number
  history: Array<{
    date: string
    xp: number
  }>
}

export interface question {
  id: number;
  lessonId: number;
  text: string;
  options: string; // JSON string
  correctAnswer: string;
  type: string;
}
