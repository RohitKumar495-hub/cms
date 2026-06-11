import { FaSpinner } from "react-icons/fa"


const Loading = () => {
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center">
        <FaSpinner size={30} className="animate-spin"/>
        <p className="text-2xl font-semibold">Loading....</p>
      </div>
    </div>
  )
}

export default Loading