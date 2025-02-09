'use client'

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../lib/supabase';





const Signup = () => {


    const [phoneNumber, setPhoneNumber] = useState('')
    const [success, setSuccess] = useState(false)
    const [code, setCode] = useState('')

    async function signInWithPhoneNumber() {


        let { data, error } = await supabase.auth.signInWithOtp({
            phone: phoneNumber
        })

        if (data) {
            setSuccess(true)
            console.log(data)
        }
        if (error) {
            console.log(error)
        }

    }


    const [isSignedIn, setIsSignedIn] = useState(false)
    const verifyCode = async () => {

        const {
            data: { session },
            error,
        } = await supabase.auth.verifyOtp({
            phone: phoneNumber,
            token: code,
            type: 'sms',
        })

        if (session) {
            alert('verified');
            redirect('/profile');

        }





    }

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }


    return (


        <div className='flex flex-col items-center mt-12 gap-4  '>
            <Button onClick={signInWithGoogle} ><span>Google</span>

            </Button>
            <div className='flex flex-col items-start'>
                <label htmlFor="">Phone Number</label>
                <input className='text-black px-2 py-1 bg-neutral-200 border  border-neutral-400 rounded-md ' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <button className='px-2 py-1 bg-blue-600 rounded-md text-white' onClick={signInWithPhoneNumber}>Signup</button>
            {
                success &&
                <div className='flex flex-col items-center '>
                    the code has been sent to {phoneNumber}
                    <div className='flex flex-col '>
                        <label htmlFor="">Code</label>
                        <input className='text-black px-2 py-1 bg-neutral-200 border  border-neutral-400 rounded-md ' value={code} type="text" onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <Button className='mt-4' onClick={verifyCode}>Verify</Button>
                </div>
            }
        </div>
    )
}

export default Signup
