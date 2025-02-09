import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const url = new URL(request.url);
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore,
    });
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            emailRedirectTo: `${url.origin}/auth/callback`
        }
    });


    //this will redirect to the signup page
    return NextResponse.redirect(
        url.origin, { // url.origin is the base url of the app
        status: 301,
    });
}
