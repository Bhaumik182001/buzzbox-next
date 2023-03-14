import { TrashIcon ,PencilSquareIcon, ArrowDownIcon, ArrowUpIcon, BookmarkSquareIcon, ChatBubbleLeftEllipsisIcon, GiftIcon, ShareIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"
import Avatar from "./Avatar"
import TimeAgo from "react-timeago"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import {  GET_ALL_POSTS, GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries" 
import {  ADD_VOTE, DELETE_COMMENTS, DELETE_POST, DELETE_VOTES } from "../graphql/mutation" 
import { useRouter } from 'next/router'


import {
   FacebookIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    InstapaperIcon,
  
  } from "react-share";


type Props = {
    post: Post
}




function Post({post}: Props) {

    let router= useRouter();
    const { data: session} = useSession();
    const [vote, setVote] = useState<Boolean>();
    const [openShare, setOpenShare] = useState<Boolean>(false);

    const {data, loading} = useQuery(GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            post_id: post?.id
        }
    })


  

    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVoteById']
    })

    

    const upVote = async (isUpVote: boolean) =>{
        if(!session){
            toast.error("Sign in to vote!");
        }

        if(vote && isUpVote) return;
        if(vote === false && !isUpVote) return;

        console.log("voting...", isUpVote);

        await addVote({
            variables: {
                post_id: post.id,
                username: session?.user?.name,
                upvote: isUpVote
            }
        })
    }

    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVoteById
        const displayNumber = votes?.reduce((total, vote)=> vote.upvote ? total += 1 : total=-1, 0)
        if(votes?.length===0) return 0;

        if(displayNumber===0){
            return votes[0]?.upvote ? 1 : -1;
        }

        return displayNumber;
    }

    const [deleteComment] = useMutation(DELETE_COMMENTS);

    const [deleteVote] = useMutation(DELETE_VOTES);

    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [
            GET_ALL_POSTS,
            'postList'
        ]
    })

    const removePost = async (postId: number) => {
        const notification = toast.loading("Deleting Post..");

        // variables to check comments and votes
        const CommentExist = post.comment.length > 0;
        const VoteExist = displayVotes(data)!==0;

        // block checking if comments linked to post exist
        if(CommentExist){
            
            // deleting linked comments
            await deleteComment({
                variables: {
                    post_id: post?.id
                }
            })
        }

        // block checking if votes linked to post exist
        if(VoteExist){
            
            // deleting linked votes
            await deleteVote({
                variables: {
                    post_id: post?.id
                }
            })    
        }

        await deletePost({
            variables: {
                id: postId
            }
        })

        
        toast.success("Post Deleted!", {
            id: notification
        })

        //push back to homepage after deleting post
        router.push("/")

    }

    const promotion = {
        url : `http://localhost:3000/post/${post?.id}`,
        title: `Check out my post on this awesome site --> ${post?.title}`
    }

    useEffect(()=>{
        const votes: Vote[] = data?.getVoteById
        const vote = votes?.find(
            vote => vote.username == session?.user?.name
        )?.upvote
        console.log(votes);
        setVote(vote);
    },[data])

  return (
    
<div className="rounded-md flex cursor-pointer border border-gray-600 bg-zinc-900 shadow-sm hover:border hover:border-gray-300 pb-2 mb-2">
        <div className="flex items-center flex-col justify-start space-y-1 rounded-l-md bg-zinc-900 p-4 text-gray-400">
            <ArrowUpIcon onClick={()=>upVote(true)}  className={`voteButtons h-6 hover:text-red-400 ${vote && `text-red-400 scale-110 font-extrabold`}`}/>
            <p className="text-xl font-bold text-white">{displayVotes(data)}</p>
            <ArrowDownIcon onClick={()=>upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400 scale-110 font-extrabold'} `}/>
        </div>
        <div className="p-3 pb-1 w-full">
        <Link href={`/post/${post?.id}`}>
            {/* Header */}
            <div className="flex space-x-2 items-center">
            <Avatar seed={post?.discussion.topic} />
            <p className="text-xs text-gray-400">
                <Link href={`/space/${post?.discussion.topic}`}>
                <span className="font-bold text-white hover:text-blue-400 hover:underline">{post?.discussion.topic}</span>
                </Link>
                • Posted by u/{post.username} • <TimeAgo  date={post?.created_at} />
            </p>
            </div>
            {/* Body */}
            <div className="py-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm font-light">{post.body}</p>
            </div>
            {/* Image */}
            {
                post.image !== '' &&(
                <img src={post?.image}  className="w-full relative"/>
                )
            }
            </Link>
            
            {/* Footer */}
            <div className="flex justify-evenly mt-3 space-x-4 text-gray-400">
            <Link href={`/post/${post?.id}`}> <div className="postButtons">
                    <ChatBubbleLeftEllipsisIcon  className="h-6 w-6"/>
                    <p className="">{post.comment?.length}</p>
                </div></Link>
               

                <div className="postButtons">
                    <GiftIcon  className="h-6 w-6"/>
                    <p className="hidden sm:inline">Award</p>
                </div>

                
                
            {openShare ? (
                <div className="flex sticky space-x-3 items-center bg-neutral-800 px-3 py-1 rounded-xl">
                    <FacebookShareButton url={"popcorn.com"} quote={promotion.title}>
                        <FacebookIcon className="shareButtons" round />
                    </FacebookShareButton>
                    
                    <RedditShareButton url={promotion.url} title={promotion.title} windowWidth={660} windowHeight={460}>
                        <RedditIcon className="shareButtons" round />
                    </RedditShareButton>
                    
                    <TwitterShareButton url={promotion.url} title={promotion.title}>
                        <TwitterIcon className="shareButtons" round />
                    </TwitterShareButton>
                    
                    <WhatsappShareButton url={promotion.url} title={promotion.title} separator=":: ">
                        <WhatsappIcon className="shareButtons" round />
                    </WhatsappShareButton>
                </div>
            ) : (
                <div onClick={()=>setOpenShare(true)} className="postButtons">
                    <ShareIcon  className="h-6 w-6"/>
                    <p className="hidden sm:inline">Share</p>
                </div>
            )}
                

                {session && session?.user?.name === post?.username && (
                    <div  className="flex bg-neutral-800 px-4 rounded-xl justify-around space-x-10">
                <div className="postButtons">
                    <PencilSquareIcon   className={`h-6 w-6 `}/>
                    <p className="hidden sm:inline">Edit</p>
                </div>

                
                <div onClick={()=>removePost(post?.id)} className={`postButtons ${session && session?.user?.name === post?.username && 'hover:text-red-400'}`}>
                    <TrashIcon className={`h-6 w-6 `}/>
                    <p className="hidden sm:inline">Delete</p>
                </div> 
                </div>
                )}                
                

                              
            </div>
        </div>
    </div>
    
    
  )
}
export default Post