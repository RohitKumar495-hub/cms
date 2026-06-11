'use client'
import React from 'react'
import InputBox from './InputBox'
import Button from './Button'
import { FaPlus } from 'react-icons/fa'
import { useCMS } from '@/context/CMSContext'
import Header from './Header'
import { useCMSTheme } from '@/context/CMSThemeContext'

interface TopBarProps {
    placeholder : string
    label : string
    pageName: string
}

const TopBar = ( { placeholder, label, pageName } : TopBarProps ) => {
    const { isSearching, setIsSearching, setOpenModal } = useCMS()
    const { theme } = useCMSTheme()
    return (
        <>
        <Header pageName={pageName} />
        <div className='px-4 py-4'>
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#273549]'} p-4 rounded-md flex justify-between gap-2`}>
                <InputBox
                    type='string'
                    id='searchText'
                    placeholder={placeholder}
                    value={isSearching}
                    onChange={(e) => setIsSearching(e.target.value)}
                />
                <Button
                    label={label}
                    Icon={FaPlus}
                    action={() => setOpenModal(true)}
                />
            </div>

        </div>
        </>

    )
}

export default TopBar