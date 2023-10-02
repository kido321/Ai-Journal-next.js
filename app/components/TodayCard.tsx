'use client'
import React , {useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import "@/app/style/entries.css";
import Link from 'next/link';




export default function TodayCard() {

  return (
    <div className= "todaycard">
    <div className='todaycard_c'><h3>How was your day? Take a moment to reflect on your day and keep your streak going!</h3>
    <Link href ="/newentry" className=''><div className='todaycard_add'>Check in</div></Link>
 
    </div>
    </div>
  )
}
