import { useCMSTheme } from '@/context/CMSThemeContext'
import { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

const Container = ({ children }: ContainerProps) => {

    const { theme } = useCMSTheme()

    return (
        <div className='px-4'>
            <div className={`px-4 py-4 ${theme === 'light' ? 'bg-white' : 'bg-[#273549]'} rounded-md`}>{children}</div>
        </div>
    )
}

export default Container