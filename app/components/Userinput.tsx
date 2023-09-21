'use client'
import React, { useState ,useEffect , useRef ,useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Openai from '@/app/openai';
import { useMutation } from "@tanstack/react-query";
import { MessageSc  } from "@/lib/validators/message";
import { nanoid } from 'nanoid'
import { MessagesContext } from '@/app/context/messages'
import { toast } from 'react-hot-toast'




function Userinput() {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('')
    const {messages} = useContext(MessagesContext);
    const messageArr = [...messages];
    const {
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      } = useContext(MessagesContext)
    
    const { mutate: sendMessage, isLoading } = useMutation({
        mutationKey: ['sendMessage'],
        // include message to later use it in onMutate
        mutationFn: async (messages: MessageSc) => {
          const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: messageArr }),
          })
    
          return response.body
        },
        onMutate(message) {
            addMessage(message)
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error('No stream')
      
            // construct new message to add
            const id = nanoid()
            const responseMessage: MessageSc = {
              id,
              isUserMessage: false,
              text: '',
            }
      
            // add new message to state
            addMessage(responseMessage)
      
            setIsMessageUpdating(true)
      
            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false
      
            while (!done) {
              const { value, done: doneReading } = await reader.read()
              done = doneReading
              const chunkValue = decoder.decode(value)
              updateMessage(id, (prev) => prev + chunkValue)
            }
      
            // clean up
            setIsMessageUpdating(false)
            setInput('')
      
            setTimeout(() => {
              textareaRef.current?.focus()
            }, 10)
          },
          onError: (_, message) => {
            toast.error('Something went wrong. Please try again.')
            removeMessage(message.id)
            textareaRef.current?.focus()
          },
        })
      

    const bottomRef = useRef<null | HTMLElement>(null);
    const [Message, setMessage] = useState("");
    const [count, setCount] = useState(0);
    
    const addmessage = () => {

        const message: MessageSc = {
            id: nanoid(),
            text: Message,
            isUserMessage: true,
        }
        sendMessage(message);        
      };   

      const handleinput = (e: { preventDefault: () => void; }) => { 
        e.preventDefault();
        addmessage();
        setMessage("");

    };

  return (
   <div> <TextareaAutosize  className="input" placeholder="WRITE . . . ." onChange={e => setMessage(e.target.value)}/> 
    {Message && <button className=" buttonn font-bold " onClick={e => handleinput(e)} >Continue -{'>'}</button>}</div>
  )
}

export default Userinput