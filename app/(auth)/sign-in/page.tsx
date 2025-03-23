'use client'

import { signInWithGoogle } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { FaGithub, FaGoogle, FaVideo } from "react-icons/fa6";
import { setCookie } from "cookies-next";


const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  const handleSignIn = async () => {
    setLoading(true)
    setError(null)

    const {user, error} = await signInWithGoogle()
    setLoading(false)

   

    if (error) {
      setError(error)
    } else if (user) {
      console.log(user.uid)
      setCookie('userId', user.uid, { path: "/", secure: true, sameSite: "strict" } )
      redirect('/')
    }
  }
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-col h-[300px] w-[300px] border border-white">
        <div className="flex gap-1 items-center justify-center my-4">
          <FaVideo size={24} color="silver" />
          <p className="text-white font-semibold text-2xl ">
            YOOM
          </p>
        </div>
        <p className="text-center text-lg py-6">Sign in to continue using Yoom</p>
        <div className="flex flex-col items-center gap-6">
          <Button className="border border-white rounded-xl" onClick={handleSignIn}><FaGoogle /> {loading ? 'Signing in with google...' : 'Sign in with Google'} </Button>
          <Button className="border border-white rounded-xl"><FaGithub /> Sign in with Github</Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
