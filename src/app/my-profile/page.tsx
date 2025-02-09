"use client";

import { Button } from '@/components/ui/button';
import { useProfileStore } from '@/utils/Store';
import { Trash2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { getAdmin } from '../api/getAdmin';
import { CLOUDINARY_URL } from '../lib/constants';
import { supabase } from '../lib/supabase';

const MyProfile = () => {
    const { setProfileImage } = useProfileStore();
    const [adminData, setAdminData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<any>({});
    const [imageArray, setImageArray] = useState<string[]>([]);



    const insertImage = async (thisPublicId: string) => {

        setImageArray(prevArray => {
            const updatedArray = [...prevArray, thisPublicId];
            return updatedArray;
        });
    }


    const changeProfileImage = async (image: string) => {
        const { data, error } = await supabase
            .from('users')
            .update({ profileImage: image })
            .eq('id', adminData.id);

        if (error) {
            console.error('Error updating profile image:', error);
        } else {
            // Update the profile image in the store
            setProfileImage(image);
        }
    };


    const getAdminData = async () => {
        const adminData = await getAdmin();
        setAdminData(adminData);
        setEditedData(adminData);
    }

    useEffect(() => {
        getAdminData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const { data, error } = await supabase
            .from('users')
            .update(editedData)
            .eq('id', adminData.id);

        if (error) {
            console.error('Error updating admin data:', error);
        } else {
            setAdminData(editedData); // Update state with saved data
            setIsEditing(false); // Exit edit mode
        }
    };

    const handleDeleteImage = async (image: string) => {
        const { data, error } = await supabase
            .from('users')
            .update({ images: adminData.images.filter((img: string) => img !== image) })
            .eq('id', adminData.id);

        if (error) {
            console.error('Error deleting image:', error);
        } else {
            getAdminData();
        }
    };



    return (
        <div className='flex p-4   flex-col justify-center gap-4  '>
            <div className='flex flex-col p-4'>
                <div>
                    {isEditing ? (
                        <div className='flex flex-col items-start gap-4 outline outline-1 outline-neutral-800 p-4 rounded-md'>
                            <div className='text-lg text-neutral-800'>
                                edit your profile
                            </div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name || ''}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </label>
                            <label>
                                Relationship:
                                <input
                                    type="text"
                                    name="relationship"
                                    value={editedData.relationship || ''}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </label>
                            <label>
                                Gender:
                                <input
                                    type="text"
                                    name="gender"
                                    value={editedData.gender || ''}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </label>
                            <label>
                                Religion:
                                <input
                                    type="text"
                                    name="religion"
                                    value={editedData.religion || ''}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded"
                                />
                            </label>
                            <div className='flex flex-col gap-4'>

                                <div className='flex flex-col gap-4 outline outline-1 outline-neutral-800 p-4 rounded-md'>


                                    <div className='flex  gap-2'>
                                        {
                                            adminData?.images?.map((image: any, index: number) => (
                                                <div key={index} className="relative group">
                                                    <div className="absolute top-0 right-0">
                                                        <Trash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDeleteImage(image)} />
                                                    </div>
                                                    <img
                                                        src={CLOUDINARY_URL + image}
                                                        alt="profile"
                                                        className="w-40 h-40 rounded-md"
                                                    />
                                                    <button
                                                        className="bg-neutral-800 text-sm absolute bottom-1 left-1 z-10 text-neutral-200 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => {
                                                            changeProfileImage(image)
                                                        }}
                                                    >
                                                        Set as profile picture
                                                    </button>
                                                </div>

                                            ))
                                        }
                                    </div>


                                    <div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='flex flex-col gap-2'>
                                <div>

                                    <h2>Name: {adminData?.name}</h2>
                                    <h2>Relationship: {adminData?.relationship}</h2>
                                    <h2>Gender: {adminData?.gender}</h2>
                                    <h2>Religion: {adminData?.religion}</h2>
                                </div>
                                <div className='flex gap-2'>
                                    {
                                        adminData?.images?.map((image: any, index: number) => (
                                            <img key={index} src={CLOUDINARY_URL + image} alt="profile" className="w-40 h-40 rounded-md" />
                                        ))
                                    }
                                </div>


                            </div>
                        </>
                    )}
                </div>


                <div className='mt-4'>
                    {isEditing ? (
                        <Button onClick={handleSave} className='bg-neutral-800 text-neutral-200 p-2 rounded-md'>
                            Save Changes
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setIsEditing(true)}
                            className='bg-neutral-800 text-neutral-200 p-2 rounded-md'
                        >
                            Edit Profile
                        </Button>
                    )}
                    {isEditing && (
                        <Button
                            onClick={() => setIsEditing(false)}
                            className='bg-gray-400 text-neutral-200 p-2 rounded-md ml-2'
                        >
                            Cancel
                        </Button>
                    )}
                </div>


            </div>

            <div className='flex flex-col p-4'>
                {!isEditing && (
                    <div>
                        <h1>My Friends</h1>
                        <div className='flex flex-col gap-4'>
                            {
                                adminData?.likes?.map((friend: any, index: number) => (
                                    <div key={index}>
                                        <h2>{friend.name}</h2>
                                        <h2>{friend.relationship}</h2>
                                        <h2>{friend.gender}</h2>
                                        <h2>{friend.religion}</h2>
                                        <div className='flex gap-2'>
                                            {
                                                <img key={index} src={CLOUDINARY_URL + friend.images[0]} alt="profile" className="w-40 h-40 rounded-md" />

                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
