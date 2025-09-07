"use client"
import React, { useEffect } from 'react'
import Createbudget from './createbudget'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'


const Budgetlist = () => {
  const [budgetList, setBudgetList] = useState([])
  const {user}=useUser()
  useEffect(() => {
    user && getBudgetList()
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress!))
    .groupBy(Budgets.id);
    setBudgetList(result)
  }
  return (
    <div>
      <div className='mt-7'>
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3'>
            <Createbudget/>
            {budgetList.map((item:any)=>(
              <div key={item.id} className='border p-5 m-3 rounded-lg shadow-md'>
                <div className='flex justify-between items-center'>
        </div>

      </div>
    </div>
  )
}

export default Budgetlist
