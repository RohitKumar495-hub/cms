import { IconType } from 'react-icons'

interface ButtonProps {
    label : string
    action ?: () => void
    type?: "button" | "submit" | "reset";
    Icon ?: IconType
}

const Button = ( { label, action, type, Icon } : ButtonProps ) => {
  return (
    <button className='bg-[#4F46E5] hover:bg-[#4338CA] text-white px-2 py-1 rounded cursor-pointer flex items-center gap-2 text-[8px] md:text-base' type={type} onClick={action}> {Icon && <Icon />}{label}</button>
  )
}

export default Button