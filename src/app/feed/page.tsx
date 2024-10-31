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


const HomePage = () => {
    const CLOUDINARY_URL = 'https://res.cloudinary.com/dcuiltdc8/image/upload/v1729951508/';
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
        console.log(data)
    }

    // initially likes is null so i need to press like button twice to like the user
    const likeUser = async () => {
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

        const updatedLikes = [...(adminData.likes || []), like];
        const { data: updatedData, error: updateError } = await supabase
            .from("users")
            .update({ likes: updatedLikes })
            .eq('isAdmin', true);

        console.log("Updated likes:", updatedLikes);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="grid grid-cols-2 gap-32 ">
                {data && data.map((user) => (
                    <div className=" " key={user.id}>
                        <div className="bg-neutral-200 flex flex-col border  rounded-lg  border-neutral-400">
                            <div className="flex flex-row justify-center  px-12  gap-4">
                                <Carousel className="w-full max-w-xs">
                                    <CarouselContent>
                                        {user.images && user.images.map((image: string, index: number) => (
                                            <CarouselItem key={index}>

                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex  aspect-square items-center justify-center p-2">
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


                            </div >

                            <div className="p-4 flex flex-col px-12   gap-2">
                                <h1 className="text-4xl font-bold">{user.name}</h1>
                                <p className="text-lg">{user.bio}</p>
                                {/* <p>{user.dob}</p> */}
                                <p className="text-lg">{user.gender}</p>
                                <div className="flex flex-row gap-4">
                                    <p className="text-lg">{user.relationship}</p>
                                    <p className="text-lg">{user.religion}</p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center gap-4 p-4">
                                <Button onClick={
                                    () => {
                                        setLike(user)
                                        likeUser()
                                    }
                                }>Like</Button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
