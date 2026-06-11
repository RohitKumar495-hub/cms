'use client'
import { FaEdit } from 'react-icons/fa'
import Modal from '../components/Modal'
import StudentForm from '../components/StudentForm'
import { useCMSData } from '@/context/CMSDataContext'
import { useCMS } from '@/context/CMSContext'
import { studentDataFormat } from '@/types/studentData'
import Table, { Column } from '../components/Table'
import TopBar from '../components/TopBar'
import Container from '../components/Container'

const StudentsPage = () => {

    const studentColumns: Column<studentDataFormat>[] = [
        {
            header: "ID",
            accessor: "studentId"
        },
        {
            header: "Name",
            accessor: "studentName"
        },
        {
            header: "Course",
            accessor: "courseName"
        },
        {
            header: "Course Id",
            accessor: "courseId"
        },
        {
            header: "Batch",
            accessor: "batchName"
        },
        {
            header: "Batch Id",
            accessor: "batchId"
        },
        {
            header: "Mobile",
            accessor: "mobile"
        },
        {
            header: "Status",
            render: (student) => (
                <span
                    className={
                        student.status.toLowerCase() === "active"
                            ? "text-green-600 font-semibold bg-green-50 px-1 py-1 rounded"
                            : "text-red-500 font-semibold bg-red-50 px-1 py-1 rounded"
                    }
                >
                    {student.status}
                </span>
            )
        },
        {
            header: "Joined On",
            accessor: "joinedOn"
        },
        {
            header: "Actions",
            render: (student) => (<span>
                <button className='px-4 text-green-400 cursor-pointer' onClick={() => {
                    setOpenModal(true)
                    setIsEditing(true)
                    setEditId(student.studentId)
                }}><FaEdit /></button>
                {/* <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(student.studentId)}><MdDelete /></button>  */}
            </span>
            )
        }
    ]

    const { storedStudentData, setStoredStudentData } = useCMSData()
    const { openModal, setOpenModal, setIsEditing, setEditId, isSearching } = useCMS()
    const filteredStudents = [...storedStudentData].filter((data) =>
        data.studentId.toLowerCase().includes(isSearching.toLowerCase()) ||
        data.studentName.toLocaleLowerCase().includes(isSearching.toLowerCase()))
        .sort((a, b) => Number(b.joinedOn) - Number(a.joinedOn))


    // const handleDelete = (deleteId: string) => {
    //     const updatedStudentData = storedStudentData.filter((data) => data.studentId !== deleteId)
    //     toast.success("Record Deleted Successfully")
    //     setStoredStudentData(updatedStudentData)
    // }

    return (
        <div>
            <TopBar pageName='Students Management' placeholder='Search Students....' label='Add Student' />
            <div className='px-4'>
                <Container
                    children={
                        <Table
                            data={filteredStudents}
                            columns={studentColumns}
                        />
                    }
                />
            </div>
            {
                openModal && (
                    <Modal
                        heading='Add Student'
                        children={<StudentForm />}
                    />
                )
            }
        </div>
    )
}

export default StudentsPage