'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { db } from '../../../../../../utils/dbConfig'
import { Budgets } from '../../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

function EditBudget({budgetInfo,refreshData}:{budgetInfo:any,refreshData:any}){
    const [emojiIcon,setEmojiIcon]=useState(budgetInfo?.icon);
      const [openEmojiPicker, setOpenEmojiPicker]=useState(false);
      const [name, setName]=useState(budgetInfo?.name);
      const [amount, setAmount]=useState(budgetInfo?.amount);
      const {user}=useUser();
      useEffect(()=>{
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon)
        }
        
      },[budgetInfo])

      const onUpdateBudget=async()=>{
        const result = await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result){
            refreshData();
            toast('budget updated')
        }
      }
  return (
    <div>
       
             <Dialog>
  <DialogTrigger asChild>
    <Button className='flex gap'><PenBox/>Edit</Button>
      </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update budget</DialogTitle>
      <DialogDescription>
       <div className='mt-5'>
        <Button variant={'outline'} className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
        <div className='absolute z-20'>
          <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) =>{setEmojiIcon(e.emoji)
            setOpenEmojiPicker(false)
          }}/>
        </div>
        <div className='mt-2'>
          <h2 className='text-black font-medium my-1'>My budget</h2>
          <Input placeholder='e.g. Food' defaultValue={budgetInfo?.name} onChange={(e)=> setName(e.target.value)}
          />
        </div>
        <div className='mt-2'>
          <h2 className='text-black font-medium'>Budget Amount</h2>
          <Input type='number' defaultValue={budgetInfo?.amount} placeholder='e.g. 5000'
          onChange={(e) => setAmount(e.target.value)} />
        </div>
        <Button 
        disabled={!(name&&amount)}
        onClick={() => onUpdateBudget()}
        className='mt-2 w-full bg-green-600'>Update Budget</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default EditBudget
