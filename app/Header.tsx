'use client'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {NavLink} from "react-router-dom";
import * as React from "react";
import "./style/Header.css";
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'


export default function Header() {
  
  const pathname = usePathname()
  return (

  <div className='header_top' >
 <div className='flex align font_s head_1'>
      <h1>AI Diary</h1>
      <button onClick={() => signOut()}>  <div className='space1'><  FormatListBulletedIcon /> </div></button>
    </div>
    <div  className=' flexer font_s head_2 ' >
    
       <Link href='/today' className='link link_today' > <h1 className={pathname === '/today' ? 'active space ' : 'space'}>Today</h1></Link>
       <Link href='/entries' className='link'> <h1 className={pathname === '/entries' ? 'active space ' : 'space'}>Entries</h1></Link>
       <Link href='/explore' className='link'>  <h1 className={pathname === '/explore' ? 'active space ' : 'space'}>Explore</h1></Link>
      </div>
      <Link href='/newentry' className='link'> <div className='Add_icon'><AddIcon/></div></Link>
      </div>
  )
}

