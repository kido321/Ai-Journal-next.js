'use client'
import React, { useState ,useEffect , useRef ,useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation } from "@tanstack/react-query";
import { MessageSc  } from "@/lib/validators/message";
import { nanoid } from 'nanoid'
import { MessagesContext } from '@/app/context/messages'
import { toast } from 'react-hot-toast'
import {useSession} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';



let Jornalwriten = false;
let thereIsAmessage = false;
function Userinput() {
   const Route = useRouter();
    const session  = useSession();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('')
    const {messages} = useContext(MessagesContext);
    const messageArr = [...messages];
    let texrarea = useRef<HTMLTextAreaElement | null>(null);

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
        thereIsAmessage = true;
        const message: MessageSc = {
            id: nanoid(),
            text: Message,
            isUserMessage: true,
        }
        sendMessage(message);        
      };  
      const addmessagefinal = () => {

        const message: MessageSc = {
            id: "00000000",
            text: "write a summary of how my day went with less than 100 words",
            isUserMessage: true,
        }
        sendMessage(message);        
      };  

      const handleinput = (e: { preventDefault: () => void; }) => { 
        texrarea.current?.focus();
        addmessage();
        setMessage("");

    };
    
  
    const handleEntry = async () => { 
      Jornalwriten = true;
        addmessagefinal();
     };

     const GotoEntry = async () => { 
        Route.push(`/entry/3r3fcre0f4`);
     };
     
  return (

   <div> <TextareaAutosize ref={texrarea} value={Message} className="input" placeholder="WRITE . . . ." onChange={e => setMessage(e.target.value)}  /> 
    <div className = "buttons">{(Message || thereIsAmessage) && <button className=" buttonn font-bold " onClick={e => handleinput(e)} >Go Deeper 
    </button>}{(!Message && thereIsAmessage) && (!Jornalwriten) && <Button className=" button2 font-bold " variant="outline" onClick={handleEntry}>Write Jornal</Button>} { (Jornalwriten) && <Button className=" button3 font-bold " variant="outline" onClick={GotoEntry}>Finish Entery</Button>} </div></div>
  )
}

export default Userinput