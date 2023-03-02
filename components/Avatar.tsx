import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

type Props ={
    seed?: string
    large?: boolean
}

function Avatar({seed, large}: Props) {
    const { data: session } = useSession()
   
  return (
    <div className={`${large ? `h-20 w-20`: `h-10 w-10`} overflow-hidden relative border-gray-300 bg-white`}>
        <Image fill src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${seed || session?.user?.name || 'placeholder'}.svg`} alt="avatar"/>
    </div>
  )
}
export default Avatar