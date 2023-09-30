'use client'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import "@/app/style/entries.css";
import Link from 'next/link';



export default function TodayCard() {
  return (
    <div className= "Entriescard Entriescard_c">
    <div className='Entriescard_c'><h3>Check in Today</h3>
    <Link href ="/newentry" className='Entriescard_add '>Whats on your mind?</Link>
 
    </div>
    </div>
  )
}
