import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='root'>   
      <Sidebar/>
      <MobileNav/>
        <div className="w-full ml-0 md:ml-[250px]">
            <div className="w-full">
                {children}        
            </div>
        </div>
    </main>
  )
}

export default Layout