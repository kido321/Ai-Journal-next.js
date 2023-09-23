'use client'
import React, { use } from 'react'
import Header from '@/app/Header';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useContext  , useRef , useEffect} from 'react'
import { MessagesContext } from '../context/messages'
import "@/app/style/Entry.css";
import "@/app/style/Textbox.css";


function Summary() {
  const {messages} = useContext(MessagesContext)
  const messageArr = [...messages];
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  });

    const x = [...messageArr]
    x.reverse();
  return (
    <div className='entry_card'>
    <div className='Entry_date'>sunday october 23</div>
    <div className='Entry_text'>
{x[0].text}
  </div>
  </div>
  )
}

export default Summary