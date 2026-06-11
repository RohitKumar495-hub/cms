'use client'
import Modal from '../components/Modal'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import CourseForm from '../components/CourseForm'
import toast from 'react-hot-toast'
import { useCMS } from '@/context/CMSContext'
import { useCMSData } from '@/context/CMSDataContext'
import Table, { Column } from '../components/Table'
import { courseDataFormat } from '@/types/courseData'
import TopBar from '../components/TopBar'
import Container from '../components/Container'

const CoursesPage = () => {

    const { storedCourseData, setStoredCourseData, storedStudentData } = useCMSData()
    const { setEditId, openModal, setOpenModal, isSearching, setIsEditing } = useCMS()

    const handleDelete = (deleteCourseId: string) => {

        const hasStudents = storedStudentData.some((data) => data.courseId === deleteCourseId)

        if (hasStudents) {
            toast.error("Course is assigned to students, Pls remove the students.")
            return
        }

        const updatedCourse = storedCourseData.filter((data) => data.id !== deleteCourseId)
        setStoredCourseData(updatedCourse)
        toast.success("Course Deleted Successfully")
    }

    const courseColumns: Column<courseDataFormat>[] = [
        {
            header: "ID",
            accessor: "id"
        },
        {
            header: "Course Name",
            accessor: "courseName"
        },
        {
            header: "Duration",
            accessor: "duration"
        },
        {
            header: "Fees",
            accessor: "fees"
        },
        {
            header: "Actions",
            render: (course) => (<span>
                <button className='px-4 text-green-400 cursor-pointer' onClick={() => {
                    setOpenModal(true)
                    setIsEditing(true)
                    setEditId(course.id)
                }}><FaEdit /></button>
                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(course.id)}><MdDelete /></button>
            </span>
            )
        }
    ]

    const filteredCourses = storedCourseData.filter((course) =>
        course.courseName.toLowerCase().includes(isSearching.toLowerCase()) ||
        course.id.toLowerCase().includes(isSearching.toLowerCase()))

    return (
        <div className=''>
            <TopBar pageName='Courses Management' placeholder='Search Courses....' label='Add Courses' />

                <Container
                    children={
                        <Table
                            data={filteredCourses}
                            columns={courseColumns}
                        />
                    }
                />

            {
                openModal &&
                <Modal
                    heading='Add Courses'
                    children={<CourseForm />}
                />
            }
        </div>
    )
}

export default CoursesPage