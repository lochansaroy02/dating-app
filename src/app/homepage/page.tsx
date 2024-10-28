"use client";

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

    async function fetchData() {
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
        if (data) {
            setData(data);
            console.log('Fetched data:', data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="grid grid-cols-2 gap-32">
                {data && data.map((user) => (
                    <div key={user.id}>
                        <div>
                            <div className="flex flex-row gap-4">
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


                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <h1 className="text-4xl font-bold">{user.name}</h1>
                                <p className="text-lg">{user.bio}</p>
                                {/* <p>{user.dob}</p> */}
                                <p className="text-lg">{user.gender}</p>
                                <div className="flex flex-row gap-4">
                                    <p className="text-lg">{user.relationship}</p>
                                    <p className="text-lg">{user.religion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
