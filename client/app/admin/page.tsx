'use client'
import { useCMSData } from "@/context/CMSDataContext"
import Header from "./components/Header"
import StatsCard from "./components/StatsCard"
import { statsCardData } from "./data/statsData"
import Table, { Column } from "./components/Table"
import { studentDataFormat } from "@/types/studentData"
import Link from "next/link"
import { courseDataFormat } from "@/types/courseData"
import { useCMSTheme } from "@/context/CMSThemeContext"
import ProgressCharts from "./components/ProgressCharts"

const Home = () => {

    const { theme } = useCMSTheme()

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
            header: "Batch",
            accessor: "batchName"
        },
        {
            header: "Status",
            render: (student) => (
                <span
                    className={
                        student.status.toLowerCase() === "active"
                            ? "text-green-600 font-semibold bg-green-50 px-1 py-1 rounded"
                            : "text-red-500 font-semibold"
                    }
                >
                    {student.status}
                </span>
            )
        },
        {
            header: "Joined On",
            accessor: "joinedOn"
        }
    ]

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
    ]

    const stats = statsCardData()
    const { storedStudentData, storedCourseData } = useCMSData()
    const latestStudents = [...storedStudentData]
        .sort((a, b) => Number(b.joinedOn) - Number(a.joinedOn))
        .slice(0, 5);

    const latestCourses = [...storedCourseData].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 5)

    return (
        <div>
            <Header pageName="Dashboard" />
            <div className="px-2 py-2 md:px-4 md:py-4 grid gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6 place-items-center">
                    {
                        stats.map((data, index) => {
                            return (
                                <StatsCard
                                    key={index}
                                    heading={data.heading}
                                    description={data.description}
                                    no={data.no}
                                    bgColor={data.bgColor}
                                    Icon={data.icon}
                                />
                            )
                        })
                    }
                </div>

                    <ProgressCharts/>
                <div className="grid lg:grid-cols-2 gap-2 md:gap-6 p-1 min-w-0">


                    <div className={`flex flex-col gap-3 ${theme === 'light' ? 'bg-white' : 'bg-[#273549]'} rounded-md p-4 min-w-0`}>
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm font-semibold">Recent Students</h1>
                            <Link href={'/admin/students'} className={`${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-200 text-[#4F46E5]' } px-2 py-1 text-xs rounded-md cursor-pointer  hover:font-semibold`}>View All</Link>
                        </div>
                        <Table
                            data={latestStudents}
                            columns={studentColumns}
                        />
                    </div>

                    <div className={`flex flex-col gap-3 ${theme === 'light' ? 'bg-white' : 'bg-[#273549]'} rounded-md p-4 min-w-0`}>
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm font-semibold">Recent Courses</h1>
                            <Link href={'/admin/courses'} className={`${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-200 text-[#4F46E5]' } px-2 py-1 text-xs rounded-md cursor-pointer  hover:font-semibold`}>View All</Link>
                        </div>
                        <Table
                            data={latestCourses}
                            columns={courseColumns}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home