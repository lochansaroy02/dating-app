"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { CLOUDINARY_URL } from "../lib/constants";

const HomePage = () => {
  
    const [data, setData] = useState<any[]>([]);
    const [like, setLike] = useState(null);

    async function fetchData() {
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
        if (data) {
            setData(data);
        }
    }

    // Updated likeUser function to accept user as parameter
    const likeUser = async (user: any) => {

        const { data, error } = await supabase.from('users').select('*').eq('isAdmin', true);
        if (error) {
            console.error('Error fetching admin data:', error);
            return;
        }

        const adminData = data && data.length > 0 ? data[0] : null;

        if (!adminData) {
            console.log('No admin user found');
            return;
        }

        const updatedLikes = [...(adminData.likes || []), user];
        const { data: updatedData, error: updateError } = await supabase
            .from("users")
            .update({ likes: updatedLikes })
            .eq('isAdmin', true);

        if (updateError) {
            console.error('Error updating likes:', updateError);
        } else {
            // console.log('User liked successfully:', updatedData);
        }

        // confirm before the user is liked by user ( pass a boolean variable to the function)
        const { data: thatUserData, error: thatUserError } = await supabase.from('users').select('*').eq('id', user.id);
        if (thatUserError) {
            console.error('Error fetching that user data:', thatUserError);
        }
        if (thatUserData) {
            console.log(thatUserData[0])
        }

        const thatUser = thatUserData && thatUserData.length > 0 ? thatUserData[0] : null;
        if (!thatUser) {
            console.log('No user found');
            return;
        } else {
            console.log(thatUser)
        }

        const updatedLikedBy = [...(thatUser.likedBy || []), adminData];
        const { data: updatedThatUserData, error: updatedThatUserError } = await supabase.from('users').update({ likedBy: updatedLikedBy }).eq('id', thatUser.id);
        if (updatedThatUserError) {
            console.error('Error updating likedBy:', updatedThatUserError);
        }
        else {
            console.log('User liked successfully:', updatedThatUserData);
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="grid grid-cols-2 gap-32">
                {data && data.map((user) => (
                    <div key={user.id}>
                        <div className="bg-neutral-200 flex flex-col border rounded-lg border-neutral-400">
                            <div className="flex flex-row justify-center px-12 gap-4">
                                <Carousel className="w-full max-w-xs">
                                    <CarouselContent>
                                        {user.images && user.images.map((image: string, index: number) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-2">
                                                            <img className="w-full h-full object-cover rounded-lg" src={CLOUDINARY_URL + image} alt="" />
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>

                            <div className="p-4 flex flex-col px-12 gap-2">
                                <h1 className="text-4xl font-bold">{user.name}</h1>
                                <p className="text-lg">{user.bio}</p>
                                <p className="text-lg">{user.gender}</p>
                                <div className="flex flex-row gap-4">
                                    <p className="text-lg">{user.relationship}</p>
                                    <p className="text-lg">{user.religion}</p>
                                </div>
                            </div>

                            <div className="flex flex-row justify-center gap-4 p-4">
                                <Button onClick={() => likeUser(user)}>
                                    Like
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
