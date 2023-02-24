import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useState,useEffect } from "react";
import {auth} from '../firebase.js';
export const AuthContext = React.createContext('');

export function AuthContextProvider({children}){
    
    let[user,setUser] = useState(null);
    let[mainLoader,setMainLoader] = useState(true);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user != null){
                setUser(user);
            }
            else{
                setUser(null);
            }
        setMainLoader(false);
        },[]);
    })
    let value = user;
    
    return(
<AuthContext.Provider value = {value}>
{mainLoader  == false && children}
</AuthContext.Provider>
    )
}