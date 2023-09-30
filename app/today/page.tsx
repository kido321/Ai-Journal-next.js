'use client'
import React, {use, useState , useEffect} from 'react'
import Header from '@/app/Header';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import TodayCard from '../components/TodayCard';
import '../style/Quote.css'




const Quote = require('inspirational-quotes');

function page() {
  const [quote , getQuote] = useState(Quote.getQuote());
  // useEffect(() => {
   
  //   getQuote(Quote.getQuote());
  // }, [])
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  });
  return (
    <div className='App'>
<Header/>
<TodayCard/>
{/* <div className='quote_card'>
<div className='quote_text'>{quote.text}</div>
<div className='quote_author'>{quote.author}</div>
</div> */}
    </div>
  )
}

export default page