import React from 'react'
import { useContext } from 'react'
import { MessagesContext } from '../context/messages'
import "@/app/style/message.css";

function Chatmesseges() {
const {messages} = useContext(MessagesContext)
const messageArr = [...messages];
console.log(messageArr);

  return (

   <div>
    {
   
        messageArr.map((message: {
            isUserMessage: any; id: React.Key | null | undefined; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; 
}) => (
            <div key={message.id}>
                <div className= {message.isUserMessage ? "user_message" : "Ai_message"   
                  }
                  >{message.text}</div>
            </div>
        ))
    }
    </div> 
  )
}

export default Chatmesseges