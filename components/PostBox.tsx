import { PhotoIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useForm } from "react-hook-form";
import Avatar from "./Avatar"
import { useSession, signIn, signOut } from "next-auth/react"
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_DISCUSSION_BY_TOPIC } from "../graphql/queries";
import client from "../apollo-client";
import { ADD_DISCUSSION, ADD_POST } from "../graphql/mutation";
import { toast } from "react-hot-toast";


type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    discussion: string
}
  
type Props = {
    discussion?: string
}

function PostBox() {

    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const { data: session } = useSession()
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>();
    
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [
            GET_ALL_POSTS,
            'postList'
        ]
    });
    const [addDiscussion] = useMutation(ADD_DISCUSSION);

    const onSubmit = handleSubmit(async (formData)=> {

        // block to insert Post or Discussion Space
        try{

            //loading toast
            const notification = toast.loading("Creating Post..");
            
            // fetching discussion spaces with same topic name
            const {data: {discussionListByTopic},} =await client.query({
                query: GET_DISCUSSION_BY_TOPIC,
                variables: {
                    topic: formData.discussion
                },
            })

            // boolean to check if discussion already exists
            const discussionExist = discussionListByTopic.length > 0

            // using default value for image if not provided by user
            const image = formData.postImage || ''

            // discussion space does not exist
            if(!discussionExist){
                // creating new discussion
                const {data: {insertDiscussion: newDiscussion},} = await addDiscussion({
                    variables: {
                        topic: formData.discussion
                    }
                })

                //creating new post linked to recently created discussion space
                const {data: {insertPost: newPost}} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        discussion_id: newDiscussion.id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                })

            } else {
                // creating post linked to existing discussion space
                const {data: {insertPost: newPost}} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        discussion_id: discussionListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                })  
        }

        // resetting input values and toast 
        setValue('postTitle', '')
        setValue('postBody', '')
        setValue('postImage', '')
        setValue('discussion', '')
        toast.success("Post Created!", {
            id: notification
        })
        }catch(error){
            console.log(error)
            toast.error("Unable to create post");
        }
    })
 
  return (

        <form onSubmit={onSubmit} className="flex flex-col border-2 border-white rounded-lg px-3 py-3">
            <div className="flex">
                <Avatar />
                <input 
                disabled={!session}
                {...register("postTitle")}
                placeholder={`${session ? "Enter Post Here..." : "Sign In to Post"}`}
                className={`px-2 ml-3 bg-stone-800 rounded-lg my-1 mr-5 text-white outline-none flex-grow`} 
                type="text"/>
                <PhotoIcon
                onClick={()=>setImageBoxOpen(!imageBoxOpen)}
                className={`w-10 h-10 transform transition duration-300 ease-out active:scale-75 ${imageBoxOpen ? `text-green-400 `: `text-white`}`}/>
            </div>
            {watch('postTitle') && (
                <div className="flex flex-col">
                    <div className="flex">
                        <p className="my-auto text-lg min-w-[100px]">Body: </p>
                        <input
                        placeholder="Enter Body..."
                        type="text" 
                        {...register('postBody')}
                        className={`px-2 bg-stone-800 rounded-lg h-8 my-1 mr-5 text-white outline-none flex-grow`} 
                        />
                    </div>

                    <div className="flex">
                        <p className="my-auto text-lg min-w-[100px]">Space: </p>
                        <input
                        placeholder="What's the Discussion Topic"
                        type="text" 
                        {...register('discussion')}
                        className={`px-2 bg-stone-800 rounded-lg h-8 my-1 mr-5 text-white outline-none flex-grow`} 
                        />
                    </div>

                    {imageBoxOpen && (
                        <div className="flex mb-2">
                            <p className="my-auto text-lg min-w-[100px]">Image: </p>
                            <input
                            placeholder="Enter Image URL here....."
                            type="text" 
                            {...register('postImage')}
                            className={`px-2 bg-stone-800 rounded-lg h-8 my-1 mr-5 text-white outline-none flex-grow`} 
                            />
                        </div>
                    )}
                                <button type="submit" className="bg-blue-400 my-2 py-2 rounded-full text-white font-bold" >Create Post</button>

                </div>
                
            )}
        </form>
    
  )
}
export default PostBox