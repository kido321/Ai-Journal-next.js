'use client'
import { createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { journal_prompt } from '@/constant/journalprompt'
import { dream_journal } from '@/constant/dream_journal'



export const JournalTypeContext = createContext<{
    journalType: string
    setJournalTypes: (text: string) => void
}>({
    setJournalTypes: () => {},
    journalType: journal_prompt,
})



export function JournalProvider({ children }: { children: React.ReactNode }) {
    const [journalType , setJournalType] = useState(journal_prompt);

    function setJournalTypes(text: string) {
        setJournalType(text);
    }



  return (
    <JournalTypeContext.Provider
      value={{
        journalType,
        setJournalTypes,
      }}>
      {children}
    </JournalTypeContext.Provider>
  )
}