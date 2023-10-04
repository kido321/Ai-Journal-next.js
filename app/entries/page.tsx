'use client'
import React from 'react'
import Link from 'next/link';
import {useState} from 'react'
import Header from '@/app/Header';
import NewEntriesCard from '@/app/NewEntriesCard';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import { db } from '@/app/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import XEntry from '../components/XEntry';
import AddIcon from '@mui/icons-material/Add';
import "@/app/style/Entry.css";
import "../style/Header.css";




export default function Entries() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/') 
    },
  });

  const [entries] = useCollection(

   session && query (collection(db, 'user' , session?.user?.email! , 'entries'),orderBy ('CreatedAt','desc'))
 
  );
  const f = new Intl.DateTimeFormat('en', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });


  return (
    <div className='App'>
      
      <Header/> 
      {/* <NewEntriesCard/> */}
      {entries?.docs.length === 0  && (<NewEntriesCard/>) }
     <div className='mb-40'> {entries?.docs.map((entry) => (
       
        <XEntry key={entry.id} text={entry.data().Entry_summary} date={f.format(entry.data().CreatedAt.toDate())} time={entry.data().CreatedAt.toDate().getHours()} id={entry.id} entryMess={entry.data().Entry} />
      ))}</div>
    <div className='space_bottom'> </div>
    </div>
  );

}


