'use client'
import React, { use, useEffect, useState } from 'react'
import { Budgets, Expenses } from '../../../../../../utils/schema'
import { and, desc,  eq,  getTableColumns,sql } from 'drizzle-orm'
import { db } from '../../../../../../utils/dbConfig'
import { Trash, User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/budgetItem'
import AddExpenses from '../_components/AddExpenses'
import ExpenseListTable from '../_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'

function ExpensesScreen({params}:{params:any}){
    const {user}=useUser();
    const [budgetInfo, setbudgetInfo]=useState();
    const [expensesList, setExpensesList]=useState([]);
    const route=useRouter();
    
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
      
      const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);

    }

    const deleteBudget=async()=>{
      const deleteExpenseResult=await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning();
      if(deleteExpenseResult)
      {
        const result = await db.delete(Budgets)
      .where(eq(Budgets.id, params.id))
      .returning();
      }
      toast('budget deleted!')
      route.replace('/dashboard/budgets');
      
    }
  return (
    <div className='p-10'>
      <div className='flex justify-between justify-items-center'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>
      <div className='flex justify-center gap-2'>
      <EditBudget budgetInfo={budgetInfo}
      refreshData={()=>getBudgetInfo()}/>
      
        
        <AlertDialog>
  <AlertDialogTrigger asChild><Button className='flex gap-2' variant='destructive'><Trash/>Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your current expenses
        along with your budget.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</div>
      </div>
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
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}/>
      </div>
    </div>
  )
}

export default ExpensesScreen
