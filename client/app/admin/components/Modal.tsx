import { useCMS } from '@/context/CMSContext'
import { useCMSTheme } from '@/context/CMSThemeContext'
import { RxCross2 } from 'react-icons/rx'

interface ModalProps {
    heading: string
    children: React.ReactNode
}

const Modal = ({ heading, children }: ModalProps) => {

    const { setOpenModal, setIsEditing } = useCMS()
    const { theme } = useCMSTheme()

    return (
        <div className='bg-black/70 flex items-center justify-center h-screen absolute top-0 left-0 right-0 bottom-0 z-10' onClick={() => setOpenModal(false)}>
            <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#273549] border shadow border-[#a0acbd]'} w-xs md:w-2xl px-2 py-2 rounded-lg`} onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center'>
                    <h1 className='font-semibold'>{heading}</h1>
                    <button className='cursor-pointer hover:text-red-500' onClick={() => {
                        setOpenModal(false)
                        setIsEditing(false)
                    }}>
                        <RxCross2 size={20} />
                    </button>
                </div>

                <div className='mt-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal