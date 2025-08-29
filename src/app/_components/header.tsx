import { Button } from '@/components/ui/button'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 flex justify-between align-center border shadow-md'>
        <img src="logo.jpg" alt="" width={80} height={80}/>
        <Button>Get started</Button>
    </div>
  )
}

export default Header