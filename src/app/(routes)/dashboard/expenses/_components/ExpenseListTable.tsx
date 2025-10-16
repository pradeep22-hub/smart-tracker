import { Divide, Trash } from 'lucide-react'
import React from 'react'

const ExpenseListTable = ({expensesList}:{expensesList:any}) => {
  return (
    <div className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Date</h2>
            <h2>Action</h2>
        </div>
        {expensesList.map((expenses,index)=>(
            <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2>
                <Trash className='text-red-500'/>
            </h2>
        </div>
        ))}
      
    </div>
  )
}

export default ExpenseListTable
