import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { userAgent } from 'next/server';
import { useState } from 'react';
import {getSession, useSession, signOut} from "next-auth/react";
const inter = Inter({ subsets: ['latin'] })
import { AppProps } from 'next/app';

export default function Home() {
  const {data:session}=useSession()

  function handleLogout(){
    signOut()
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>ToDo Page</title>
      </Head>
      {session ? User({session, handleLogout}) : Guest()}
    </div>
  )
}

//Guest component
function Guest(){
   return (
    <main className="container mx-auto text-center py-20">
        <h3 className='text-4xl font-bold'>TODO Page</h3>
        <div className='flex justify center'>
          <Link legacyBehavior href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-black text-gray-50'>Sign in</a></Link>
        </div>
      </main>
   )
}

// Authorized user
function User({ session,handleLogout }:any){
  return (
   <main>
       <div className='details w-3/4 flex flex-col gap-10'>
        <h5 className='ml-10 my-10'>Hello</h5>
        <h1 className='text-4xl font-bold py-4 pt-9'>{session.user.name}</h1>
        <p className='w-3/4'>Good to see you here!</p>
        <h4 className='w-3/4'>Tasks for the day !</h4>
       </div>
       <div className='flex justify-center'>
        <button onClick={handleLogout} className='mt-5 px-10 py-1 rounded-sm bg-black text-gray-50'>Logout</button>
       </div>
     </main>
  )
}

export async function getServerSideProps({req}:any) {
  const session = await getSession({req})
  if(!session){
    return {
      redirect:{
        destination:'/login',
        permanent:false
      }
    }
  }
  return {
    props:{session}
  }
}