import { useEffect, useState } from 'react'
import InputBox from './InputBox'
import toast from 'react-hot-toast'
import { useCMS } from '@/context/CMSContext'
import { batchDataFormat } from '@/types/batchData'
import { useCMSData } from '@/context/CMSDataContext'
import { courseDataFormat } from '@/types/courseData'
import { teacherDataFormat } from '@/types/teacherData'
import FormButtons from './FormButtons'
import { useCMSTheme } from '@/context/CMSThemeContext'

const BatchForm = () => {

    const { setOpenModal, editId, isEditing, setIsEditing, setEditId, } = useCMS()
    const { storedBatchData, setStoredBatchData, storedCourseData, storedTeacherData } = useCMSData()
    const { theme} = useCMSTheme()

    const generateId = () => {
        if (storedBatchData.length === 0) return "BAT001"

        const maxId = Math.max(
            ...storedBatchData.map((b: batchDataFormat) => Number(b.batchId.replace("BAT", "0")))
        )

        return 'BAT' + String(maxId + 1).padStart(3, "0")
    }

    const [batchData, setBatchData] = useState({
        batchId: generateId(),
        batchName: '',
        courseId: '',
        courseName: '',
        courseDuration: '',
        courseFee: '',
        startingDate: '',
        teacherId: '',
        teacherName: '',
        endingDate: '',
        maxStudents: '60',
        status: 'Active'
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let updatedData : batchDataFormat[]
        if (isEditing && editId) {
            updatedData = storedBatchData.map((data: batchDataFormat) => data.batchId === editId ? batchData : data)
            toast.success("Batch Record Updated Successfully")
            setIsEditing(false)
            setEditId('')
        } else {
            updatedData = [...storedBatchData, batchData]
            toast.success("Batch Created Successfully")
        }
        setStoredBatchData(updatedData)
        setOpenModal(false)
        setBatchData({
            batchId: '',
            batchName: '',
            courseId: '',
            courseName: '',
            courseDuration: '',
            courseFee: '',
            startingDate: '',
            teacherId: '',
            teacherName: '',
            endingDate: '',
            maxStudents: '',
            status: ''
        })
    }

    useEffect(() => {
        if (isEditing && editId) {
            const selectBatch = storedBatchData.find((data: batchDataFormat) => data.batchId === editId)
            setBatchData({
                batchId: selectBatch?.batchId || '',
                batchName: selectBatch?.batchName || '',
                courseId: selectBatch?.courseId || '',
                courseName: selectBatch?.courseName || '',
                courseDuration: selectBatch?.courseDuration || '',
                courseFee: selectBatch?.courseFee || '',
                startingDate: selectBatch?.startingDate || '',
                teacherId: selectBatch?.teacherId || '',
                teacherName: selectBatch?.teacherName || '',
                endingDate: selectBatch?.endingDate || '',
                maxStudents: selectBatch?.maxStudents || '',
                status: selectBatch?.status || ''
            })
        }
    }, [isEditing, editId]) 

    return (
        <form className='grid gap-6' onSubmit={handleSubmit}>
            <div className='grid gap-4 grid-cols-2'>
                <InputBox
                    type='text'
                    label='Batch Id'
                    id='batchId'
                    value={batchData.batchId}
                    onChange={(e) => setBatchData((prev) => ({ ...prev, batchId: e.target.value }))}
                />
                <InputBox
                    type='text'
                    label='Batch Name'
                    id='batchName'
                    value={batchData.batchName}
                    onChange={(e) => setBatchData((prev) => ({ ...prev, batchName: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="courseName" className='text-xs md:text-base'>Course Name</label>
                    <select name="courseName" id="courseName" className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} text-xs md:text-base px-1 py-0.5 md:px-2 md:py-1.5 rounded`} value={batchData.courseName}
                        onChange={(e) => {
                            const selectedCourse = storedCourseData.find((data: courseDataFormat) => data.courseName === e.target.value)
                            setBatchData((prev) => ({
                                ...prev, courseName: e.target.value,
                                courseId: selectedCourse?.id || '',
                                courseDuration: selectedCourse?.duration || '',
                                courseFee: selectedCourse?.fees || ''
                            }))
                        }}>
                        <option value="">Select</option>
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
                    type='text'
                    label='Course Id'
                    id='courseId'
                    value={batchData.courseId}
                    readOnly
                    onChange={(e) => setBatchData((prev) => ({ ...prev, courseId: e.target.value }))}
                />
                <InputBox
                    type='text'
                    label='Course Duration'
                    id='courseDuaration'
                    value={batchData.courseDuration}
                    readOnly
                    onChange={(e) => setBatchData((prev) => ({ ...prev, courseDuration: e.target.value }))}
                />
                <InputBox
                    type='text'
                    label='Course Fee'
                    id='courseFee'
                    value={batchData.courseFee}
                    readOnly
                    onChange={(e) => setBatchData((prev) => ({ ...prev, courseFee: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="teacherName" className='text-xs md:text-base'>Teacher Name</label>
                    <select name="teacherName" id="teacherName" className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} text-xs md:text-base px-1 py-0.5 md:px-2 md:py-1.5 rounded`} value={batchData.teacherName}
                        onChange={(e) => {
                            const selectedTeacher = storedTeacherData.find((data: teacherDataFormat) => data.teacherName === e.target.value)
                            setBatchData((prev) => ({
                                ...prev, teacherName: e.target.value,
                                teacherId: selectedTeacher?.teacherId || ''
                            }))
                        }}>
                        <option value="">Select</option>
                        {
                            storedTeacherData.map((data) => {
                                return (
                                    <option key={data.teacherId} value={data.teacherName}>{data.teacherName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <InputBox
                    type='text'
                    label='Teacher Id'
                    id='teacherId'
                    value={batchData.teacherId}
                    readOnly
                    onChange={(e) => setBatchData((prev) => ({ ...prev, teacherId: e.target.value }))}
                />
                <InputBox
                    type='date'
                    label='Starting Date'
                    id='startingDate'
                    value={batchData.startingDate}
                    onChange={(e) => setBatchData((prev) => ({ ...prev, startingDate: e.target.value }))}
                />
                <InputBox
                    type='date'
                    label='Ending Date'
                    id='endingDate'
                    value={batchData.endingDate}
                    onChange={(e) => setBatchData((prev) => ({ ...prev, endingDate: e.target.value }))}
                />
                <InputBox
                    type='text'
                    label='Maximum Student'
                    id='maxStudent'
                    value={batchData.maxStudents}
                    onChange={(e) => setBatchData((prev) => ({ ...prev, maxStudents: e.target.value }))}
                /><InputBox
                    type='text'
                    label='Status'
                    id='status'
                    value={batchData.status}
                    onChange={(e) => setBatchData((prev) => ({ ...prev, status: e.target.value }))}
                />
            </div>

            <FormButtons />
        </form>
    )
}

export default BatchForm