import { useQuery } from "@apollo/client";
import router, { useRouter } from "next/router";
import EditPost from "../../components/EditPost"
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { LeapFrog } from "@uiball/loaders";

function Edit() {
  const router = useRouter();

  const {data} = useQuery(GET_POST_BY_POST_ID, {
    variables: {
        id: router.query.postId
    },
});
const post: Post = data?.postListById;

if(!post) return (
  <div className="flex w-full p-10 items-center justify-center text-xl">
<LeapFrog size={50} color="#FF4501" />
  </div>
  
)

  return (
    <div className="flex h-3/4 items-center justify-center">
        <div className="flex-col w-3/4">
            <h1 className="text-3xl text-bold">Editing Post</h1>
            {post && <EditPost post={post}/>}
           
        </div>
        
    </div>
  )
}
export default Edit