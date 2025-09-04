'use client'
import React, { useEffect } from 'react'
import Sidenavbar from './_components/sidenavbar'
import Dashboard from './page'
import Dashboardheader from './_components/dashboardheader'
import { db } from '../../../../utils/dbConfig'
import { Budgets } from '../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'



const Dashboardlayout = ({children}: {children: any}) => {
  const {user}= useUser();
  const router=useRouter();

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);
  const checkUserBudget=  async() =>{
    const result = await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!));
    console.log(result);
    if(result?.length==0)
    {
      router.replace('/dashboard/budgets')
    }
  }
  return (
  <div>
    <div className='fixed md:w-64 hidden md:block border shadow-md p-5'>
        <Sidenavbar/>
    </div>
    <div className='md:ml-64'>
        <Dashboardheader/>
        {children}
    </div>
    </div>
  )
}

export default Dashboardlayout