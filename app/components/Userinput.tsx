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
import { JournalTypeContext  } from '../context/journalType'
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreateIcon from '@mui/icons-material/Create';





  function Userinput() {

  const {journalWriten, setJournalWritenornot, messagecount , setmessagecountfunction} = useContext(JournalTypeContext);
  
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
   
    const [Message, setMessage] = useState("");
    const [count, setCount] = useState(0);
    
    const addmessage = () => {
        const message: MessageSc = {
            id: nanoid(),
            text: Message,
            isUserMessage: true,
        }
        sendMessage(message);  
        console.log("SENDIND MESSAGE");      
      };  
      const addmessagefinal = () => {

        const message: MessageSc = {
            id: "00000000",
            text: "write a summary of how my day went with less than 100 words",
            isUserMessage: true,
        }
        sendMessage(message);        
      };  

      const handleinput = () => { 
        texrarea.current?.focus();
        addmessage();
        setMessage("");

    };
    
  
    const handleEntry = async () => { 
        if (Message) {
          handleinput();
          setTimeout(after, 3000);
        }
        else{
          after();
        }
       
     };
const after = () => {
     addmessagefinal();
     GotoEntry();
}
     const GotoEntry = async () => { 
        Route.push(`/entry/3r3fg5g6e0f4`);
     };
     
  return (
   <div> <TextareaAutosize ref={texrarea} value={Message} className="input" placeholder="WRITE . . . ." onChange={e => setMessage(e.target.value)}  /> 
    <div > <div className = "buttons"><button className="button1 font-bold" onClick={handleinput} >Countinue
    </button> <Button className=" button2 font-bold " variant="outline" onClick={handleEntry}>Finish Entry<DoneIcon className='ml-2'/></Button></div> </div></div>
  )
}

export default Userinput