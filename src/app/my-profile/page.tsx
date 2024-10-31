"use client";

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { CLOUDINARY_URL } from '../lib/constants';

const MyProfile = () => {
    const [adminData, setAdminData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<any>({});

    const getUser = async () => {
        const { data, error } = await supabase.from('users').select('*').eq('isAdmin', true);
        if (error) {
            console.error('Error fetching admin data:', error);
            return;
        }
        const adminData = data && data.length > 0 ? data[0] : null;
        if (adminData) {
            setAdminData(adminData);
            setEditedData(adminData); // Initialize editedData with fetched data
        }
        console.log(adminData)
    };

    useEffect(() => {
        getUser();
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

    return (
        <div className='flex flex-col p-4'>
            <h1>My Profile</h1>
            <div>
                {isEditing ? (
                    <>
                        <div>
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
                    </>
                ) : (
                    <>
                        <div>

                            <h2>Name: {adminData?.name}</h2>
                            <h2>Relationship: {adminData?.relationship}</h2>
                            <h2>Gender: {adminData?.gender}</h2>
                            <h2>Religion: {adminData?.religion}</h2>
                            <div className='flex  gap-2'>
                                {
                                    adminData?.images?.map((image: any, index: number) => (
                                        <img key={index} src={CLOUDINARY_URL + image} alt="profile" className='w-40 h-40 rounded-md' />
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
    );
};

export default MyProfile;
