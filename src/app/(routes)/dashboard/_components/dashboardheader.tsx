import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Dashboardheader = () => {
  return (
    <div className='p-5 flex justify-between align-center border shadow-md'>
        <div>
            SearchBar
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default Dashboardheader