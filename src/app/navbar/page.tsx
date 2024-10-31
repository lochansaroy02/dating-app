'use client'

import { LogIn, LogOut } from 'lucide-react'
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
        < div className='flex justify-end items-center p-4 z-50 w-fit fixed top-0 right-0'>


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