import { useMutation, useQuery } from "@apollo/client";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { ADD_COMMENT } from "../../graphql/mutation";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"
import { SubmitHandler ,set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import TimeAgo from 'react-timeago'
import { LeapFrog } from "@uiball/loaders"

type FormData = {
    comment: string
}

function PostPage() {
    const router = useRouter();
    const { data: session } = useSession();
     const [addComment] = useMutation(ADD_COMMENT, {
         refetchQueries: [GET_POST_BY_POST_ID, 'postListByPostId']
     })

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    const {data} = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            id: router.query.postId
        },
    });

    console.log(router.query.postId)
   
    const post: Post = data?.postListById;

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);

        const notification = toast.loading("Posting your comment...")

        await addComment({
            variables: {
                 post_id: router.query.postId,
                 username: session?.user?.name,
                 text: data.comment
            }
        })

        setValue('comment', '')

        toast.success("Comment created", {
            id: notification,
        })
    }

    console.log(data)

    if(!post) return (
        <div className="flex w-full p-10 items-center justify-center text-xl">
<LeapFrog size={50} color="#FF4501" />
        </div>
        
    )
  
  return (
    <div className="mx-auto max-w-5xl my-7">
        <Post post={post} />


        <div className="-mt-1 rounded-b-md  border-t-0 hover:border-gray-300 bg-black p-5 pl-16">
            <p className="text-sm">
            Comment as <span className="text-red-500">{session?.user?.name}</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  max-w-5xl space-y-4">
                <textarea
                {...register('comment')}
                className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none bg-black disabled:bg-black" placeholder={session ? "What are your thoughts?" : "Please Sign In to comment"}
                disabled={!session}
                />

                <button type="submit" className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-stone-900" disabled={!session}>Comment</button>
            </form>
            </div>
            <div className="-my-5 rounded-b-md  border-t-0  bg-black
             py-5 px-10">
                <hr className="mt-2 mb-2"/>
                {post?.comment.length>0 ? (
                    post?.comment.map(res=>(
                    <div className="relative flex items-center space-x-2 space-y-5" key={res.id}>
                        <hr className="absolute border-red-500 top-10 h-16 border left-7 z-0 "/>
                        <div className="z-50">
                            <Avatar  seed={res.username}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="py-2 text-xs text-gray-400">
                                <span className="font-semibold text-gray-600">{res.username}</span>  • <TimeAgo  date={res.created_at} />
                            </p>
                            <p>{res.text}</p>
                        </div>
                    </div>
                    ))) 
                    : 
                    <p className="mt-6 text-2xl font-semibold">Be the first one to <span className="text-red-400">Comment</span>!</p>
                }
                
                <hr className="mt-8 mb-3 "/>
            </div>
    </div>
  )
}
export default PostPage