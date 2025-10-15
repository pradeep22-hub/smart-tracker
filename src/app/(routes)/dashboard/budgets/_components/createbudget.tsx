"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import  EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Budgets } from '../../../../../../utils/schema'
import { db } from '../../../../../../utils/dbConfig'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

const Createbudget = ({refreshData}:{refreshData:any}) => {
  
  const [emojiIcon,setEmojiIcon]=useState('😀');
  const [openEmojiPicker, setOpenEmojiPicker]=useState(false);
  const [name, setName]=useState("");
  const [amount, setAmount]=useState('');
  const {user}=useUser();
  const onCreateBudget= async() => {
    const result=await db.insert(Budgets)
    .values({
      name:name,
      amount:amount,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      icon:emojiIcon
    }).returning({insertedId:Budgets.id})
    if(result)
  {
    refreshData()
    toast('new budget created')
  }
  }
  
  
  return (
    <div>
     
      <div>
        <Dialog>
  <DialogTrigger asChild><div className='bg-slate-100 p-10 rounded-md
      items-center flex flex-col border-2 border-dashed
      cursor-pointer hover:shadow-md'>
        <h2 className='text-3xl'>+</h2>
        <h2>create my budget</h2>
      </div>
      </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new budget</DialogTitle>
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
          <input placeholder='e.g. Food' onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div className='mt-2'>
          <h2 className='text-black font-medium'>Budget Amount</h2>
          <input type='number' placeholder='e.g. 5000'
          onChange={(e) => setAmount(e.target.value)} />
        </div>
        <Button 
        disabled={!(name&&amount)}
        onClick={() => onCreateBudget()}
        className='mt-2 w-full bg-green-600'>Create Budget</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      </div>
    </div>
  )
}

export default Createbudget
