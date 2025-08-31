'use client'
import React from 'react'
import { LayoutDashboard, PiggyBank, BanknoteArrowDown,UserCog } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Sidenavbar = () => {
    const menuItem = [
        { name: "Dashboard",
          id: 1,
          icon:LayoutDashboard,
          path:'/dashboard'
        },
        { name: "Budget",
          id: 2,
          icon:PiggyBank, 
          path:'/dashboard/budget'
        },
        { name: "Expenses",
            id: 3,
            icon:BanknoteArrowDown,
            path:'/dashboard/expenses'

        },
        {name: "settings",
         id: 4,
         icon:UserCog,
         path:'/dashboard/settings'
        }
]
    const path=usePathname();
  return (
    <div className='h-screen flex-row justify-center items-start'>
        <img src="logo.jpg" alt="" height={40} width={40}/>
        <div>
            {menuItem.map((menu,index) => (
                <Link href={menu.path}>
                <h2 className={`flex gap-2 items-center p-5 hover:bg-green-100 rounded-md cursor-pointer ${path==menu.path&& 'text-primary bg-green-300'}`} >
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default Sidenavbar