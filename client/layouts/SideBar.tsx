'use client'
import { useCMSTheme } from '@/context/CMSThemeContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiAlarm, BiBook, BiGroup, BiLogOut } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'
import { FaGraduationCap, FaHome, FaRupeeSign } from 'react-icons/fa'
import { GiTeacher } from 'react-icons/gi'
import { HiMenu, HiMenuAlt2 } from 'react-icons/hi'
import { MdPayments } from 'react-icons/md'
import { PiStudentBold } from 'react-icons/pi'
import { TbReportAnalytics } from 'react-icons/tb'

interface SideBarProps {
    openMenu: Boolean
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ openMenu, setOpenMenu }: SideBarProps) => {
    const navItems = [
        { name: 'Dashboard', icon: FaHome, url: '/admin' },
        { name: 'Students', icon: PiStudentBold, url: '/admin/students' },
        { name: 'Courses', icon: BiBook, url: '/admin/courses' },
        { name: 'Teachers', icon: GiTeacher, url: '/admin/teachers' },
        { name: 'Batch', icon: BiGroup, url: '/admin/batch' },
        { name: 'Attendance', icon: BiAlarm, url: '/admin/attendance' },
        { name: 'Fees', icon: FaRupeeSign, url: '/admin/fees' },
        { name: 'Payments', icon: MdPayments, url: '/admin/payments' },
        { name: 'Reports', icon: TbReportAnalytics, url: '/admin/reports' },
        { name: 'Settings', icon: CiSettings, url: '/admin/settings' },
        { name: 'Logout', icon: BiLogOut, FaHome, url: '/admin/logout' }
    ]

    const pathName = usePathname()
    const handleMenuClick = () => {
        setOpenMenu(prev => !prev)
    }
    const { theme } = useCMSTheme()

    return (
        <div className={`${theme === 'light' ? 'bg-[#0d2569]' : 'bg-[#0F172A]'} text-white p-4 h-screen flex flex-col gap-6 fixed text-sm lg:text-base ${openMenu ? 'md:w-15.5 lg:w-16.5 z-20 md:z-0' : 'md:w-42.5 lg:w-[245.5px] -z-20 md:z-0'}`}>
            <div className='flex justify-between'>
                <button className='cursor-pointer' onClick={handleMenuClick}>
                    {
                        openMenu ? <HiMenuAlt2 size={26} /> : <HiMenu size={26} />
                    }
                </button>

                <Link href={'/admin'} className={`flex gap-2 items-center ${openMenu ? 'hidden' : 'block'}`} >
                    <FaGraduationCap size={30} />
                    <h1 className='font-bold mt-1 text-lg'>CMS</h1>
                </Link>
            </div>

            <nav className='grid gap-3'>
                {
                    navItems.map((navItem) => {
                        return (
                            <Link href={navItem.url} className={`flex items-center gap-3 px-2 py-2 rounded hover:bg-[#3656ad] hover:text-white hover:transition hover:-translate-y-1 ${pathName === navItem.url ? 'bg-[#3656ad] font-semibold' : 'text-gray-200'}`} key={navItem.name} onClick={() => setOpenMenu(false)}>
                                <navItem.icon size={20} />
                                {
                                    <p className={`${openMenu ? 'hidden' : 'block'}`}>{navItem.name}</p>
                                }
                            </Link>
                        )
                    })
                }
            </nav>
        </div>
    )
}

export default SideBar