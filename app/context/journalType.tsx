'use client'
import { createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { journal_prompt , first_question} from '@/constant/journalprompt'
import { dream_journal } from '@/constant/dream_journal'



export const JournalTypeContext = createContext<{
    question: string
    setQuestions: (text: string) => void
}>({
    setQuestions: () => {},
    question:'',
})



export function JournalProvider({ children }: { children: React.ReactNode }) {
    const [question , setQuestion] = useState(first_question);

    function setQuestions(text: string) {
      setQuestion(text);
    }



  return (
    <JournalTypeContext.Provider
      value={{
        question,
        setQuestions,
      }}>
      {children}
    </JournalTypeContext.Provider>
  )
}