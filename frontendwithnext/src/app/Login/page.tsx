'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token')||"");
    const router = useRouter();

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3100/userLogin', { userName, email, password });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            });
            setTimeout(()=>{
                router.push('/UsersInfo')
            },2200)
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            })
        }
    }
    useEffect(() => {
        if(token !==""){
            toast.warn("you already login")
        }
    }, []);
    return (
        <div className="border-spacing-1 w-80 bg-slate-200 flex justify-center rounded-md flex-col items-center m-auto mt-7">
            <h1 className="text-xl text-center p-6">Login</h1>
            <div className="flex p-1">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="sm:col-span-4 m-0">
                        <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="text" name="userName" type="text" value={userName} onChange={(e) => setUsername(e.target.value)} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-4 m-0">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-4 mt-4">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <button type="submit" className="mt-4 mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md">Login</button>
                    <Link href="/Register">
                        <button className="mt-4 mb-4 ml-8 bg-indigo-600 text-white py-2 px-4 rounded-md">Register</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
