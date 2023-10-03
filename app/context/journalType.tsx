'use client'
import { createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { journal_prompt , first_question} from '@/constant/journalprompt'
import { dream_journal } from '@/constant/dream_journal'



export const JournalTypeContext = createContext<{
    question: string
    setQuestions: (text: string) => void
    journalWriten: boolean
    setJournalWritenornot: (bool: boolean) => void
    messagecount: number
    setmessagecountfunction: (num: number) => void
}>({
    setQuestions: () => {},
    question:'',
    journalWriten: false,
    setJournalWritenornot: () => {},
    messagecount: 0,
    setmessagecountfunction: (num: number) => {},
})



export function JournalProvider({ children }: { children: React.ReactNode }) {
    const [question , setQuestion] = useState(first_question);

    function setQuestions(text: string) {
      setQuestion(text);
    }
    const [journalWriten , setJournalWriten] = useState(false);
    const [messagecount , setmessagecount] = useState(0);

    function setJournalWritenornot(bool : boolean) {
      setJournalWriten(bool);
    }
    function setmessagecountfunction(num : number) {
      setmessagecount(num);
    }


  return (
    <JournalTypeContext.Provider
      value={{
        messagecount,
        setmessagecountfunction,
        question,
        setQuestions,
        journalWriten,
        setJournalWritenornot,
      }}>
      {children}
    </JournalTypeContext.Provider>
  )
}