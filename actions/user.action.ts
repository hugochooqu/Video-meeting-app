'use client'

import { auth, googleProvider, githubProvider, signInWithPopup} from "../lib/firebase";
import {useState, useEffect} from 'react'
import { getAuth, User } from "firebase/auth";


export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(auth, googleProvider) 

        const token = await result.user.getIdToken(); // Get the Firebase ID token

      

        return {user : result.user, error: null}
    } catch (error: any) {
        return {user: null, error: error.message}
    }
}

interface AuthState {
    user: User | null;
    loading: boolean;
}

export const useAuth = (): AuthState => {
    const [user, setUser] =useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        
        return () => unsubscribe()
    }, [])
    

    return {user, loading}
}

export const getToken = async() => {
    const {user, loading} = useAuth()

    if (!user) {
        throw new Error("No user logged in!");
      }

    const idToken = user.getIdToken()

    const response = await fetch("/api/get-stream-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch Stream token");
      }
    
      const data = await response.json();
      return data.token;
}




