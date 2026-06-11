'use client'
import Loading from '@/app/loading'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const AdminAuth = ({ children }: { children: React.ReactNode }) => {

    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [studentToken, setStudentToken] = useState<string | null>(null)
    const [teacherToken, setTeacherToken] = useState<string | null>(null)
    const router = useRouter()
    const pathName = usePathname()


    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setStudentToken(localStorage.getItem('studentToken'))
        setTeacherToken(localStorage.getItem('teacherToken'))
        console.log(token)
        console.log(studentToken)
        console.log(teacherToken)
        setLoading(false)
    }, [])

    useEffect(() => {

        if (loading) return

        if (token && pathName === '/') {
            router.push('/admin')
            toast.success("Permission Denied")
            return
        }

        if (studentToken && pathName === '/admin') {
            router.push('/')
            toast.error("Permission Denied")
            return
        }

        if (token && pathName.startsWith('/student')) {
            router.push('/admin')
            toast.success("Permission Denied")
            return
        }

        if (studentToken && pathName.startsWith('/admin')) {
            router.push('/')
            toast.error("Permission Denied")
            return
        }

        if (teacherToken && pathName.startsWith('/teacher')) {
            router.push('/teacher')
            toast.success("Permission Denied")
            return
        }

    }, [token, pathName, studentToken])

    if (loading) return <Loading />

    return (
        <>
            {children}
        </>
    )
}

export default AdminAuth