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
            let newArray = parsedData[0];
            let count = 0;
            if(newArray){
            for (let i = newArray.length-1; i >= 0; i--) {
                if (newArray[i].id === '00000000') {
                    count = i;
                }
            }}
            if(count) {
                newArray = newArray.slice(0  , count-1);
            }
                setArr(newArray);
          }   
;
      
    
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

