'use client'
import { attendanceDataFormat } from "@/types/attendanceData";
import { batchDataFormat } from "@/types/batchData";
import { courseDataFormat } from "@/types/courseData";
import { studentDataFormat } from "@/types/studentData";
import { teacherDataFormat } from "@/types/teacherData";
import { ReactNode, useContext, createContext, useState, SetStateAction, useEffect } from "react";

interface CMSDataContextType {
    storedStudentData: studentDataFormat[]
    storedCourseData : courseDataFormat[]
    storedTeacherData : teacherDataFormat[]
    storedBatchData : batchDataFormat[]
    storedAttendanceData : attendanceDataFormat[]
    totalStudents: number
    totalCourses: number
    totalTeachers: number
    totalBatches: number
    totalRevenue: number
    setStoredStudentData: React.Dispatch<SetStateAction<studentDataFormat[]>>
    setStoredCourseData: React.Dispatch<SetStateAction<courseDataFormat []>>
    setStoredTeacherData : React.Dispatch<SetStateAction<teacherDataFormat []>>
    setStoredBatchData : React.Dispatch<SetStateAction<batchDataFormat []>>
    setStoredAttendanceData : React.Dispatch<SetStateAction<attendanceDataFormat []>>
}

const CMSDataContext = createContext<CMSDataContextType | undefined>(undefined)

interface CMSDataContextProvider {
    children: ReactNode
}

export const CMSDataProvider = ({ children }: CMSDataContextProvider) => {

    const [hydrated, setHydrated] = useState(false)
    const [storedStudentData, setStoredStudentData] = useState<studentDataFormat[]>([])
    const [storedCourseData, setStoredCourseData] = useState<courseDataFormat []>([])
    const [storedTeacherData, setStoredTeacherData] = useState<teacherDataFormat[]>([])
    const [storedBatchData, setStoredBatchData] = useState<batchDataFormat []>([])
    const [storedAttendanceData, setStoredAttendanceData] = useState<attendanceDataFormat []>([])

    const totalRevenue = storedStudentData.reduce((sum, student) => sum + Number(student.paidAmount), 0)


    useEffect(() => {
        const studentResponse = JSON.parse(localStorage.getItem('studentData') || '[]')
        const courseResponse = JSON.parse(localStorage.getItem('courseData') || '[]')
        const teacherResponse = JSON.parse(localStorage.getItem('teacherData') || '[]')
        const batchResponse = JSON.parse(localStorage.getItem('batchData') || '[]')
        const attendanceResponse = JSON.parse(localStorage.getItem('attendanceData') || '[]')

        setStoredCourseData(courseResponse)
        setStoredStudentData(studentResponse)
        setStoredTeacherData(teacherResponse)
        setStoredBatchData(batchResponse)
        setStoredAttendanceData(attendanceResponse)

        setHydrated(true)
        
    }, [])

    useEffect(() => {

        if(!hydrated) return
        localStorage.setItem('studentData', JSON.stringify(storedStudentData))
        localStorage.setItem('courseData', JSON.stringify(storedCourseData))
        localStorage.setItem('teacherData', JSON.stringify(storedTeacherData))
        localStorage.setItem('batchData', JSON.stringify(storedBatchData))
        localStorage.setItem('attendanceData', JSON.stringify(storedAttendanceData))

    }, [storedStudentData, storedCourseData, storedTeacherData, storedBatchData, storedAttendanceData])

    return (
        <CMSDataContext.Provider
            value={{
                storedStudentData,
                setStoredStudentData,
                storedCourseData,
                setStoredCourseData,
                storedTeacherData,
                setStoredTeacherData,
                storedBatchData,
                setStoredBatchData,
                storedAttendanceData,
                setStoredAttendanceData,
                totalStudents: storedStudentData.length,
                totalCourses: storedCourseData.length,
                totalTeachers: storedTeacherData.length,
                totalBatches: storedBatchData.length,
                totalRevenue
            }}
        >
            {children}
        </CMSDataContext.Provider >
    )

}

export const useCMSData = () => {
    const context = useContext(CMSDataContext)

    if (!context) {
        throw new Error("useCMSData must be used inside CMSDataProvider")
    }

    return context
}

export default CMSDataContext