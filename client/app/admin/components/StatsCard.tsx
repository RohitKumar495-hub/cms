import { useCMSTheme } from "@/context/CMSThemeContext"
import { IconType } from "react-icons"
import { FaArrowUp } from "react-icons/fa"

interface StatsCardProps {
    heading : string
    no : number
    description : string
    Icon : IconType
    bgColor: string
}

const StatsCard = ( { heading, no, Icon, description, bgColor } : StatsCardProps ) => {
    const { theme } =  useCMSTheme()
  return (
    <div className={`lg:w-55 h-auto ${ theme === 'light' ? 'bg-white' : 'bg-[#273549]'} shadow-md rounded px-2 py-2 flex gap-4 items-center text-xs md:text-sm lg:text-lg`}>
        <div className={`${bgColor} rounded-full w-8 h-8 lg:w-11 lg:h-11 flex items-center justify-center`}>
            <Icon className="text-white text-xl" />
        </div>
        <div className="flex flex-col gap-1">
            <h1 className={`font-semibold ${theme === 'light' ? 'text-gray-600' : ''}`}>{heading}</h1>
            <p className="font-semibold">{no}</p>
            <p className="flex items-center gap-1 text-xs font-semibold text-green-400"><FaArrowUp size={12}/>{description}</p>
        </div>

    </div>
  )
}

export default StatsCard