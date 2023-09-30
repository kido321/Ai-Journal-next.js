'use client'
import React ,{useContext} from 'react'
import Header from '@/app/Header';
import {useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import ExploreCard from '../components/ExploreCard';
import '../style/Explore.css'
import { JournalTypeContext  } from '../context/journalType'
import { journal_prompt } from '@/constant/journalprompt'
import { gratitude_journal } from '@/constant/gratitude_journal'
import { dream_journal } from '@/constant/dream_journal'
import { morning_journal } from '@/constant/morning_journal'
import { evening_journal } from '@/constant/evening_journal'
import Link from 'next/link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Entries() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  });

  const {journalType , setJournalTypes  } = useContext(JournalTypeContext)


  const sendJournalType = async (text: string) => {
    const res = await fetch('/api/JournalType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journalType: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setJournalTypes(data.journalType);
      })
      .catch((error) => {
        console.error('Error:', error);
    })
    console.log("res")
    console.log(res);

  }




  return (
    
 <div className='App'>
    <div> <Header/>
    <div className='arow'><KeyboardArrowLeftIcon /><KeyboardArrowRightIcon/></div>
 <div className='explorecard_box'>

 <Link href='/newentry' className='link'><button onClick={() =>sendJournalType(gratitude_journal)}><ExploreCard bg= "Gratitude"/></button></Link>
 <Link href='/newentry' className='link'><button onClick={() =>sendJournalType(morning_journal)}><ExploreCard bg= "Morning"/></button></Link>
 <Link href='/newentry' className='link'><button onClick={() =>sendJournalType(dream_journal)}><ExploreCard bg= "Dream"/></button></Link>
 <Link href='/newentry' className='link'><button onClick={() =>sendJournalType(evening_journal)}><ExploreCard bg= "Evening"/></button></Link>
  </div>
 </div> 
 </div>
  )
}