'use client'
import React, {use, useState , useEffect} from 'react'
import TodayCard from '../components/TodayCard';
import '../style/calendar.css'
import { Calendar } from "@/app/components/ui/calendar"
import { Timestamp } from 'firebase/firestore'





function CardAndCalander() {
  const current_timestamp = Timestamp.fromDate(new Date())

    const [selected, setSelected] = React.useState<Date>();
    useEffect(() => {
    setSelected(current_timestamp.toDate());
    }, []);
  return (
    <div>
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
    className="rounded-md border calendar"
  />
</div>
</div>
        </div>
  )
}

export default CardAndCalander