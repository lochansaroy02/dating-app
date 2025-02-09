'use client'
import { useProfileStore } from '@/utils/Store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { getAdmin } from './api/getAdmin';
import { supabase } from './lib/supabase';

const page = () => {

  const setProfileImage = useProfileStore((state) => state.setProfileImage)

  const getAdminData = async () => {
    const adminData = await getAdmin();

  }

  const checkUser = async () => {
    const { data: {
      user
    } } = await supabase.auth.getUser();
    console.log(user)
  }
  const checkSession = async () => {
    const { data: {
      session
    } } = await supabase.auth.getSession();
    console.log(session)
  }


  const getProfilePicture = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      const { data: adminData } = await supabase
        .from('users')
        .select('profileImage')
        .eq('user_Id', data.user.id)
        .single();
      setProfileImage(adminData?.profileImage)
    }


  }
  useEffect(() => {
    getProfilePicture();
  }, [])
  useEffect(() => {
    // checkSession()
    checkUser()
    getAdminData();



  }, [])
  return (
    <div className='flex flex-col  items-center  mt-32  h-screen'>
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