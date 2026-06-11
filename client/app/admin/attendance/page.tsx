'use client'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { useCMSData } from '@/context/CMSDataContext'
import { useCMSTheme } from '@/context/CMSThemeContext'

interface AttendanceDataFormat {
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  batchId: string
  batchName: string
  date: string
  status: string
}

const AttendancePage = () => {

  const [date, setDate] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')
  const { theme } = useCMSTheme()
  const [attendanceData, setAttendanceData] = useState<AttendanceDataFormat[]>([])
  const { storedStudentData, storedBatchData } = useCMSData()

  const filteredData = storedStudentData.filter((data) => selectedBatch !== '' ? data.batchName === selectedBatch : data)

  const handleSubmit = () => {
    const existingData: AttendanceDataFormat[] = JSON.parse(
      localStorage.getItem('attendanceData') || '[]'
    )

    const updatedData = [...existingData]

    attendanceData.forEach((newAttendance) => {
      const existingIndex = updatedData.findIndex(
        (item) =>
          item.studentId === newAttendance.studentId &&
          item.date === newAttendance.date &&
          item.batchId === newAttendance.batchId
      )

      if (existingIndex !== -1) {
        // Update existing attendance
        updatedData[existingIndex] = newAttendance
      } else {
        // Add new attendance
        updatedData.push(newAttendance)
      }
    })

    localStorage.setItem(
      'attendanceData',
      JSON.stringify(updatedData)
    )

    toast.success('Attendance Marked Successfully')

    setDate('')
    setSelectedBatch('')
  }

  const getAttendanceDetail = (studentId: string) => {
    const response = attendanceData.find((item) =>
      item.studentId === studentId && item.date === date && item.batchName === selectedBatch)

    return response?.status
  }

  useEffect(() => {
    if (date && selectedBatch) {
      const attendance = JSON.parse(localStorage.getItem('attendanceData') || '[]')

      const filteredData = attendance.filter((item: AttendanceDataFormat) => item.date === date && item.batchName === selectedBatch)
      setAttendanceData(filteredData)
    } else {
      setAttendanceData([])
    }

  }, [date, selectedBatch])

  return (
    <div>
      <Header pageName="Attendance" />

      <div className='px-4 grid gap-6 mt-4'>
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#273549]'} p-4 flex justify-between rounded-md items-center`}>
          <div className='flex gap-6'>
            <InputBox
              label='Select Date'
              type='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <div className='grid'>
              <label htmlFor="course" className='text-xs md:text-base'>Batch</label>
              <select name="course" id="course" className={`border ${theme === 'light' ? 'border-gray-300' : 'bg-[#374151] border-[#374151]'} text-xs md:text-base px-1 py-0.5 md:px-2 md:py-1.5 rounded`} value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}>
                <option value="">Select</option>
                {
                  storedBatchData.map((data) => {
                    return (
                      <option key={data.batchId}>
                        {data.batchName}
                      </option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div>
            <Button label='Save' action={handleSubmit} />
          </div>

        </div>

        <div className={`${theme === 'light' ? 'bg-white' : ''} rounded-md`}>
          {
            <table className='w-full text-center border border-gray-400 rounded-md text-xs lg:text-sm'>
              <thead>
                <tr className={`${theme === 'light' ? 'bg-gray-200' : 'bg-[#374151]'}`}>
                  <th className='py-2'>ID</th>
                  <th className='py-2'>Student Name</th>
                  <th className='py-2'>Course Name</th>
                  <th className='py-2'>Batch Name</th>
                  <th>Attendence</th>
                </tr>
              </thead>
              <tbody className=''>

                {
                  filteredData.length === 0 || (!date && !selectedBatch) && (
                    <tr>
                      <td colSpan={5} className='py-3'>No records Found</td>
                    </tr>
                  )
                }
                {
                  date && selectedBatch && (
                    [...filteredData].sort((a, b) => Number(a.studentId) - Number(b.studentId)).map((data) => {
                      return (
                        <tr key={data.studentId} className=''>
                          <td className='py-3 pb-2 border-b-2 border-gray-300'>{data.studentId}</td>
                          <td className='py-3 pb-2 border-b-2 border-gray-300'>{data.studentName}</td>
                          <td className='py-3 pb-2 border-b-2 border-gray-300'>{data.courseName}</td>
                          <td className='py-3 pb-2 border-b-2 border-gray-300'>{data.batchName}</td>
                          <td className='py-3 pb-2 border-b-2 border-gray-300'>
                            <div className='flex justify-center items-center gap-6'>
                              <div className='grid'>
                                <input type="radio" name={`${data.studentId}-attendance`} id={`${data.studentId}-absent`} className='cursor-pointer' value={'absent'}
                                  checked={getAttendanceDetail(data.studentId) === 'absent'}
                                  onChange={(e) => {
                                    const attendanceRecord = {
                                      studentId: data.studentId,
                                      studentName: data.studentName,
                                      courseId: data.courseId,
                                      courseName: data.courseName,
                                      batchId: data.batchId,
                                      batchName: data.batchName,
                                      date,
                                      status: e.target.value,

                                    }
                                    setAttendanceData((prev) => {
                                      const existingIndex = prev.findIndex(
                                        (item) => item.studentId === data.studentId
                                      )

                                      if (existingIndex !== -1) {
                                        const updated = [...prev]
                                        updated[existingIndex] = attendanceRecord
                                        return updated
                                      }

                                      return [...prev, attendanceRecord]
                                    })
                                  }}
                                />
                                <label htmlFor="attendance">Absent</label>
                              </div>
                              <div className='grid'>
                                <input type="radio" name={`${data.studentId}-attendance`} id={`${data.studentId}-present`}
                                  checked={getAttendanceDetail(data.studentId) === 'present'}
                                  onChange={(e) => {
                                    const attendanceRecord = {
                                      studentId: data.studentId,
                                      studentName: data.studentName,
                                      courseId: data.courseId,
                                      courseName: data.courseName,
                                      batchId: data.batchId,
                                      batchName: data.batchName,
                                      date,
                                      status: e.target.value,

                                    }
                                    setAttendanceData((prev) => {
                                      const existingIndex = prev.findIndex(
                                        (item) => item.studentId === data.studentId
                                      )

                                      if (existingIndex !== -1) {
                                        const updated = [...prev]
                                        updated[existingIndex] = attendanceRecord
                                        return updated
                                      }

                                      return [...prev, attendanceRecord]
                                    })
                                  }}
                                  className='cursor-pointer' value={'present'} />
                                <label htmlFor="attendance">Present</label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )
                }
              </tbody>
            </table>
          }
        </div>
      </div>

    </div>
  )
}

export default AttendancePage