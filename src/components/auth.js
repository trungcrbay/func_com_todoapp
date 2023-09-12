import { useState } from 'react';
import { auth , googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Create new user successfully!')
        }catch(err){
            console.error(err)
        }
        
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(err){
            console.error(err)
        }
        
    }

    const logout = async () => {
        try{
            await signOut(auth, googleProvider);
        }catch(err){
            console.error(err)
        }
        
    }


    return (
        <div>
            <input placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button> 
            <button onClick={logout}>Log out</button> 
        </div>
    )
}