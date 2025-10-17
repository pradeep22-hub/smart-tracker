import { Divide, PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../budgets/_components/budgetItem';

function CardInfo({budgetList}:{budgetList:any}){
  const [totalBudget, setTotalBudget]=useState(0);
  const [totalSpend, setTotalSpend]=useState(0);
  useEffect(()=>{
     if (budgetList && budgetList.length > 0){budgetList&&calculateCardInfo();}
    
    
  },[budgetList])
  const calculateCardInfo=()=>{
    type Budgetitem = {
  amount: number | string;
  totalSpend: number | string;
};
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element:Budgetitem)=> {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + Number(element.totalSpend)
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    console.log(345, totalSpend_);
    console.log("budgetList:", budgetList);


  }
  return (
    <div>
      {budgetList?.length>0?
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      <div className='p-7 border rounded-lg flex  justify-between'>
        <div>
            <h2 className='font-sm'>Total Budget</h2>
            <h2 className='font-2xl font-bold'>Nrs.{totalBudget}</h2>
        </div>
        <PiggyBank className='bg-green-400 p-3 h-12 w-12 rounded-full text-white'/>
      </div>
      <div className='p-7 border rounded-lg flex  justify-between'>
        <div>
            <h2 className='font-sm'>Total Spend</h2>
            <h2 className='font-2xl font-bold'>Nrs.{totalSpend}</h2>
        </div>
        <ReceiptText className='bg-green-400 p-3 h-12 w-12 rounded-full text-white'/>
      </div>
      <div className='p-7 border rounded-lg flex  justify-between'>
        <div>
            <h2 className='font-sm'>No. of Budgets</h2>
            <h2 className='font-2xl font-bold'>{budgetList?.length}</h2>
        </div>
        <Wallet className='bg-green-400 p-3 h-12 w-12 rounded-full text-white'/>
      </div>
    </div>
    :
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {
        [1,2,3].map((item,index)=>(
            <div className='h-[150px] w-full bg-slate-200 animate-pulse rounded-lg'>

            </div>

        )
      )
      }

    </div>
}
    
    </div>
  )
}

export default CardInfo
