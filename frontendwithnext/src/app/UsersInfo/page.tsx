"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Sidebar from "../sideBar";
import Link from "next/link";

const Users = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    
    const router = useRouter();

    
        const fetchData = async () => {
            try {
                if (!token) throw new Error("Token not found in localStorage");

                const axiosConfig = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get("http://localhost:3100/userData", axiosConfig);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };

        useEffect(()=>{
            fetchData();

        },[token])

   

    const removeUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3100/delete/${id}`)
            toast.success(response.data.message, {
                autoClose: 2000,
                position: "top-right",
                theme: "colored"
            })
        }
        catch (error) {
            toast.error(error.data.meassage, {
                autoClose: 2000,
                position: "top-right",
                theme: "colored"
            })
        }
        fetchData();
    }

    return (
        <> 
        <div className="grid grid-cols-4 gap-0 m-0 min-h-screen">
          <div className="bg-violet-500 col-span-1">
           <Sidebar />
          </div>
          <div className="col-span-3">
          {token ? (
                <div className="flex justify-center flex-col w-full bg-teal-600">
                    <div className="bg-slate-500 h-16">
                        <h1 className="text-center text-[35px] text-rose-300 p-2">Users Details</h1>
                    </div>
                    <div className="flex justify-center flex-col items-center m-30 mx-auto">
                        <table className="table-auto">
                            <thead>
                                <tr className="p-6 text-[20px] text-rose-50">
                                    <th className="p-4">First Name</th>
                                    <th className="p-4">Last Name</th>
                                    <th className="p-4">UserName</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="text-orange-50">
                                        <td className="p-4">{user.firstName}</td>
                                        <td className="p-4">{user.lastName}</td>
                                        <td className="p-4">{user.userName}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">{user.phone}</td>
                                        <td className="p-4">
                                            <Link href={`users/${user._id}`}>
                                            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md mr-2">Edit</button>
                                            </Link>
                                            <button onClick={()=>removeUser(user._id)} className="bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                toast.warn("Login first to show Users", {
                    autoClose: 1500,
                    position: "top-right"
                }), (router.push('/'))

            )}
          </div>
        </div>
            
        </>
    );
};

export default Users;
