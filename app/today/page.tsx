'use client'
import React, {use, useState , useEffect} from 'react'
import Header from '@/app/Header';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import TodayCard from '../components/TodayCard';
import '../style/calendar.css'
import { Calendar } from "@/app/components/ui/calendar"
import '../style/calendar.css'




const Quote = require('inspirational-quotes');

function page() {
  const [quote , getQuote] = useState(Quote.getQuote());
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  // useEffect(() => {
   
  //   getQuote(Quote.getQuote());
  // }, [])
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
    
  });
  const [selected, setSelected] = React.useState<Date>();

  return (
    
    <div className='App'>
<Header/>
<div className='cal_card'>
<TodayCard/>
{/* <div className='quote_card'>
<div className='quote_text'>{quote.text}</div>
<div className='quote_author'>{quote.author}</div>
</div> */}
<div className='calendar_box'>
<Calendar
    mode="single"
    selected={selected}
    onSelect={setSelected}
    className="rounded-md border calendar "
  />
</div>
</div>
    </div>
  )
}

export default page