import "@/app/style/Textbox.css"
import React, { useState ,useEffect , useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Openai from '@/app/openai';

let Questions = ["Whats on your mind?" , "How are you feeling?", "What are you thinking about?", "What, excited about?", "What are you grateful about?" ];


export default function Textbox() {
    const bottomRef = useRef<null | HTMLElement>(null);
    const [Message, setMessage] = useState("");
    const [Messages, setMessages] = useState<string[]>([]);
    const [Question, setQuestion] = useState(Questions);
    const [count, setCount] = useState(0);
    
    const addmessage = () => {
        setMessages(Messages.concat(Message));
        
      };
      async function main() {
        const completion = await Openai.chat.completions.create({
          messages: [{ role: 'user', content: 'you are a journal writing expert i need you to help me write a journal. you will do that by asking me series of questions that will help you analyze how my day was going whats on my mind something like that and when i tell you to write the journal you will do that and ask the questions one by one.' }],
          model: 'gpt-3.5-turbo',
        });
        const response = completion.choices[0].message.content;
        console.log(response);
      }



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
    main();
  }, []);

    return (
        <div className="tbody">
      {divs}
      {Message && <button className=" buttonn font-bold " onClick={handleinput} >Continue -></button>}
      </div>
    )
  }
  