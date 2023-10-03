'use client'
import { createContext, useState , useContext , useEffect, use } from 'react'
import { nanoid } from 'nanoid'
import { MessageSc } from '@/lib/validators/message'

import { JournalTypeContext } from './journalType'
import { journal_prompt  , first_question} from '@/constant/journalprompt'







export const MessagesContext = createContext<{
  messages: MessageSc[]
  isMessageUpdating: boolean
  addMessage: (message: MessageSc) => void
  removeMessage: (id: string) => void
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void
  setIsMessageUpdating: (isUpdating: boolean) => void
  cleanMessages: () => void
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
  cleanMessages: () => {},

})


export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const {question} = useContext(JournalTypeContext);



  let defaultValue = [
    {
      id: nanoid(),
      text: question,
      isUserMessage: false,
    },
  ]

 

  // console.log(defaultValue);
  // console.log(journalType);
  const [messages, setMessages] = useState(defaultValue)
  useEffect(() => {
    defaultValue = [
      {
        id: nanoid(),
        text: question,
        isUserMessage: false,
      },
    ]
    setMessages(defaultValue)

    

  }, [question])
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)
  const addMessage = (message: MessageSc) => {
    setMessages((prev) => [...prev, message])
  }

  const cleanMessages = () => {
    setMessages(defaultValue)
  }


  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) }
        }
        return message
      })
    )
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
        cleanMessages,
      }}>
      {children}
    </MessagesContext.Provider>
  )
}