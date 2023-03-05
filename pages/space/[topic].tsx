import { useRouter } from "next/router";
import Avatar from "../../components/Avatar";
import PostBox from "../../components/PostBox";
import FeedTopic from "../../components/FeedTopic";

function Space() {
 
  const { query: {topic},} = useRouter();
  return (
    
    <div className={`h-24 bg-red-400 p-8`}>
        <div className="-mx-8 mt-10 bg-white">
            <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
            <div className="-mt-5">
            <Avatar seed={topic as string} large />
            </div>
            
            <div className="pb-2">
                <h1 className="text-3xl text-black font-semibold">Welcome to the r/{topic}</h1>
                <p className="text-sm text-gray-900">r/{topic}</p>
            </div>
            </div>
        </div>

<div className="mx-auto mt-5 max-w-5xl pb-10">
    <PostBox discussion={topic as string}/>
    
    <FeedTopic topic={topic as string}/>
    
</div>
        
    </div>
  )
}
export default Space;