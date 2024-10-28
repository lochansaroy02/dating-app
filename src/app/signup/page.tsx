'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';





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
            console.log(session);
            alert('verified');
            redirect('/profile');

        }





    }


    return (


        <div className='flex flex-col items-center mt-12 gap-4  '>
            <div className='flex flex-col items-start'>
                <label htmlFor="">Phone Number</label>
                <input className='text-black px-2 py-1 rounded-md ' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <button className='px-2 py-1 bg-blue-600 rounded-md text-white' onClick={signInWithPhoneNumber}>Signup</button>
            {
                success && <div>
                    the code has been sent to {phoneNumber}
                    <div>
                        <input className='text-black' value={code} type="text" onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <button onClick={verifyCode}>Verify</button>
                </div>
            }
        </div>
    )
}

export default Signup
