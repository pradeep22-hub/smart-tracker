'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'



const Header = () => {
  const {user, isSignedIn} = useUser();
  return (
    <div className='p-5 flex justify-between align-center border shadow-md'>
        <img src="logo.jpg" alt="" width={80} height={80}/>
        { isSignedIn? <UserButton/> : 
        <Link href='/sign-in'>
          <Button >Get Started</Button>
        </Link>

        } 
        
    </div>
  )
}

export default Header