'use client'
import Header from '../components/Header'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { FaEdit, FaPlus } from 'react-icons/fa'
import Modal from '../components/Modal'
import BatchForm from '../components/BatchForm'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'
import { useCMSData } from '@/context/CMSDataContext'
import { batchDataFormat } from '@/types/batchData'
import { useCMS } from '@/context/CMSContext'
import Table, { Column } from '../components/Table'
import TopBar from '../components/TopBar'
import Container from '../components/Container'

const BatchPage = () => {

    const { openModal, setOpenModal, setIsEditing, setEditId, isSearching } = useCMS()
    const { storedBatchData, setStoredBatchData, storedStudentData } = useCMSData()

    const filteredBatchData = storedBatchData.filter((data) =>
        data.batchId.toLowerCase().includes(isSearching) ||
        data.batchName.toLowerCase().includes(isSearching) ||
        data.courseName.toLowerCase().includes(isSearching) ||
        data.teacherName.toLowerCase().includes(isSearching)
    )

    const handleDelete = (deletedId: string) => {

        const isAssign = storedStudentData.some((data) => data.batchId === deletedId)

        if (isAssign) {
            toast.error("Batch is assigned to students. Reassign or remove the students first.")
            return
        }

        const updatedData = storedBatchData.filter((data: batchDataFormat) => data.batchId !== deletedId)
        setStoredBatchData(updatedData)
        toast.success("Batch Deleted Successfully")
    }

    const batchColumns: Column<batchDataFormat>[] = [
        {
            header: "ID",
            accessor: "batchId"
        },
        {
            header: "Batch Name",
            accessor: "batchName"
        },
        {
            header: "Course Name",
            accessor: "courseName"
        },
        {
            header: "Teacher Name",
            accessor: "teacherName"
        },
        {
            header: "Max Students",
            accessor: "maxStudents"
        },
        {
            header: "Starting Date",
            accessor: "startingDate"
        },
        {
            header: "Ending Date",
            accessor: "endingDate"
        },
        {
            header: "Status",
            render: (batch) => (
                <span
                    className={
                        batch.status.toLowerCase() === "active"
                            ? "text-green-600 font-semibold bg-green-50 px-1 py-1 rounded"
                            : "text-red-500 font-semibold bg-red-50 px-1 py-1 rounded"
                    }
                >
                    {batch.status}
                </span>
            )
        },
        {
            header: "Actions",
            render: (batch) => (<span>
                <button className='px-4 text-green-400 cursor-pointer' onClick={() => {
                    setOpenModal(true)
                    setIsEditing(true)
                    setEditId(batch.batchId)
                }}><FaEdit /></button>
                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(batch.batchId)}><MdDelete /></button>
            </span>
            )
        }
    ]

    return (
        <div>
            <TopBar pageName='Batch Management' placeholder='Search Batch...' label='Add Batch' />
            <Container
                children={
                    <Table
                        data={filteredBatchData}
                        columns={batchColumns}
                    />
                }
            />

            {
                openModal &&
                <Modal
                    heading='Add Batch'
                    children={<BatchForm />}
                />
            }
        </div>
    )
}

export default BatchPage