'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import "@/app/style/login.css";


export default function Login() {
  return (
    <div className="log_in">
       <button className="text-black font-bold text-3xl animate-pulse login_button" onClick={() => signIn("google")}><div className='login_text'>Sign in</div><img className='google_image' src={'/google.png'}/></button>
    </div>

  )
}
