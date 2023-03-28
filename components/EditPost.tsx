import { PhotoIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import Avatar from "./Avatar"
import { useSession } from "next-auth/react"
import { useMutation } from "@apollo/client";
import {  GET_ALL_POSTS, GET_DISCUSSION_BY_TOPIC } from "../graphql/queries";
import client from "../apollo-client";
import { ADD_DISCUSSION, UPDATE_POST } from "../graphql/mutation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { setTimeout } from "timers";

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    discussion: string
}

type Props = {
    post: Post
}
  
/**
 * component similar to postbox is used here to keep usage of hooks simple, 
 */
function EditPost({post}: Props) {
    // determines if image icon is clicked
    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const { data: session } = useSession()

    // hook from react hook form
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>();
    
    //to pull query for required post id
    const router = useRouter();

    // initial side effect to fill details for post
    useEffect(() => {
        const fillingValues = async () => {
    
            setValue('postTitle', post?.title)
            setValue('postBody', post?.body)
            setValue('discussion', post?.discussion.topic)
            
            // logic for handeling image column
            if(post?.image != ''){
                setImageBoxOpen(true);
                setValue('postImage', post?.image)
            }
        }

        fillingValues();

    }, [])

    // updating post and then refetching all updated posts
    const [updatePost] = useMutation(UPDATE_POST, {
        
        refetchQueries: [
            GET_ALL_POSTS,
            'postList'
        ]
    });

    // mutation for inserting discussion
    const [addDiscussion] = useMutation(ADD_DISCUSSION);

    /**
     * linking handleSubmit from react-hook-form to update button
     * logic deals with updating post
     * if user changes discussion/space then logic checks if space exists then re links the post to exisiting space.
     * if new space does not exist then new space is created and post is linked to new space.
     */
    const onSubmit = handleSubmit(async (formData)=> {
        //using toast loading in a variable
        const notification = toast.loading("Creating Post..");

        try{
            
            const {data: {discussionListByTopic},} = await client.query({
                query: GET_DISCUSSION_BY_TOPIC,
                variables: {
                    topic: formData.discussion
                },
            })

            // boolean to check if discussion already exists
            const discussionExist = await discussionListByTopic.length > 0

            if(!discussionExist){
                // creating new discussion
                const {data: {insertDiscussion: newDiscussion},} = await addDiscussion({
                    variables: {
                        topic: formData.discussion
                    }
                })

                //creating new post linked to recently created discussion space
                await updatePost({
                    variables: {
                        id: post?.id,
                        body: formData.postBody,
                        discussion_id: newDiscussion.id,
                        image: formData.postImage ? formData.postImage : "",       
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                })

            } else {
                // creating post linked to existing discussion space
               updatePost({
                    variables: {
                        id: post?.id,
                        body: formData.postBody,
                        discussion_id: discussionListByTopic[0].id,
                        image: formData.postImage ? formData.postImage : "",
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                })  
            // on successfull execution of logic, toast success is displayed and loading toast is terminated 
            toast.success("Post Updated!", {
                id: notification
            })
            // user is then pushed to home page
            router.push("/")
        }
    }
        catch(error){
            // incase of error, toast error is displayed and loading is terminated 
            console.log(error)
            toast.error("Unable to update post", {
                id: notification
            });
            
        }
       
    })
 
  return (

        <form onSubmit={onSubmit} className="flex flex-col border-2 border-white rounded-lg px-3 py-3 mt-2 sticky top-32 bg-black md:top-30 z-50 p-2 ">
            {/* Left section */}
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
            {/* completed dialogue box is display if and if only user types in input form */}
            {watch('postTitle') && (
                <div className="flex flex-col">
                    {/* Body */}
                    <div className="flex">
                        <p className="my-auto text-lg min-w-[100px]">Body: </p>
                        <input
                        placeholder="Enter Body..."
                        type="text" 
                        {...register('postBody')}
                        className={`px-2 bg-stone-800 rounded-lg h-8 my-1 mr-5 text-white outline-none flex-grow`} 
                        />
                    </div>
                
                    {/* discussion */}
                    <div className="flex">
                        <p className="my-auto text-lg min-w-[100px]">Space: </p>
                        <input
                        placeholder="What's the Discussion Topic"
                        type="text" 
                        {...register('discussion')}
                        className={`px-2 bg-stone-800 rounded-lg h-8 my-1 mr-5 text-white outline-none flex-grow`} 
                        />
                    </div>
                
                    
                    {/* if img button is clicked then following box model is displayed */}
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
                    <button type="submit" className="bg-blue-400 my-2 py-2 rounded-full text-white font-bold" >Save Changes</button>

                </div>
                
            )}
        </form>
    
  )
}
export default EditPost