"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import Sidebar from "../../sideBar";

const UpdateUser = () => {

    const pathname = usePathname();
    const router = useRouter();
   const id = pathname.split("/").pop();
    console.log("id",id);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        
            axios.get(`http://localhost:3100/edit/${id}`)
                .then((result) => 
                    setUser({
                    firstName: result.data.data.firstName,
                    lastName: result.data.data.lastName,
                    userName: result.data.data.userName,
                    email: result.data.data.email,
                    phone: result.data.data.phone
                }    )
        )
                .catch(err => console.log(err));
        
    }, []);

    const submitUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3100/edit/${id}`, user);
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                });
                setTimeout(() => {
                    router.push('/UsersInfo');   
                }, 2500);
            }
        } catch (err ) {
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
            });
        }
    };

    return (
        <div className="grid grid-cols-4 gap-0 m-0 min-h-screen">
            <div className="bg-violet-500 col-span-1">
                <Sidebar />
            </div>
            <div className="col-span-3">
                <div className="border-spacing-1 bg-slate-200 flex justify-center rounded-md flex-col items-center m-auto mt-7" style={{ width: "60%" }}>
                    <h1 className="text-xl text-center p-6">Edit User</h1>
                    <div className="p-1 w-3/4 ">
                        <form onSubmit={submitUser} method="POST">
                            <div className="sm:col-span-4 m-0">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                <div className="mt-2">
                                    <input id="text" name="firstName" type="text" value={user.firstName} onChange={handleInput} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4 m-0">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                <div className="mt-2">
                                    <input id="text" name="lastName" type="text" value={user.lastName} onChange={handleInput} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4 m-0">
                                <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                <div className="mt-2">
                                    <input id="text" name="userName" type="text" value={user.userName} onChange={handleInput} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4 m-0">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" value={user.email} onChange={handleInput} className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-4 mt-4">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="mt-2">
                                    <input id="phone" name="phone" value={user.phone} onChange={handleInput} type="number" className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md mr-2 mt-9"> update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )};
    
    export default UpdateUser;
