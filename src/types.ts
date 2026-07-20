export type TabType = 'beranda' | 'pendahuluan' | 'materi' | 'eksplorasi' | 'kuis' | 'tugas' | 'penutup';

export interface StudentProfile {
  name: string;
  className: string;
}

export type QuestionType = 'pilihan_ganda' | 'pilihan_ganda_kompleks' | 'benar_salah' | 'menjodohkan';

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  stimulus: string;
  questionText: string;
  imageSvg?: string; // Optional SVG markup or custom visual drawing descriptor
}

export interface PilihanGandaQuestion extends BaseQuestion {
  type: 'pilihan_ganda';
  options: string[];
  correctAnswer: string; // e.g. "A", "B", "C", "D"
}

export interface PilihanGandaKompleksQuestion extends BaseQuestion {
  type: 'pilihan_ganda_kompleks';
  options: string[];
  correctAnswers: string[]; // List of correct choices e.g. ["A", "C"]
}

export interface BenarSalahStatement {
  statement: string;
  isCorrect: boolean; // true = Benar, false = Salah
}

export interface BenarSalahQuestion extends BaseQuestion {
  type: 'benar_salah';
  statements: BenarSalahStatement[];
}

export interface MenjodohkanPair {
  premise: string; // Left side
  response: string; // Right side / correct answer
}

export interface MenjodohkanQuestion extends BaseQuestion {
  type: 'menjodohkan';
  pairs: MenjodohkanPair[];
  responseOptions: string[]; // All possible options on the right side for dropdown selection
}

export type QuizQuestion = PilihanGandaQuestion | PilihanGandaKompleksQuestion | BenarSalahQuestion | MenjodohkanQuestion;

export interface UserAnswer {
  questionId: number;
  pilihanGanda?: string; // e.g. "B"
  pilihanGandaKompleks?: string[]; // e.g. ["A", "C"]
  benarSalah?: boolean[]; // matching index of statements
  menjodohkan?: string[]; // matching index of pairs (selected responses)
  isRaguRagu: boolean;
}

export interface QuizResult {
  student: StudentProfile;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalAnswered: number;
  unansweredCount: number;
  flaggedCount: number;
  timestamp: string;
}

export interface AiQuestion {
  id: number;
  questionText: string;
  hint: string;
  correctAnswer: string;
  explanation: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface AiAssignment {
  title: string;
  instructions: string;
  questions: AiQuestion[];
}
