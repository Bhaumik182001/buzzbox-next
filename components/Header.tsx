import Image from "next/image"
import {MagnifyingGlassIcon, UserIcon, ChatBubbleLeftRightIcon, ArrowRightIcon} from "@heroicons/react/24/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DISCUSSION_LIST } from "../graphql/queries";
import { useRouter } from "next/router";

function Header() {
    const {data: session} = useSession();
    const [selectedResult, setSelectedResult] = useState<any>(null);
    const [spaces, setSpaces] = useState<Discussion[]>([])
    const [searchValue, setSearchValue] = useState<string>("");
    const [val, setVal] = useState<Discussion[]>([])
    const router = useRouter();

    const {data, error} = useQuery(GET_DISCUSSION_LIST);
    
   const fillData = () => {
    const discussion: Discussion[] =  data?.discussionList; 
    setVal(discussion)  
   }

   useEffect(()=>{
   
    setSpaces(val && [...val].filter((res)=>{
        return res.topic.toLowerCase().includes(searchValue.toLowerCase())
    }))
    
   },[searchValue])

  return (
    <div className="grid grid-cols-3 border-b-2 border-white  p-4 shadow-lg sticky top-0 z-50 bg-black">
        {/* Header icon */}
        <div className="cursor-pointer">
            <div className="relative w-40  h-20">
                <Link href="/">
                <Image src="https://i.imgur.com/D2c16LH.png" fill className="object-contain" alt="header icon"/>
                </Link>
            </div>
        </div>

        {/* Search  */}
        <div className="my-auto z-50">
            <form className="border-2 flex rounded-lg border-white z-10 py-1 px-3">
                <input value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setSearchValue(e.target.value)} type="text" className="bg-transparent text-md outline-none flex-grow" onClick={()=>fillData()} placeholder="Search text here.."/>
                <MagnifyingGlassIcon className="h-10 w-10 cursor-pointer text-white"/>
            </form>

            {searchValue && (
                <div className="absolute mt-5 space-y-1 z-50 lg:w-[500px] w-[240px] py-2 rounded-lg bg-white">
                 {spaces && spaces.map(res=>{
                    return(
                
                            <p key={res.id} onClick={()=>{
                                router.push(`/space/${res.topic}`)
                                setSearchValue("");
                            }} className="text-black hover:font-bold hover:cursor-pointer px-4 border-b-2 duration-200 ease-in-out  transform transition last:border-b-0">
                                s/{res.topic}
                            </p>
                       
                    ) 
                    
                 })}
                </div>
            )}
        </div>
            
    
        
        {/* right section */}
        <div className="flex my-auto justify-end">
            
            
        <div onClick={()=> session ? signOut() : signIn()} className='flex bg-white text-black rounded-xl px-4 py-4'>
            <div className='my-auto cursor-pointer border-r-2 pr-3'>
            <p>{session ? (
                <>
                <p className="text-sm font-semibold">Welcome,</p>
                <p className="tuncate font-semibold text-xs">{session?.user?.name}!</p>
                </>
                
            ):"Sign In"}</p>
            </div>
            {session ? (
                <ArrowRightIcon className='h-6 my-auto pl-3 cursor-pointer'/>
            ) : (
                <UserIcon className='h-6 my-auto pl-3 cursor-pointer'/>
            )}
        </div>
        </div>

        
    </div>
  )
}
export default Header