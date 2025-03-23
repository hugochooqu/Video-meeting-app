'use server'

import { auth } from "@/lib/firebase";
import { StreamClient } from "@stream-io/node-sdk";
import { cookies } from "next/headers";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;



export const tokenProvider = async() => {

    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if(!apiKey) throw new Error('No API key!')
    if(!apiSecret) throw new Error('No API secret!')

    const client = new StreamClient(apiKey, apiSecret)

    const validity = 60 * 60;

    const token = client.generateUserToken({ user_id: String(userId), validity_in_seconds: validity });

    return token
}