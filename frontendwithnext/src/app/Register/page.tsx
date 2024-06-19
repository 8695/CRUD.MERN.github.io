"use client";
import axios from "axios";
import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import Sidebar from "../sideBar";

const Register = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!firstName || !lastName || !userName || !email || !password || !email) {
                toast.warn("please fill the information First", {
                    position: "top-right",
                    autoClose: 2000
                })
            }
            const response = await axios.post('http://localhost:3100/userRegister', { firstName, lastName, userName, email, password, phone });
            //console.log(response.data); // Assuming response contains data


            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            });

            setTimeout(() => {
                router.push('/')
            }, 2200);

        } catch (error) {
            //console.log(error);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            })
        }
    }

    return (
        <div className="grid grid-cols-4 gap-0 m-0 min-h-screen">

            <div className="bg-violet-500 col-span-1">
                <Sidebar />

            </div>
            <div className="col-span-3">

                <div className="border-spacing-1 bg-slate-200 flex justify-center rounded-md flex-col items-center m-auto mt-7" style={{ width: "60%" }}>
                    <h1 className="text-xl text-center p-6">Register</h1>
                    <div className="p-1 w-3/4 ">
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="sm:col-span-4 m-0">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                <div className="mt-2">
                                    <input id="text" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4 m-0">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                <div className="mt-2">
                                    <input id="text" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
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
                            <div className="sm:col-span-4 mt-4">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="mt-2">
                                    <input id="phone" name="number" value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <button type="submit" className="mt-4 mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
