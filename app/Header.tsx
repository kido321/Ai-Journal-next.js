'use client'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {NavLink} from "react-router-dom";
import * as React from "react";
import "./style/Header.css";
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"

export default function Header() {
  
  const pathname = usePathname()
  return (
    
  <div className='header_top' >
 <div className='flex align font_s head_1'>
      <h1>AI Diary</h1>

    
      <Popover >
  <PopoverTrigger className=" space1"><FormatListBulletedIcon/></PopoverTrigger>
  <PopoverContent className="pop"><button className='logout_buttonn' onClick={() => signOut()}> Sign Out</button></PopoverContent>
                </Popover>
    </div>
    <div  className=' flexer font_s head_2 ' >
    
       <Link href='/today' className='link link_today' > <h1 className={pathname === '/today' ? 'active space ' : 'space'}>Today</h1></Link>
       <Link href='/entries' className='link'> <h1 className={pathname === '/entries' ? 'active space ' : 'space'}>Entries</h1></Link>
       <Link href='/explore' className='link'>  <h1 className={pathname === '/explore' ? 'active space ' : 'space'}>Explore</h1></Link>
      </div>
     <div className='cont'><Link href='/newentry' className='Add_icon'><AddIcon/></Link></div> 
      </div>
  )
}

