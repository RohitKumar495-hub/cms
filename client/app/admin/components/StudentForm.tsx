import { useEffect, useState } from 'react'
import InputBox from './InputBox'
import toast from 'react-hot-toast'
import { useCMSData } from '@/context/CMSDataContext'
import { studentDataFormat } from '@/types/studentData'
import { useCMS } from '@/context/CMSContext'
import FormButtons from './FormButtons'
import { generatePassword } from '../utils/generatePassword'
import { useCMSTheme } from '@/context/CMSThemeContext'

const StudentForm = () => {

    const { setOpenModal, setIsEditing, isEditing, editId, setEditId } = useCMS()
    const { storedStudentData, setStoredStudentData, storedCourseData, storedBatchData } = useCMSData()
    const { theme } = useCMSTheme()

    const generateId = () => {

        if (storedStudentData.length === 0) return "STD001"

        const maxId = Math.max(
            ...storedStudentData.map((s: studentDataFormat) => Number(s.studentId.replace("STD", "")))
        )

        return 'STD' + String(maxId + 1).padStart(3, "0");
    }

    const [studentData, setStudentData] = useState({
        studentId: generateId(),
        studentName: '',
        courseName: '',
        mobile: '',
        batchName: '',
        batchId: '',
        courseId: '',
        courseFee: '',
        status: 'Active',
        joinedOn: '',
        password: generatePassword(),
        totalFees: '',
        paidAmount: '0',
        dueAmount: '',
        feesStatus: 'pending'
    })

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("studentData", studentData)

        let updatedData : studentDataFormat[    ]
        if (isEditing && editId) {
            updatedData = storedStudentData.map((data) => data.studentId === editId ? studentData : data)
            toast.success('Student Details Updated Successfully')
            setIsEditing(false)
            setEditId('')
        }

        else {
            updatedData = [...storedStudentData, studentData]
            toast.success("Student Added Successfully")
        }

        setStoredStudentData(updatedData)
        setStudentData({
            studentId: '',
            studentName: '',
            courseName: '',
            mobile: '',
            batchName: '',
            batchId: '',
            courseId: '',
            courseFee: '',
            status: '',
            joinedOn: '',
            password: '',
            totalFees: '',
            paidAmount: '',
            dueAmount: '',
            feesStatus: ''
        })

        setOpenModal(false)
    }

    useEffect(() => {
        if (isEditing && editId) {
            const studentData = JSON.parse(localStorage.getItem('studentData') || '[]')
            const editStudentData = studentData.find((data: studentDataFormat) => data.studentId === editId)
            console.log(editStudentData)
            setStudentData({
                studentId: editStudentData.studentId,
                studentName: editStudentData.studentName,
                courseName: editStudentData.courseName,
                mobile: editStudentData.mobile,
                batchName: editStudentData.batchName,
                batchId: editStudentData.batchId,
                courseId: editStudentData.courseId,
                status: editStudentData.status,
                courseFee: editStudentData.courseFee,
                joinedOn: editStudentData.joinedOn,
                password: editStudentData.password,
                totalFees: editStudentData.totalFees,
                paidAmount: editStudentData.paidAmount,
                dueAmount: editStudentData.dueAmount,
                feesStatus: editStudentData.feesStatus
            })
        }

    }, [editId, isEditing])

    return (
        <form className='grid gap-3' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
                <InputBox
                    label='Student Id'
                    type='text'
                    id={'studentId'}
                    value={studentData?.studentId}
                    readOnly
                    onChange={(e) => setStudentData((prev) => ({ ...prev, studentId: e.target.value }))}
                />
                <InputBox
                    label='Student Name'
                    type='text'
                    id={'studentName'}
                    value={studentData.studentName}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, studentName: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="course" className='text-xs md:text-base'>Course</label>
                    <select className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} px-1 py-0.5 md:px-2 md:py-1.5 text-xs md:text-base rounded`} name="course" id="course" value={studentData.courseName} onChange={(e) => {
                        const selectedCourse = storedCourseData.find((data) => data.courseName === e.target.value)
                        setStudentData((prev) => {
                            const fees = Number(selectedCourse?.fees || 0)
                            return {
                            ...prev, courseName: e.target.value,
                            courseId: selectedCourse?.id || '',
                            courseFee: String(fees) || '',
                            totalFees: String(fees) || '',
                            dueAmount: String(fees - Number(prev.paidAmount || 0))
                        }})
                    }}>
                        <option value="" hidden>Select</option>
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
                    label='Course Id'
                    type='text'
                    id={'courseId'}
                    readOnly
                    value={studentData.courseId}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, courseId: e.target.value }))}
                />
                <InputBox
                    label='Course Fees'
                    type='text'
                    id={'courseFees'}
                    readOnly
                    value={studentData.courseFee}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, courseFee: e.target.value }))}
                />
                <div className='grid'>
                    <label htmlFor="course" className='text-xs md:text-base'>Batch</label>
                    <select className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} px-1 py-0.5 md:px-2 md:py-1.5 text-xs md:text-base rounded`} name="batch" id="batch" value={studentData.batchName} onChange={(e) => {
                        const selectedBatch = storedBatchData.find((data) => data.batchName === e.target.value)
                        setStudentData((prev) => ({
                            ...prev, batchName: e.target.value,
                            batchId: selectedBatch?.batchId || ''
                        }))
                    }}>
                        <option value="">Select</option>
                        {
                            storedBatchData.map((data) => {
                                return (
                                    <option key={data.batchId} value={data.batchName}>{data.batchName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <InputBox
                    label='Batch Id'
                    type='text'
                    id={'courseId'}
                    readOnly
                    value={studentData.batchId}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, batchId: e.target.value }))}
                />
                <InputBox
                    label='Mobile No.'
                    type='text'
                    id='mobileNo'
                    value={studentData.mobile}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, mobile: e.target.value }))}
                />
                <InputBox
                    label='Joined On'
                    type='date'
                    id='joinedOn'
                    value={studentData.joinedOn}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, joinedOn: e.target.value }))}
                />
                <InputBox
                    label='Status'
                    type='text'
                    id='status'
                    value={studentData.status}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, status: e.target.value }))}
                />
                <InputBox
                    label='Due Amount'
                    type='text'
                    id='dueAmount'
                    readOnly
                    value={studentData.dueAmount}
                    onChange={(e) => setStudentData((prev) => ({ ...prev, dueAmount: e.target.value }))}
                />
            </div>

            <FormButtons />

        </form>
    )
}

export default StudentForm