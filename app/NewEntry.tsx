'use client'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./style/NewEntry.css";
import {NavLink} from "react-router-dom";
export default function NewEntry() {
  return (
    
 <div>  <div className='head'> <NavLink to="/today"className = "spaceleft link"><ArrowBackIosIcon/>New Entry  </NavLink>
  </div><div className='textbox_main'> 
  </div>
    </div>
  )
}
