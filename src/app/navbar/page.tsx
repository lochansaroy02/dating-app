'use client'

import { Link, LogIn, LogOut, User } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const Navbar = () => {


    const [signInState, setSignInState] = useState(false)


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
        setSignInState(!signInState)




    }

    return (
        < div className='flex justify-end items-center gap-4 p-4 z-50 w-fit fixed top-0 right-0'>
            <div>
                <button onClick={() => redirect('/feed')} className='bg-neutral-800 text-neutral-200 p-2 rounded-md'>
                    Feed
                </button>
            </div>
            <div className='cursor-pointer bg-neutral-800 text-neutral-200 p-2 rounded-full justify-center items-center'>
                <button onClick={() => redirect('/my-profile')} className='flex items-center gap-2'>
                    <User className='w-6 h-6 ' />
                </button>
            </div>
            <button onClick={checkSession} className='flex items-center gap-2 px-3 py-2  text-sm bg-neutral-800  rounded-md text-neutral-100' >
                {!signInState ? <div className='flex items-center gap-2'>
                    <span>Logout</span>
                    <LogOut className='w-4 h-4' />
                </div> : <div className='flex items-center gap-2'>
                    <span>Login</span>
                    <LogIn className='w-4 h-4' />
                </div>}
            </button >


        </div >
    )
}

export default Navbar