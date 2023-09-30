import React ,{useEffect , useState} from 'react'
import type { MessageArraySchema ,MessageSchema} from '@/lib/validators/message'
import "@/app/style/message.css";

type Props = {
    entryMess: string;
}

function Entrydisplay({entryMess}: Props) {
    

const [arr , setArr] = useState([]);
useEffect(() => {
    refreshData();

}, 
[entryMess]);

const refreshData = async ()  => {

         const parsedData = await JSON.parse(entryMess);
            setArr(parsedData[0]);
          }   
        

      
    
    return (
        <div>
            <div>
                { arr?.map((message: {isUserMessage: boolean | null ; id: string | null ; text: string| null; }) => (
                    <div key={message.id}>
                        <div className={message.isUserMessage ? "user_message_edisplay" : "Ai_message_edisplay"}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
                }

export default Entrydisplay

