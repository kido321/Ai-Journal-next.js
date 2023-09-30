'use client'
import React from 'react'
import {useState} from 'react'
import Header from '@/app/Header';
import NewEntriesCard from '@/app/NewEntriesCard';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import { db } from '@/app/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import XEntry from '../components/XEntry';




function page() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/') 
    },
  });

  const [entries] = useCollection(

   session && query (collection(db, 'user' , session?.user?.email! , 'entries'),orderBy ('CreatedAt','asc'))
 
  );
  let today = new Date();
  console.log(today.getHours());



  return (
    <div className='App'>
      <Header/> 
      {/* <NewEntriesCard/> */}
     <div> {entries?.docs.map((entry) => (
       
        <XEntry key={entry.id} text={entry.data().Entry_summary} date={entry.data().CreatedAt.toDate().toUTCString()} time={entry.data().CreatedAt.toDate().toUTCString()} id={entry.id} entryMess={entry.data().Entry} />
      ))}</div>
      {/* {entries?.docs?.length <  && (
      )} */}
    </div>
  );

}
export default page

