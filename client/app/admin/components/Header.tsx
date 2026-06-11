import { useCMSTheme } from '@/context/CMSThemeContext'
import Image from 'next/image'
import { FaMoon, FaSun } from 'react-icons/fa'

interface HeaderProps {
    pageName: string
}

const Header = ({ pageName }: HeaderProps) => {

    const { theme, handleTheme } = useCMSTheme()

    return (
        <div className={`px-4 py-3 w-full shadow-md sticky top-0 z-10 ${theme === 'light' ? 'bg-white' : 'bg-[#273549]'}`}>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">{pageName}</h1>
                <div className='flex items-center gap-10'>
                    <div className="w-10 h-10 rounded-full border">
                        <Image
                            src={'/'}
                            alt="profile"
                            width={100}
                            height={20}
                        />
                    </div>
                    <button className={`cursor-pointer ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-400' : 'bg-gray-700 hover:bg-gray-900'} px-2 py-2 rounded-md `} onClick={handleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
                </div>
            </div>
        </div>
    )
}

export default Header