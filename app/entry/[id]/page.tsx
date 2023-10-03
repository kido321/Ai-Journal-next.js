'use client'
import React, { useState } from 'react'
import Header from '@/app/Header';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useContext  , useRef , useEffect} from 'react'
import { MessagesContext } from '../../context/messages'
import "@/app/style/Entry.css"; 
import "@/app/style/Textbox.css";
import Summary from "../../components/Summary"
import { useRouter } from 'next/navigation';
import {db} from '@/app/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { JournalTypeContext  } from '../../context/journalType'
import { Timestamp } from 'firebase/firestore'




 
function page() {
  const current_timestamp = Timestamp.fromDate(new Date())

  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  }); 
  const f = new Intl.DateTimeFormat('en', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const { setJournalWritenornot, setmessagecountfunction} = useContext(JournalTypeContext)

  
  const {messages ,  cleanMessages} = useContext(MessagesContext)
  const messageArr = [...messages];
  const [message, setMessage] = useState([messageArr]);
  const x = [...messageArr]
  x.reverse();
  const entryjson = JSON.stringify(message);
  const Route = useRouter();
  const redirectto = async () => {
    let x = [...messageArr]
    x.reverse();
      const doc = await addDoc( collection(db, 'user', session?.user?.email! ,'entries'),{
        UserId: session?.user?.email!,
        Entry_summary: x[0].text,
        CreatedAt:serverTimestamp(),
        Entry:entryjson,
      });
      cleanMessages();
      setmessagecountfunction(0)
      setJournalWritenornot(false);
      Route.push('/entries');
  }
  return (
    
    <div className="App">
      <div className='Entry_head'>Entry Summary</div> 
        <Summary date={f.format(current_timestamp.toDate())} />
      <button className='Entry_button' onClick={redirectto}>Continue</button>
  </div>
 
  )
}

export default page