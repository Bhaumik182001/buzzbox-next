import Image from "next/image"
import {MagnifyingGlassIcon, UserIcon, ChatBubbleLeftRightIcon, ArrowRightIcon} from "@heroicons/react/24/outline"
import { SparklesIcon} from "@heroicons/react/24/solid"
import { useSession, signIn, signOut } from "next-auth/react"

function Header() {
    const {data: session} = useSession();
  return (
    <div className="grid grid-cols-3 border-b-2 border-white  p-4 shadow-lg sticky top-0 z-10 bg-black">
        {/* Header icon */}
        <div className="cursor-pointer">
            <div className="relative w-40  h-20">
                <Image src="https://i.imgur.com/D2c16LH.png" fill className="object-contain" alt="header icon"/>
            </div>
        </div>

        {/* Search  */}
        <div className="my-auto">
        <form className="border-2 flex rounded-lg border-white py-1 px-3">
                <input type="text" className="bg-transparent text-md outline-none flex-grow" placeholder="Search text here.."/>
                <MagnifyingGlassIcon className="h-10 w-10 cursor-pointer text-white"/>
            </form>
        </div>
            
    
        
        {/* right section */}
        <div className="flex my-auto justify-end">
            <div className="hidden lg:flex space-x-5 my-auto mr-10">
            <SparklesIcon className=" w-10 h-10 cursor-pointer text-white hover:text-yellow-300"/>
            <ChatBubbleLeftRightIcon className="text-white w-10 h-10 cursor-pointer"/>
            </div>
            
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