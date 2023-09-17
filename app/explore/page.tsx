'use client'
import React from 'react'
import Header from '@/app/Header';
import NewEntriesCard from '@/app/NewEntriesCard';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
export default function Entries() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  });
  return (
    
 <div className='App'>
    <div className='a'> <Header/>
 <p >DSFFDAdsadfasfcaESFFDAdsadfasfcaESFFDAdsadfasfcaEDSFFDAdsadfasfcaESFFDAdsadfasfcaESFFDAdsadfasfcaEDSFFDAdsadfasfcaESFFDAdsadfasfcaESFFDAdsadfasfcaESFFDAdsadfasfcaESFFDAdsadfasfcaEFXF</p>
 </div> 
 </div>
  )
}