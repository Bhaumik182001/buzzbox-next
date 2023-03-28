import Post from "./Post"
import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS } from "../graphql/queries" 
import { LeapFrog } from "@uiball/loaders"


/**
 * pull all posts from query and then store it in post array
 * while data is being fetched, leap frog animation is displayed
 * @returns post array mapped on Post component
 */
function Feed() {

    const { data } = useQuery(GET_ALL_POSTS);
    const posts: Post[] = data?.postList 
    

    if(!posts) return (
        <div className="flex w-full p-10 items-center justify-center text-xl">
  <LeapFrog size={50} color="#FF4501" />
        </div>
        
    )

  return (
    <div className="mt-5 space-y-4">
    {posts?.map(res=>(
     <Post key={res.id} post={res}/>
    ))}
   </div>
  )
}
export default Feed