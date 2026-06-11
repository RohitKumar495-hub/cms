'use client'
import AdminAuth from '@/app/admin/utils/AdminAuth'
import { studentDataFormat } from '@/types/studentData'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaGraduationCap } from 'react-icons/fa'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleTabChange = () => {
    if (isLogin === true) {
      setIsLogin(false)
      return
    }

    setIsLogin(true)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (isLogin) {

      if (userData.email.trim() === '') {
        alert("Email is required")
        return
      }

      if (userData.password.trim() === '') {
        alert("Password is requried")
        return
      }

      const response = localStorage.getItem('user')
      const studentResponse = JSON.parse(localStorage.getItem('studentData') || '[]')

      if(studentResponse) {
        const studentRecord = studentResponse?.find((data : studentDataFormat ) => data.studentId === userData.email )

        if(userData.email === studentRecord?.studentId && userData.password === studentRecord.password) {
          toast.success("Student Login Successfull")
          localStorage.setItem('studentToken', 'studentLoggedIn')
          router.push('/')

          return
        }
      } 

      if (response) {

        const user = JSON.parse(response)

        if (user.email === userData.email && user.password === userData.password) {
          alert("Login Successfull")
          localStorage.setItem('token', 'loggedIn')
          router.push('/')
          console.log('formData', userData)
          setUserData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          })
        }
        else {
          alert("Email or password is incorrect")
        }

        return
      }

    }

    if (userData.fullName.trim() === '') {
      alert("Full Name is requried")
      return
    }

    if (userData.email.trim() === '') {
      alert("Email is required")
      return
    }

    if (userData.password.trim() === '') {
      alert("Password is requried")
      return
    }

    if (userData.confirmPassword.trim() === '') {
      alert("Confirm Password is requried")
      return
    }

    console.log("formData", userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setUserData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    alert("User registered successfully")
    setIsLogin(true)

  }

  return (
    <AdminAuth>
      <div className='grid md:grid-cols-2 w-full h-screen'>
        <div className='bg-linear-to-b from-[#6564C8] to-[#365AB5] hidden rounded-r-md text-white md:flex flex-col justify-center items-center gap-8'>
          <FaGraduationCap color='black' size={80} />
          <h1 className='text-4xl font-bold text-center'>Coaching Management <br /> System</h1>
          <p className='font-semibold text-xl text-center'>Smart way to manage your <br /> coaching institue</p>
        </div>
        <div className='flex items-center justify-center'>

          <div className='border-2 bg-[ #2563EB] max-w-lg lg:w-lg border-gray-200 h-auto rounded-lg'>

            {/* login and signup tab */}
            <div className='grid grid-cols-2'>
              <button className={`text-center w-full cursor-pointer py-2 rounded-b hover:text-white hover:bg-[#4338CA] ${isLogin ? 'font-semibold bg-[#4F46E5] text-white rounded-l-lg' : ''}`} onClick={handleTabChange}>Login</button>
              <button className={`text-center w-full cursor-pointer py-2 rounded-b hover:bg-[#4338CA] hover:text-white ${isLogin ? '' : 'font-semibold bg-[#4F46E5] text-white rounded-r-lg'}`} onClick={handleTabChange}>Signup</button>
            </div>

            <div className='p-6'>

              {/* welcome back and create your account text */}
              <div className='grid place-items-center justify-center mt-6'>
                <h1 className='font-bold text-2xl'>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h1>
                <p className='font-bold text-gray-500 text-sm'>{isLogin ? 'Login to continue' : 'Get started with your account'}</p>
              </div>

              <form className='grid place-items-center w-full mt-6 gap-3 mb-6' onSubmit={handleSubmit}>

                {/* only visible for signup tab */}
                <div className={`grid max-w-md w-full ${isLogin ? 'hidden' : 'block'}`}>
                  <label htmlFor="fullName" className='font-semibold'>Full Name</label>
                  <input type="text" className='border-2 rounded border-gray-300 px-2 py-1 outline-none' id='fullName' name={'fullName'} value={userData.fullName}
                    onChange={(e) => setUserData((prev) => ({ ...prev, fullName: e.target.value }))} />
                </div>

                <div className='grid max-w-md w-full'>
                  <label htmlFor="email" className='font-semibold'>Email</label>
                  <input type="text" className='border-2 rounded border-gray-300 px-2 py-1 outline-none' id='email' name='email' value={userData.email}
                    onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className='grid max-w-md w-full'>
                  <label htmlFor="password" className='font-semibold'>Password</label>
                  <input type="password" className='border-2 rounded border-gray-300 px-2 py-1 outline-none' id='password' name='password' value={userData.password}
                    onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>

                {/* only visible for signup tab */}
                <div className={`grid max-w-md w-full ${isLogin ? 'hidden' : 'block'}`}>
                  <label htmlFor="confirm-password" className='font-semibold'>Confirm Password</label>
                  <input type="password" className='border-2 rounded border-gray-300 px-2 py-1 outline-none' id='confirm-password' name='confirm-password' value={userData.confirmPassword}
                    onChange={(e) => setUserData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>

                <button className='bg-[#4F46E5] hover:bg-[#4338CA] text-white px-2 py-1.5 rounded w-full max-w-md font-semibold cursor-pointer' type='submit'>{isLogin ? 'Login' : 'Signup'}</button>
              </form>
            </div>


          </div>
        </div>
      </div>
    </AdminAuth>
  )
}

export default AuthPage