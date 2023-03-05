import Post from "./Post"
import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries" 
import { LeapFrog } from "@uiball/loaders"
type Props = {
  topic?: string
}


function Feed({topic}: Props) {

    
    const { data, error } = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
      variables: {
        topic: topic
      }
    });

   
    const posts: Post[] = !topic ? data?.postList : data?.postListByTopic
    

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