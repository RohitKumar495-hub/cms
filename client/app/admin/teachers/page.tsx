'use client'
import { FaEdit } from 'react-icons/fa'
import Modal from '../components/Modal'
import TeachersForm from '../components/TeachersForm'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'
import { useCMSData } from '@/context/CMSDataContext'
import { useCMS } from '@/context/CMSContext'
import { teacherDataFormat } from '@/types/teacherData'
import Table, { Column } from '../components/Table'
import TopBar from '../components/TopBar'
import Container from '../components/Container'

const TeachersPage = () => {

    const { storedTeacherData, setStoredTeacherData, storedBatchData } = useCMSData()
    const { setEditId, openModal, setOpenModal, isSearching, setIsEditing } = useCMS()

    const teacherColumns: Column<teacherDataFormat>[] = [
        {
            header: "ID",
            accessor: "teacherId"
        },
        {
            header: "Teacher Name",
            accessor: "teacherName"
        },
        {
            header: "Course",
            accessor: "subject"
        },
        {
            header: "Mobile",
            accessor: "mobile"
        },
        {
            header: "Status",
            render: (teacher) => (
                <span
                    className={
                        teacher.status.toLowerCase() === "active"
                            ? "text-green-600 font-semibold bg-green-50 px-1 py-1 rounded"
                            : "text-red-500 font-semibold bg-red-50 px-1 py-1 rounded"
                    }
                >
                    {teacher.status}
                </span>
            )
        },
        {
            header: "Joined On",
            accessor: "joinedOn"
        },
        {
            header: "Actions",
            render: (teacher) => (<span>
                <button className='px-4 text-green-400 cursor-pointer' onClick={() => {
                    setOpenModal(true)
                    setIsEditing(true)
                    setEditId(teacher.teacherId)
                }}><FaEdit /></button>
                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(teacher.teacherId)}><MdDelete /></button>
            </span>
            )
        }
    ]

    const filteredTeacherData = storedTeacherData.filter((data) =>
        data.teacherId.toLowerCase().includes(isSearching.toLowerCase()) ||
        data.teacherName.toLowerCase().includes(isSearching.toLowerCase()))
        .sort((a, b) => Number(b.teacherId) - Number(a.teacherId))

    const handleDelete = (deleteId: string) => {

        const isAssigned = storedBatchData.some(
            (batch) =>
                batch.teacherId === deleteId
        )

        if (isAssigned) {
            toast.error(
                "Teacher is assigned to a batch. Reassign or remove the batch first."
            );
            return;
        }

        const updatedData = storedTeacherData.filter(
            (data) => data.teacherId !== deleteId
        );

        setStoredTeacherData(updatedData);

        toast.success(
            "Record Deleted Successfully"
        );
    };

    return (
        <div>
            <TopBar pageName='Teachers Management' placeholder='Search Teachers....' label='Add Teachers' />
            <Container
                children={<Table
                    data={filteredTeacherData}
                    columns={teacherColumns}
                />}
            />

            {
                openModal && <Modal
                    heading='Add Teacher'
                    children={<TeachersForm />}
                />
            }
        </div>
    )
}

export default TeachersPage