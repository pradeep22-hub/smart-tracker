import { Divide, Trash } from 'lucide-react'
import React from 'react'
import { Expenses } from '../../../../../../utils/schema'
import { toast } from 'sonner'
import { eq } from 'drizzle-orm'
import { db } from '../../../../../../utils/dbConfig'

function ExpenseListTable({expensesList,refreshData}:{expensesList:any,refreshData:any}) {
  const deleteExpense=async(expense:any)=>{
    const result = await db.delete(Expenses)
    .where(eq(Expenses.id,expense.id ))
    .returning()

    if(result)
    {
      toast('expenses deleted succesfully')
      refreshData()
    }
  }
  return (
    <div className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2 className='font-bold'>Name</h2>
            <h2 className='font-bold'>Amount</h2>
            <h2 className='font-bold'>Date</h2>
            <h2 className='font-bold'>Action</h2>
        </div>
        {expensesList.map((expenses:any,index:any)=>(
            <div className='grid grid-cols-4 bg-slate-50 p-2'>
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2>
                <Trash className='text-red-500 cursor-pointer'
                onClick={()=>deleteExpense(expenses)}/>
            </h2>
        </div>
        ))}
      
    </div>
  )
}

export default ExpenseListTable
