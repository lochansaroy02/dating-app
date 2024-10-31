'use client'
import { redirect } from 'next/navigation'


const page = () => {
  return (
    <div className='flex flex-col items-center  mt-32  h-screen'>

      <h1 className='text-4xl font-bold'>Home</h1>
      <p className='text-lg'>Welcome to the home page</p>


      <div className='flex gap-4'>
        <button onClick={() => {
          redirect('/profile')
        }} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Go to Profile
        </button>
        <button onClick={() => {
          redirect('/feed')
        }} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Go to Feed
        </button>
      </div>

    </div>
  )
}

export default page