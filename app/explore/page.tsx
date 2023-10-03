'use client'
import React ,{useContext} from 'react'
import Header from '@/app/Header';
import {useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import ExploreCard from '../components/ExploreCard';
import '../style/Explore.css'
import { journal_prompt } from '@/constant/journalprompt'
import { gratitude_journal } from '@/constant/gratitude_journal'
import { dream_journal } from '@/constant/dream_journal'
import { morning_journal } from '@/constant/morning_journal'
import { evening_journal } from '@/constant/evening_journal'
import Link from 'next/link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { JournalTypeContext  } from '../context/journalType'





export default function Explore(){
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  });

  const { setQuestions } = useContext(JournalTypeContext)

const clicked = (text: string , question: string) => {
  setQuestions(question);
  const sendJournalType = async (text: string , question: string) => {

    
    const res = await fetch('/api/JournalType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journalType: text }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
    })

  }
}



  return (
    
 <div className='App'>
    <div> <Header/>
    <div className='arrow'><KeyboardArrowLeftIcon /><KeyboardArrowRightIcon/></div>
 <div className='explorecard_box'>

 <Link href='/newentry' className='link'><button onClick={() =>clicked(gratitude_journal , "Can you name 3 things you are grateful for today?")}><ExploreCard bg= "Gratitude"/></button></Link>
 <Link href='/newentry' className='link'><button onClick={() =>clicked(morning_journal , ' What are you grateful for this morning?')}><ExploreCard bg= "Morning"/></button></Link>
 <Link href='/newentry' className='link'><button onClick={() =>clicked(dream_journal, 'Can you describe your dream with as much detail as possible?')}><ExploreCard bg= "Dream"/></button></Link>
 <Link href='/newentry' className='link'><button onClick={() =>clicked(evening_journal , "What's something you're grateful for today?" )}><ExploreCard bg= "Evening"/></button></Link>
  </div>
 </div> 
 </div>
  )
}