'use client'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "@/app/style/NewEntry.css";
import Link from 'next/link';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import Textbox from '@/app/components/Textbox';
export default function NewEntry() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/') 
    },
  });
  return (
    
 <div className='App'>  <div className='head'> <Link href="/today" className = "spaceleft link"><ArrowBackIosIcon/>New Entry  </Link>
 
  </div>

  <div className='textbox_main'> 

<Textbox/>


  </div>
    </div>
  )
}