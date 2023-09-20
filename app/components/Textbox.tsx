import "@/app/style/Textbox.css"
import React, { useState ,useEffect , useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Openai from '@/app/openai';
import { useMutation } from "@tanstack/react-query";
import { MessageSc  } from "@/lib/validators/message";
import { nanoid } from 'nanoid'


let Questions = ["Whats on your mind?" , "How are you feeling?", "What are you thinking about?", "What, excited about?", "What are you grateful about?" ];



export default function Textbox() {

    const { mutate: sendMessage, isLoading } = useMutation({
        mutationKey: ['sendMessage'],
        // include message to later use it in onMutate
        mutationFn: async (_message: MessageSc) => {
          const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: [_message] }),
          })
    
          return response.body
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error('No stream')
            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false
            while (!done) {
                const { value, done: _done } = await reader.read()
                done = _done
                if (value) {
                    const message = decoder.decode(value)
                    console.log(message)
                }
                }
          console.log('message sent');
       
        },
       
      })


    const bottomRef = useRef<null | HTMLElement>(null);
    const [Message, setMessage] = useState("");
    const [Messages, setMessages] = useState<string[]>([]);
    const [Question, setQuestion] = useState(Questions);
    const [count, setCount] = useState(0);
    
    const addmessage = () => {

        const message: MessageSc = {
            id: nanoid(),
            text: Message,
            isUserMessage: true,
        }
        sendMessage(message);

        setMessages(Messages.concat(Message));
        
      };     
      useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth"});

        console.log(Messages);
      }, [Messages]);

    const handlecount = () => {
        setCount(count + 1);
      };
      const divs = Array.from({ length: count }, (_, i) => (
        <div>
            <div ref={bottomRef} className="text-black question bottom-3px">{Question[i]}</div>
      <TextareaAutosize  className="input" placeholder="WRITE . . . ." onChange={e => setMessage(e.target.value)}/> </div>
      ));
const handleinput = () => { 
    handlecount();
    addmessage();
    console.log(Messages);
    setMessage("");
};

useEffect(() => {
    handlecount();

  }, []);

  return (
        <div className="tbody">
      {divs}
      {Message && <button className=" buttonn font-bold " onClick={handleinput} >Continue -></button>}
      </div>
    )
  }
  