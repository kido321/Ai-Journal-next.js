'use client'
import React from 'react'
import '../style/XEntry.css'
import { db } from '@/firebase';
import { SessionContext } from 'next-auth/react';
import { doc, deleteDoc } from "firebase/firestore"
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/app/components/ui/popover"

type Props = {
    text: string;
    id:string;
    time: string;
}




function XEntry({text , time , id }: Props) {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/') 
        },
      });
      const removeEntry = async (id:string)=>{
        console.log(id)
        await deleteDoc(doc(db, "user", session?.user?.email!, "entries", id))
        
        }  
        

    return (
        <div className='xentry_card'>
            <div className='xentry_date'>{time}</div>
            <div className='threeButtons'>
                <div className='twoButtons'>
                    <button className='summaryButton'>Summary</button>
                    <button className='entryButton'>Entry</button>
                </div>
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
                <div className='xentry_text'>{text}</div>
            </div>
        </div>
    );
}

export default XEntry