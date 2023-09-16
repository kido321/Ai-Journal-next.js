'use client'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {NavLink} from "react-router-dom";
import * as React from "react";
import "./Header.css";
import Link from 'next/link';


export default function Header() {
  return (
  <div className='header_top' >
 <div className='flex align font_s head_1'>
      <h1>AI Diary</h1>
      <div className='space1'><  FormatListBulletedIcon /> </div>
    </div>
    <div  className=' flexer font_s head_2' >
       <Link href='/today' className='link' > <h1 className="space">Today</h1></Link>
       <Link href='/entris' className='link'> <h1 className="space">Entries</h1></Link>
       <Link href='/explore' className='link'>  <h1 className="space">Explore</h1></Link>
      </div>
      </div>
  )
}