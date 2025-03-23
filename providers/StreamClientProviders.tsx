'use client'

import { tokenProvider } from "@/actions/stream.actions";
import { useAuth } from "@/actions/user.action";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const {user, loading} = useAuth()

  useEffect(() => {
    if (loading) return; // 🚨 Don't run the effect until loading is finished
    if (!user) return; // 🚨 Ensure user is defined before initializing client
    if (!apiKey) throw new Error("Stream API key not found");

    console.log("Initializing StreamVideoClient with user:", user);
        
        const client = new StreamVideoClient({
            apiKey,
            tokenProvider,
            user: {
              id: user?.uid || "default-id", 
              name: user?.displayName || user?.uid || "Anonymous",
              image: user?.photoURL || "", 
            },
          });
      
          setVideoClient(client);
        
        }, [loading, user])

  if(!videoClient) return <p>Loading...</p>
  
  
  return <StreamVideo client={videoClient}>
    {children}
  </StreamVideo>;
};

export default StreamVideoProvider;
