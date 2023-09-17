'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import "@/app/style/login.css";


export default function Login() {
  return (
    <div className="log_in">
        <button className="text-black font-bold text-3xl animate-pulse" onClick={() => signIn("google")}>login</button>
    </div>

  )
}
