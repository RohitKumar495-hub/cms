'use client'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaEdit } from 'react-icons/fa'
import Modal from '../components/Modal'
import FeesForm from '../components/FeesForm'
import InputBox from '../components/InputBox'
import { useCMSData } from '@/context/CMSDataContext'
import { studentDataFormat } from '@/types/studentData'
import { useCMS } from '@/context/CMSContext'
import Table, { Column } from '../components/Table'
import Container from '../components/Container'
import { useCMSTheme } from '@/context/CMSThemeContext'

const FeesPage = () => {

  const { setIsEditing, setEditId, openModal, setOpenModal, isSearching, setIsSearching } = useCMS()
  const { theme } = useCMSTheme()

  const { storedStudentData, setStoredStudentData } = useCMSData()
  const studentColumns: Column<studentDataFormat>[] = [
    {
      header: "ID",
      accessor: "studentId"
    },
    {
      header: "Student Name",
      accessor: "studentName"
    },
    {
      header: "Course Name",
      accessor: "courseName"
    },
    {
      header: "Course Fees",
      accessor: "courseFee"
    },
    {
      header: "Paid Amount",
      accessor: "paidAmount"
    },
    {
      header: "Due Amount",
      accessor: "dueAmount"
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
      </span>
      )
    }
  ]


  const filteredData = storedStudentData.filter((data) =>
    data.studentId.toLowerCase().includes(isSearching.toLowerCase()) ||
    data.studentName.toLowerCase().includes(isSearching.toLowerCase()) ||
    data.courseName.toLowerCase().includes(isSearching.toLowerCase())
  )


  useEffect(() => {
    setStoredStudentData(storedStudentData)
  }, [openModal])

  return (
    <div>
      <Header pageName='Fees Management' />
      <div className='grid gap-3 p-4'>
        <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#273549]'} p-4 flex justify-between items-center rounded-md`}>
          <div>
            <InputBox
              type='text'
              placeholder='Search.....'
              id='searchText'
              value={isSearching}
              onChange={(e) => setIsSearching(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Container
        children={
          <Table
            data={filteredData}
            columns={studentColumns}
          />

        }
      />



      {
        openModal &&
        <Modal
          heading='Add Fess'
          children={
            <FeesForm />}
        />
      }
    </div>
  )
}

export default FeesPage