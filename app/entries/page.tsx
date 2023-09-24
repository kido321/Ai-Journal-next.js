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



  return (
    <div className='App'>
      <Header/> 
      {/* <NewEntriesCard/> */}
     <div> {entries?.docs.map((entry) => (
       
        <XEntry key={entry.id} text={entry.data().Entry} time="tuesday september 20" id={entry.id}/>
      ))}</div>
      {entries && entries.docs.length > 0 && (
        <XEntry text='lknkj,n' time='tuesday september 20' id='fsfdcsdcsa'/>
      )}
    </div>
  );

}
export default page

