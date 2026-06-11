import { useEffect, useState } from 'react'
import InputBox from './InputBox'
import toast from 'react-hot-toast'
import FormButtons from './FormButtons'
import { useCMS } from '@/context/CMSContext'
import { teacherDataFormat } from '@/types/teacherData'
import { useCMSData } from '@/context/CMSDataContext'
import { useCMSTheme } from '@/context/CMSThemeContext'

const TeachersForm = () => {

    const { storedTeacherData, setStoredTeacherData, storedCourseData } = useCMSData()
    const { setOpenModal, editId, isEditing, setEditId, setIsEditing } = useCMS()
    const { theme } = useCMSTheme()

    const generateID = () => {

        if (storedTeacherData.length === 0) return "TEA001"

        const maxID = Math.max(
            ...storedTeacherData.map((t: teacherDataFormat) => Number(t.teacherId.replace("TEA", "")))
        )

        return 'TEA' + String(maxID + 1).padStart(3, "0")
    }

    const [teachersData, setTeachersData] = useState({
        teacherId: generateID(),
        teacherName: '',
        status: 'Active',
        subject: '',
        mobile: '',
        joinedOn: '',
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()

        let updatedData: teacherDataFormat[]
        if (editId && isEditing) {
            updatedData = storedTeacherData.map((data: teacherDataFormat) => data.teacherId === editId ? teachersData : data)
            toast.success("Record Updated Successfully")
            setIsEditing(false)
            setEditId('')
            setOpenModal(false)
        } else {
            updatedData = [...storedTeacherData, teachersData]
            toast.success("Teacher's Data Stored Successfully")
        }

        setStoredTeacherData(updatedData)
        setTeachersData({
            teacherId: '',
            teacherName: '',
            status: '',
            subject: '',
            mobile: '',
            joinedOn: ''
        })

        setOpenModal(false)
    }

    useEffect(() => {
        if (isEditing && editId) {
            const editData = storedTeacherData.find((data: teacherDataFormat) => data.teacherId === editId)
            setTeachersData({
                teacherId: editData?.teacherId || '',
                teacherName: editData?.teacherName || '',
                status: editData?.status || '',
                subject: editData?.subject || '',
                mobile: editData?.mobile || '',
                joinedOn: editData?.joinedOn || ''
            })
        }

    }, [isEditing, editId])

    return (
        <form className='grid gap-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
                <InputBox
                    type='text'
                    label='Id'
                    id='teacherId'
                    readOnly
                    value={teachersData?.teacherId}
                    onChange={(e) => setTeachersData((prev) => ({ ...prev, teacherId: e.target.value }))}
                />
                <InputBox
                    label='Teacher Name'
                    type='text'
                    id={'teacherName'}
                    value={teachersData?.teacherName}
                    onChange={(e) => setTeachersData((prev) => ({ ...prev, teacherName: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="subject" className='text-xs md:text-base'>Subject</label>
                    <select name="subject" id="subject" className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} text-xs md:text-base px-1 py-0.5 md:px-2 md:py-1.5 rounded`} value={teachersData?.subject}
                        onChange={(e) => setTeachersData((prev) => ({ ...prev, subject: e.target.value }))}
                    >
                        <option value="" >Select</option>
                        {
                            storedCourseData.map((data) => {
                                return (
                                    <option key={data.id} value={data.courseName}>{data.courseName}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <InputBox
                    label='Mobile'
                    type='text'
                    id='mobile'
                    value={teachersData?.mobile}
                    onChange={(e) => setTeachersData((prev) => ({ ...prev, mobile: e.target.value }))}
                />
                <InputBox
                    label='Status'
                    type='text'
                    id='status'
                    value={teachersData?.status}
                    onChange={(e) => setTeachersData((prev) => ({ ...prev, status: e.target.value }))}
                />
                <InputBox
                    label='Joined On'
                    type='date'
                    id='joinedOn'
                    value={teachersData?.joinedOn}
                    onChange={(e) => setTeachersData((prev) => ({ ...prev, joinedOn: e.target.value }))}
                />
            </div>

            <FormButtons />
        </form>
    )
}

export default TeachersForm