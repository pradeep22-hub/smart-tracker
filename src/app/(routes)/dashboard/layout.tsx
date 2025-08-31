import React from 'react'
import Sidenavbar from './_components/sidenavbar'
import Dashboard from './page'
import Dashboardheader from './_components/dashboardheader'


const Dashboardlayout = ({children}: {children: any}) => {
  return (
  <div>
    <div className='fixed md:w-64 hidden md:block border shadow-md p-5'>
        <Sidenavbar/>
    </div>
    <div className='md:ml-64'>
        <Dashboardheader/>
        {children}
    </div>
    </div>
  )
}

export default Dashboardlayout