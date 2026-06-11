import { useEffect, useState } from 'react'
import InputBox from './InputBox'
import toast from 'react-hot-toast'
import FormButtons from './FormButtons'
import { courseDataFormat } from '@/types/courseData'
import { useCMS } from '@/context/CMSContext'
import { useCMSData } from '@/context/CMSDataContext'
import { useCMSTheme } from '@/context/CMSThemeContext'

const CourseForm = () => {
    const { setOpenModal, setIsEditing, isEditing, editId, setEditId } = useCMS()
    const { storedCourseData, setStoredCourseData } = useCMSData()
    const { theme } = useCMSTheme()

    const generateId = () => {
        if (storedCourseData.length === 0) return "COU001"

        const maxId = Math.max(
            ...storedCourseData.map((s: courseDataFormat) => Number(s.id.replace("COU", "")))
        )

        return 'COU' + String(maxId + 1).padStart(3, "0");
    }

    const [courseData, setCourseData] = useState({
        id: generateId(),
        courseName: "",
        fees: "",
        duration: ""
    })


    const handleForm = (e: any) => {
        e.preventDefault()

        let updatedData: courseDataFormat[]
        if (isEditing && editId) {
            updatedData = storedCourseData.map((item) => item.id === editId ? courseData : item)
            toast.success("Course Updated Successfully")
            setIsEditing(false)
            setEditId('')
        }

        else {
            updatedData = [...storedCourseData, courseData]
            toast.success("Course Created Successfully")
        }
        
        setStoredCourseData(updatedData)

        setCourseData({
            id: "",
            courseName: "",
            fees: "",
            duration: ""
        })

        setOpenModal(false)
    }

    useEffect(() => {
        if (isEditing && editId) {
            const selectedCourse = storedCourseData.find((data: courseDataFormat) => data.id === editId)
            setCourseData({
                id: selectedCourse?.id || '',
                courseName: selectedCourse?.courseName || '',
                fees: selectedCourse?.fees || '',
                duration: selectedCourse?.duration || ''
            })
        }
    }, [isEditing, editId])

    return (
        <form className='grid gap-3' onSubmit={handleForm}>
            <div className='grid grid-cols-2 gap-4'>
                <InputBox
                    label='Id'
                    type='text'
                    id='id'
                    value={courseData.id}
                    onChange={(e) => setCourseData((prev) => ({ ...prev, id: e.target.value }))}
                />
                <InputBox
                    label='Course Name'
                    type="text"
                    id='courseName'
                    value={courseData.courseName}
                    onChange={(e) => setCourseData((prev) => ({ ...prev, courseName: e.target.value }))}
                />
                <InputBox
                    label='Fees'
                    type='text'
                    id='fees'
                    value={courseData.fees}
                    onChange={(e) => setCourseData((prev) => ({ ...prev, fees: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="id" className='text-xs md:text-base'>Duration</label>
                    <select name="duration"
                        id="duration"
                        className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} text-xs md:text-base px-1 py-0.5 md:px-2 md:py-1.5 rounded`}
                        value={courseData.duration}
                        onChange={(e) => setCourseData((prev) => ({ ...prev, duration: e.target.value }))}
                    >
                        <option value="hid den">Select</option>
                        <option value="1 month">1 month</option>
                        <option value="2 months">2 months</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 years">1 year</option>
                    </select>
                </div>
            </div>
            <FormButtons />
        </form>
    )
}

export default CourseForm