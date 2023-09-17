'use client'
import './style/App.css';
import Header from './Header';
import NewEntriesCard from './NewEntriesCard';
import Entries from './Entries';
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login from './components/Login'
import {useSession} from 'next-auth/react'

export default function Home() {
  const session  = useSession();
  console.log(session);
  return (
    <div>
    {!session.data ? (
      <Login />
    ) : (
     
    <div className="App bg-black">
      <Header/>
    </div>
 )} </div> 
  )
}

    {/* <BrowserRouter>
<Routes>
  <Route path="/" element={<Header />}/>
    <Route path="/entries" element={<Entries/>} />
    <Route path="/explore" element={<Header />} />
    <Route path="/entries/newentry" element={<NewEntry />} />
</Routes>
</BrowserRouter> */}