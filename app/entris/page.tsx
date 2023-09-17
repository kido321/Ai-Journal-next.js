'use client'
import React from 'react'
import Header from '@/app/Header';
import NewEntriesCard from '@/app/NewEntriesCard';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';

function page() {

const {data: session} = useSession({
  required: true,
  onUnauthenticated() {
      redirect('/') 
  },
});



  return (
    
 <div className='App'>  <Header/> <NewEntriesCard/>
    </div>
  )
}
export default page

