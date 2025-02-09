

export default function Login() {


    

    return (
        <form className="flex items-center justify-center" action="/auth/signup" method="post">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label>Email</label>
                    <input className="border-2 text-black border-neutral-800 rounded-lg" type="email" name="email" />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input className="border-2 text-black border-neutral-800 rounded-lg" type="password" name="password" />
                </div>
                <button className="bg-neutral-800  text-white px-2 py-1 rounded-lg" type="submit">Sign in</button>
            </div>
        </form>
    )
}