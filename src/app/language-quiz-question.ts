// data format:
// { phrase: "hola", "options": ["hello", "goodbye", "wait"], "answer": "hello" }
export interface LanguageQuizQuestion {
  phrase: string;
  options: string[];
  answer: string;
}
