'use client'
import React, { use } from 'react'
import {useState ,useEffect} from 'react'
import '../style/XEntry.css'
import { db } from '@/firebase';
import { SessionContext } from 'next-auth/react';
import { doc, deleteDoc, Timestamp } from "firebase/firestore"
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MessageArraySchema } from '@/lib/validators/message'
import Entrydisplay from './Entrydisplay';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/app/components/ui/popover"
import { ChatGPTMessage } from '@/lib/openai-stream';

type Props = {
    text: string;
    id:string;
    date: string;
    entryMess: string;
    time: string;
}

function XEntry({text , date , id  , entryMess ,time}: Props) {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/') 
        },
      });
      
      
 


      const [active ,setActive] = useState(false);

      const removeEntry = async (id:string)=>{
        console.log(id)
        await deleteDoc(doc(db, "user", session?.user?.email!, "entries", id))
        
        }  
        //console.log(typeof(time))

    return (
        <div className='xentry_card'>
            
            <div className='threeButtons'>
                <div className='twoButtons'>
                    <button className={active ? 'summaryButton2' : 'summaryButton'} onClick={()=> setActive(true)}>Summary</button>
                    <button className={!active ? 'entryButton2' : 'entryButton'} onClick={()=> setActive(false)}>Entry</button>
                    </div>

                    <div className='xentry_date'><div className='check'>{date}</div></div>
               
                <div>
    <div >
                <Popover >
  <PopoverTrigger><ExpandMoreIcon className='arrowButton' /></PopoverTrigger>
  <PopoverContent className="pop"><button className='deleteButton' onClick={()=>removeEntry(id)}> Delete</button></PopoverContent>
                </Popover>
                </div>
                      
                    
                </div>
            </div>
            <div className='xentry_box'>
             {!active ?  <Entrydisplay entryMess={entryMess}/> : <div className='xentry_text'>{text}</div>}
           </div>
        </div>
    );
}

export default XEntry
 