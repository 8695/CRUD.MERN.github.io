"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Sidebar = () => {
    
   const router= useRouter();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logout sucessfull",{
            autoClose:2000,
            position:"top-right",
        });
         setTimeout(()=>{
            router.push('/')
         },2200);
    }
    return (
        <div className="flex w-full flex-col ">
            <div className="border-b border-black w-full text-center">
                <h1 className="text-[35px] font-semibold p-4 text-amber-300">Admin</h1>
            </div>
       

       <div className="m-8">
            {
                token ? (
              
                        <div  onClick={handleLogout}>
                            <h1 className="  text-[20px] font-bold text-white cursor-pointer">Logout</h1>
                        </div>

                   ) : ( <div >
                      <Link href="/">
                        <h1 className="  text-[20px] font-bold text-white cursor-pointer">Login</h1>
                      </Link>
                    </div>)
            }
           
            <div className="text-[20px] font-bold text-white">
            <Link href="/UsersInfo">
                <h1 className="cursor-pointer">Users</h1>
            </Link>
            </div>
            </div>
            
        </div>
    )
}

export default Sidebar;