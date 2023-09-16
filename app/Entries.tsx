'use client'
import React from 'react'
import Header from './Header';
import NewEntriesCard from './NewEntriesCard';
import "./textbox.css";
import {NavLink} from "react-router-dom";
export default function Entries() {
  return (
    
 <div>  <Header/> <NewEntriesCard/>
    </div>
  )
}