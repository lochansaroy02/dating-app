
const page = () => {
    return (
        <div className=' mt-12  p-4 h-screen'>
            <div className='text-white flex  bg-neutral-800 justify-center h-full'>
                <div className='w-1/4 bg-neutral-900 border-r flex flex-col gap-2  border-neutral-700 p-2 '>
                    <div className='flex justify-between items-center bg-red-500'>
                        <h1 className='text-2xl font-bold '>Users</h1>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='bg-neutral-700 p-2 rounded-md'>user 1</div>
                        <div className='bg-neutral-700 p-2 rounded-md'>user 2</div>
                        <div className='bg-neutral-700 p-2 rounded-md'>user 3</div>
                    </div>
                </div>
                <div className='w-3/4 bg-neutral-900 p-2 '>chat</div>
            </div>
        </div>
    )
}

export default page