import { useCMSTheme } from "@/context/CMSThemeContext"

interface InputBoxProps {
  label?: string
  type: string
  value: string
  id: string
  placeholder?: string
  readOnly?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const InputBox = ({ label, type, id, value, onChange, placeholder, readOnly }: InputBoxProps) => {

  const { theme } = useCMSTheme()

  return (
    <div className='grid'>
      <label htmlFor={id} className ='text-xs md:text-base'>{label ?? label}</label>
      <input
        type={type}
        className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#4B5563]'} w-35 md:w-auto px-1 md:px-2 py-1 rounded text-xs md:text-base ${readOnly ? 'cursor-not-allowed' : ''}`}
        name={id}
        id={id}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value ?? value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputBox