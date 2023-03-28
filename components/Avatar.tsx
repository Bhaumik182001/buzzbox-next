import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

/**
 * optional props
 * seed is space/discussion topic
 * large props is used for desginated pages for each topic
 */
type Props ={
    seed?: string
    large?: boolean
}

function Avatar({seed, large}: Props) {
    const { data: session } = useSession()
   
  return (
    // incase of unassigned topic, name of authenticated user is used
    <div className={`${large ? `h-20 w-20`: `h-10 w-10`} overflow-hidden relative border-gray-300 bg-white`}>
        <Image fill src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${seed || session?.user?.name || 'placeholder'}.svg`} alt="avatar"/>
    </div>
  )
}
export default Avatar