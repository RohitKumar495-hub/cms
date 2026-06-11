import { useEffect, useState } from 'react'
import InputBox from './InputBox'
import Button from './Button'
import toast from 'react-hot-toast'
import { useCMS } from '@/context/CMSContext'
import { useCMSData } from '@/context/CMSDataContext'
import FormButtons from './FormButtons'
import { useCMSTheme } from '@/context/CMSThemeContext'

const FeesForm = () => {

    const { isEditing, setIsEditing, editId, setEditId, setOpenModal } = useCMS()
    const { storedStudentData, setStoredStudentData } = useCMSData()
    const { theme } = useCMSTheme()

    const [feesData, setFeesData] = useState({
        studentId: '',
        studentName: '',
        courseName: '',
        courseId: '',
        courseFee: '',
        paidAmount: '',
        status: ''
    })

const handleSubmit = () => {
    const updatedStudents = storedStudentData.map((student) => {
        if (student.studentId === feesData.studentId) {
            const paidAmount =
                Number(student.paidAmount) + Number(feesData.paidAmount)

            const dueAmount =
                Number(student.totalFees) - paidAmount

            return {
                ...student,
                paidAmount: String(paidAmount),
                dueAmount: String(dueAmount),
                feesStatus: dueAmount <= 0 ? 'paid' : 'pending'
            }
        }
        setEditId('')
        setIsEditing(false)
        return student
    })

    setStoredStudentData(updatedStudents)

    toast.success('Record Updated Successfully')
    setOpenModal(false)
}

    useEffect(() => {

        const editingData = storedStudentData.find((item) => item.studentId === editId)
        setFeesData({
            studentId: editingData?.studentId || '',
            studentName: editingData?.studentName || '',
            courseName: editingData?.courseName || '',
            courseId: editingData?.courseId || '',
            courseFee: editingData?.courseFee || '',
            paidAmount: editingData?.paidAmount || '',
            status: editingData?.status || 'pending'
        })

    }, [isEditing, editId])

    return (
        <form className='grid gap-6' >
            <div className='grid grid-cols-2 gap-4'>
                <InputBox
                    label='Student Id'
                    type='text'
                    id={'studentId'}
                    value={feesData.studentId}
                    readOnly
                    onChange={(e) => setFeesData((prev) => ({ ...prev, studentId: e.target.value }))}
                />
                <InputBox
                    label='Student Name'
                    type='text'
                    id={'studentName'}
                    value={feesData.studentName}
                    readOnly
                    onChange={(e) => setFeesData((prev) => ({ ...prev, studentName: e.target.value }))}
                />
                <InputBox
                    label='Course Name'
                    type='text'
                    id={'courseName'}
                    value={feesData.courseName}
                    readOnly
                    onChange={(e) => setFeesData((prev) => ({ ...prev, courseName: e.target.value }))}
                />
                <InputBox
                    label='Course Fee'
                    type='text'
                    id={'courseFee'}
                    value={feesData.courseFee}
                    readOnly
                    onChange={(e) => setFeesData((prev) => ({ ...prev, courseFee: e.target.value }))}
                />
                <InputBox
                    label='Paid Amount'
                    type='text'
                    id={'paidAmount'}
                    value={feesData.paidAmount}
                    onChange={(e) => setFeesData((prev) => ({ ...prev, paidAmount: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="status" className='text-xs md:text-base'>Status</label>
                    <select name="status" id="status" className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} text-xs md:text-base px-1 py-0.5 md:px-2 md:py-1.5 rounded`} value={feesData.status}
                        onChange={(e) => setFeesData((prev) => ({ ...prev, status: e.target.value }))}>
                        <option value="" hidden>Select</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

        <div className='flex justify-end gap-6'>
            <Button label='Save' type='button' action={handleSubmit}/>
            <Button label='Cancel' type='button' action={() => {
                setOpenModal(false)
                setIsEditing(false)
            }} />
        </div>
        </form>
    )
}

export default FeesForm