'use client'
import { useCMSTheme } from '@/context/CMSThemeContext';
import SideBar from '@/layouts/SideBar';
import React, { useState } from 'react'
import { HiMenu } from 'react-icons/hi';

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {

    const [openMenu, setOpenMenu] = useState(false)
    const { theme } = useCMSTheme()

    return (

        <div className={`${theme === 'light' ? 'bg-black' : 'bg-white' }`}>
            <div className={`grid ${openMenu ? 'grid-cols-[0%_100%] md:grid-cols-[8%_92%] lg:grid-cols-[4.2%_95.8%]' : 'grid-cols-[0%_100%] md:grid-cols-[22%_78%] lg:grid-cols-[16%_84%]'}`}>
                <nav className={``}>
                    <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
                </nav>
                <main className={`${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-[#1a2131] text-[#F9FAFB]'} min-h-screen`}>
                    <button className='bottom-20 fixed right-4 bg-[#0d2569] rounded-full w-10 h-10 flex items-center justify-center text-white md:hidden' onClick={() => setOpenMenu(prev => !prev)}><HiMenu size={25} /></button>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default LayoutAdmin