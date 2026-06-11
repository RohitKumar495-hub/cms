import Button from './Button'
import { useCMS } from '@/context/CMSContext'

const FormButtons = () => {
    const { setOpenModal, setIsEditing } = useCMS()
    return (
        <div className='flex justify-end gap-6'>
            <Button label='Save' type='submit' />
            <Button label='Cancel' type='button' action={() => {
                setOpenModal(false)
                setIsEditing(false)
            }} />
        </div>
    )
}

export default FormButtons