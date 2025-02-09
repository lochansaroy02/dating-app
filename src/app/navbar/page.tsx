'use client'

import { Button } from '@/components/ui/button'
import { useProfileStore } from '@/utils/Store'
import { LogIn, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CLOUDINARY_URL } from '../lib/constants'
import { supabase } from '../lib/supabase'
import { DarkToggle } from './DarkToggle'

const Navbar = () => {

    const { profileImage, fetchProfileImage } = useProfileStore();
    const [signInState, setSignInState] = useState(false)




    useEffect(() => {
        fetchProfileImage();
    }, [])

    const checkSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        if (data?.session) {
            const { error } = await supabase.auth.signOut();
            setSignInState(true)
            redirect('/')
        } else {
            setSignInState(false)
            redirect('/signup')
        }
    }

    const signOut = async () => {
        setSignInState(!signInState);
        redirect('/signup')
    }



    return (
        < div className='flex justify-end items-center gap-4 p-4 z-50 w-fit fixed top-0 right-0'>
            <div>
                <Button onClick={() => redirect('/profile')} className=' p-2 rounded-md'>
                    Add Profile
                </Button>
            </div>
            <div>
                <Button onClick={() => redirect('/feed')} className=' p-2 rounded-md'>
                    Feed
                </Button>
            </div>
            {/* {<div className='cursor-pointer bg-neutral-800 text-neutral-200   rounded-full justify-center items-center'>
                <button onClick={() => redirect('/my-profile')} className='flex items-center gap-2'>
                    <img src={CLOUDINARY_URL + profileImage} alt="" className='w-10 h-10 rounded-full' />
                </button>
            </div>} */}
            <Button onClick={checkSession} className='flex items-center gap-2 px-3 py-2  text-sm   rounded-md' >
                {!signInState ? <div className='flex items-center gap-2'>
                    <span>Logout</span>
                    <LogOut className='w-4 h-4' />
                </div> : <div className='flex items-center gap-2'>
                    <span>Login</span>
                    <LogIn className='w-4 h-4' />
                </div>}
            </Button >
            <DarkToggle />

        </div >
    )
}

export default Navbar