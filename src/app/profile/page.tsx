'use client'

import { Trash2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Button } from '@/components/ui/button';


const CreateProfile = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [relationship, setRelationship] = useState("");
    const [religion, setReligion] = useState("");
    const [imageArray, setImageArray] = useState<string[]>([])
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isCreated, setIsCreated] = useState(false)


    const CLOUDINARY_URL = 'https://res.cloudinary.com/dcuiltdc8/image/upload/v1729951508/'
    const images = [
        { name: 'hands', url: 'dating/homepage/dhckldg24aatuawrciv8m' },
        { name: 'marrige', url: 'dating/homepage/qfc53tngkvngfyjabbnm.jpg' },
        { name: 'forhead', url: 'dating/homepage/xenoll1c5kn12rbpajax.jpg' },
        { name: 'umbrella', url: 'dating/homepage/invrdwckszzerw78zvqm.jpg' }
    ]


    const insertImage = async (thisPublicId: string) => {


        setImageArray(prevArray => {
            const updatedArray = [...prevArray, thisPublicId];
            console.log(updatedArray)
            return updatedArray;
        });
    }



    const handleChange = () => {
        console.log(isAdmin)
        setIsAdmin(!isAdmin)
    }



    const checkProfile = async () => {
        const user = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', 61)
            .single();
    }

    const handleSubmit = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData) {
            return;
        }
        const userId = userData.user?.id;
        const { data, error } = await supabase.from('users').insert({
            name: name,
            bio: bio,
            dob: dob,
            gender: gender,
            relationship: relationship,
            religion: religion,
            images: imageArray,
            user_Id: userId,
            isAdmin: isAdmin,
            profileImage: profileImage
        });
        if (error) {
            console.log(error)
        }
        if (data) {

        }

        alert('Profile created successfully');
        setTimeout(() => {
            redirect('/feed');
        }, 100);




    }

    const handleDeleteImage = async (image: string) => {

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData) {
            return;
        }
        const userId = userData.user?.id;
        const { data, error } = await supabase
            .from('users')
            .update({ images: imageArray.filter((img: string) => img !== image) })
            .eq('id', userId);

        if (error) {
            console.error('Error deleting image:', error);
        } else {
            checkProfile();
        }
    };
    useEffect(() => {
        checkProfile()
    }, [])


    return (
        <div className='flex  justify-start gap-8 overflow-x-'>

            <div className=" w-[50%] p-8 ">


                <div className="  grid grid-cols-2 m-12 gap-4  -mt-12  ">
                    <div className="flex flex-col gap-4">
                        <div className="row-span-2 w-[200px] h-[80px] bg-transparent">

                        </div>
                        <img className="w-[300px] h-[300px] object-cover rounded-xl" src={CLOUDINARY_URL + images[0].url} alt={images[0].name} />
                        <img className="w-[300px] h-[300px] object-cover rounded-xl" src={CLOUDINARY_URL + images[1].url} alt={images[1].name} />
                    </div>
                    <div className="flex flex-col gap-4">

                        <img className="w-[300px] h-[300px] object-cover rounded-xl" src={CLOUDINARY_URL + images[2].url} alt={images[2].name} />
                        <img className="w-[300px] h-[300px] object-cover rounded-xl" src={CLOUDINARY_URL + images[3].url} alt={images[3].name} />
                        <div className="w-[200px] h-[80px] row-span-2 bg-transparent">
                        </div>
                    </div>
                </div>
            </div>



            <div className="flex flex-col mt-20 gap-8  items-center  w-[50%]">
                <div>
                    <h1 className="text-4xl font-bold">
                        Create Your Profile
                    </h1>
                </div>
                <div className="flex  gap-8  text-black">

                    <div className="flex flex-col gap-4">

                        <div>
                            <label htmlFor="name" className="block mb-1 text-neutral-700">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="bio" className="block mb-1 text-neutral-700">Bio</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} id="bio" name="bio" rows={3} className="w-full px-3 py-2 border rounded-md"></textarea>
                        </div>
                        {/* <div>
                            <label htmlFor="dob" className="block mb-1 text-neutral-700">Date of Birth</label>
                            <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" id="dob" name="dob" className="w-full px-3 py-2 border rounded-md" />
                        </div> */}

                    </div>

                    <div className="flex flex-col gap-4">

                        <div>
                            <label htmlFor="gender" className="block mb-1 text-neutral-700">Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender" className="w-full px-3 py-2 border rounded-md">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="relationship" className="block mb-1 text-neutral-700">Type of Relationship</label>
                            <select value={relationship} onChange={(e) => setRelationship(e.target.value)} id="relationship" name="relationship" className="w-full px-3 py-2 border rounded-md">
                                <option value="">Select Relationship Type</option>
                                <option value="long-term">Long term</option>
                                <option value="casual">Fun and casual</option>
                                <option value="life-partner">Life partner</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="religion" className="block mb-1 text-neutral-700">Religion</label>
                            <select value={religion} onChange={(e) => setReligion(e.target.value)} id="religion" name="religion" className="w-full px-3 py-2 border rounded-md">
                                <option value="">Select Religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                                <option value="sikh">Sikh</option>
                                <option value="christian">Christian</option>
                                <option value="jain">Jain</option>
                                <option value="buddhist">Buddhist</option>
                            </select>
                        </div>
                        <div className=" flex items-center">
                            <label htmlFor="isAdmin" className=" text-sm text-neutral-700"> Admin</label>
                            <input onChange={handleChange} type="checkbox" checked={isAdmin} className="w-full px-3 py-2 border rounded-md" />
                        </div>


                    </div>



                </div>


                <div className='flex flex-col-reverse gap-4'>
                    <div className='bg-white text-black mt-4 p-2 rounded-lg    h-10 '>
                        <div className='flex  gap-4 bg-green-300'>
                            {
                                imageArray?.map((image: any, index: number) => (
                                    <div key={index} className="relative group ">
                                        <div className="absolute top-0 right-0">
                                            <Trash2 className="cursor-pointer" onClick={() => handleDeleteImage(image)} />
                                        </div>
                                        <img
                                            src={CLOUDINARY_URL + image}
                                            alt="profile"
                                            className="w-40 h-40 rounded-md"
                                        />
                                        <button
                                            className="bg-neutral-800 text-sm absolute bottom-1 left-1 z-10 text-neutral-200 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => {
                                                setProfileImage(image)
                                            }}
                                        >
                                            Set as profile picture
                                        </button>
                                    </div>

                                ))
                            }
                        </div>

                    </div>

                    <div className='flex flex-col gap-4'>
                        <CldUploadWidget uploadPreset="addUsers" onSuccess={({ event, info }) => {
                            if (event === "success") {
                                // @ts-expect-error: Let's ignore a compile error like this unreachable code
                                insertImage(info?.public_id)
                            }
                        }} onError={(error) => {
                            console.log(error)
                        }}

                        >
                            {({ open }) => {
                                return (
                                    <Button onClick={() => open()}>
                                        Upload  Images
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        <button onClick={async () => {
                            await handleSubmit()
                        }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Create Profile
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateProfile;
