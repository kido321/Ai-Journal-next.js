'use client'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import "./style/entries.css";
import Link from 'next/link';



export default function NewEntriesCard() {
  return (
    <div className= "Entriescard Entriescard_c">
    <div className='Entriescard_c'><h3>Add your first Entry</h3>
    <Link href ="/newentry" className='Entriescard_add '>whats on your mind   </Link>
 
    </div>
    </div>
  )
}
