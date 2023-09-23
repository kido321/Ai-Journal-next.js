'use client'
import React from 'react'
import {useState} from 'react'
import Header from '@/app/Header';
import NewEntriesCard from '@/app/NewEntriesCard';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';
import { db } from '@/app/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import XEntry from '../components/XEntry';



function page() {

const {data: session} = useSession({
  required: true,
  onUnauthenticated() {
      redirect('/') 
  },
});



  return (
    
 <div className='App'>  <Header/> 
 {/* <NewEntriesCard/> */}
  <XEntry text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum orci non diam vestibulum, a porta enim mattis. Suspendisse semper at purus a dapibus. Cras ultrices quis est at sollicitudin. Praesent cursus tristique turpis. Pellentesque eget ultrices metus. Etiam at leo arcu. In eu urna quis enim pretium faucibus pretium eget turpis. Vestibulum commodo mi vitae risus varius laoreet. Integer auctor sem convallis, auctor mauris at, consequat erat. Integer rutrum, orci in porta egestas, nibh justo ultrices lectus, in accumsan ex nisl non odio. Maecenas lobortis justo non faucibus semper. In viverra augue turpis. Maecenas finibus maximus leo, eu efficitur ante ultricies quis. Donec ut lacus vehicula, ultrices ex euismod, euismod mauris. Sed aliquet, odio non gravida luctus, velit massa scelerisque orci, eget rhoncus eros eros ut augue.

 ut auctor.

' time='tuesday september 20' id='fsfdcsdcsa'/>
    </div>
  )
}
export default page

