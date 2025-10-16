'use client'
import React, { useEffect, useState } from 'react'
import { Budgets, Expenses } from '../../../../../../utils/schema'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../../../../../../utils/dbConfig'
import { Divide, User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/budgetItem'
import AddExpenses from '../_components/AddExpenses'
import ExpenseListTable from '../_components/ExpenseListTable'

function ExpensesScreen({params}:{params:any}){
    const {user}=useUser();
    const [budgetInfo, setbudgetInfo]=useState();
    const [expensesList, setExpensesList]=useState([]);
    useEffect (()=>{

        user && getBudgetInfo();
        

    }, [user])

    const getBudgetInfo=async()=>{
         const result = await db.select({
              ...getTableColumns(Budgets),
              totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
              totalItem:sql `count(${Expenses.id})`.mapWith(Number)
            }).from(Budgets)
            .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
            .where(
              and
              (eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress!),
               eq(Budgets.id, params.id)))
            .groupBy(Budgets.id)
            setbudgetInfo(result[0]);
            getExpensesList();
            
            
    }

    const getExpensesList=async()=>{
       const id = params.id;
      const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result)

    }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo?<BudgetItem budget={budgetInfo}
        />:
        <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>}
        <AddExpenses budgetId={params.id}
        user={user}
        refreshData={()=>getBudgetInfo()}/>
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}/>
      </div>
    </div>
  )
}

export default ExpensesScreen
