import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import  Login from './components/Login'
import {NextAuthProvider} from './Provider'
import "./style/App.css";
import QueryClientProvider from './components/Providers'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
    
      <body className={inter.className}>
        
      
      <main ><NextAuthProvider><QueryClientProvider>{children}</QueryClientProvider></NextAuthProvider></main>
     
      
      </body>
  
    </html>
  )
}
