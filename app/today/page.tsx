'use client'
import React from 'react'
import Header from '@/app/Header';
import '../style/calendar.css'
import '../style/calendar.css'
import CardAndCalander from '../components/CardAndCalander';


function page() {



  const [selected, setSelected] = React.useState<Date>();

  return (
    
    <div className='App'>
<Header/>
<CardAndCalander/>
    </div>
  )
}

export default page