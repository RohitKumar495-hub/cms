'use client'
import { useCMSData } from "@/context/CMSDataContext"
import { FaRupeeSign, FaUsers } from "react-icons/fa"
import { TiGroupOutline } from "react-icons/ti";
import { IoBookSharp } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";

export const statsCardData =  () => {
    
    const { totalStudents, totalCourses, totalTeachers, totalBatches ,totalRevenue } = useCMSData()

    return (
        [   
            { heading: 'Total Students', no:totalStudents, icon: FaUsers, description: '12 this month', bgColor:'bg-[#638cfd]'},
            { heading: 'Total Batches', no: totalBatches, icon: TiGroupOutline, description: '10 this month', bgColor: 'bg-blue-400'},
            { heading: 'Total Courses', no: totalCourses, icon: IoBookSharp, description: '10 this month', bgColor: 'bg-green-500'},
            { heading: 'Total Teachers', no: totalTeachers, icon: FaChalkboardTeacher, description: '2 this month', bgColor: 'bg-orange-400'},
            { heading: 'Total Revenue', no: totalRevenue, icon: FaRupeeSign, description: '12k this month', bgColor: 'bg-purple-500'}
        ]
    )
}