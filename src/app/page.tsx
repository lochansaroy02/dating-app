'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"




const page = () => {
  return (
    <div className='flex flex-col items-center justify-center  h-screen'>

      <h1 className='text-4xl font-bold'>Home</h1>
      <p className='text-lg'>Welcome to the home page</p>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
        <Link href='/profile'>Go to Profile</Link>
      </button>

    </div>
  )
}

export default page