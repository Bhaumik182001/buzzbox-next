import { ArrowDownIcon, ArrowUpIcon, BookmarkSquareIcon, ChatBubbleLeftEllipsisIcon, GiftIcon, ShareIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"
import Avatar from "./Avatar"
import TimeAgo from "react-timeago"
import Image from "next/image"
import Link from "next/link"
import { LeapFrog } from "@uiball/loaders"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import {  GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries" 
import {  ADD_VOTE } from "../graphql/mutation" 


type Props = {
    post: Post
   }


function Post({post}: Props) {

    const { data: session} = useSession();
    const [vote, setVote] = useState<Boolean>();

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

    useEffect(()=>{
        const votes: Vote[] = data?.getVoteById
        const vote = votes?.find(
            vote => vote.username == session?.user?.name
        )?.upvote
        console.log(votes);
        setVote(vote);
    },[data])

  return (
    <Link href={`/post/${post?.id}`}>
<div className="rounded-md flex cursor-pointer border border-gray-600 bg-zinc-900 shadow-sm hover:border hover:border-gray-300 pb-2 mb-2">
        <div className="flex items-center flex-col justify-start space-y-1 rounded-l-md bg-zinc-900 p-4 text-gray-400">
            <ArrowUpIcon onClick={()=>upVote(true)}  className={`voteButtons h-6 hover:text-red-400 ${vote && `text-red-400 scale-110 font-extrabold`}`}/>
            <p className="text-xl font-bold text-white">{displayVotes(data)}</p>
            <ArrowDownIcon onClick={()=>upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400 scale-110 font-extrabold'} `}/>
        </div>
        <div className="p-3 pb-1 ">
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
                <img src={post?.image}  className="w-full"/>
                )
            }
            
            {/* Footer */}
            <div className="flex space-x-4 text-gray-400">
                <div className="postButtons">
                    <ChatBubbleLeftEllipsisIcon  className="h-6 w-6"/>
                    <p className="">{post.comment?.length}</p>
                </div>

                <div className="postButtons">
                    <GiftIcon  className="h-6 w-6"/>
                    <p className="hidden sm:inline">Award</p>
                </div>

                <div className="postButtons">
                    <ShareIcon  className="h-6 w-6"/>
                    <p className="hidden sm:inline">Share</p>
                </div>

                <div className="postButtons">
                    <BookmarkSquareIcon  className="h-6 w-6"/>
                    <p className="hidden sm:inline">Save</p>
                </div>

                <div className="postButtons">
                    <EllipsisHorizontalCircleIcon  className="h-6 w-6"/>
                </div>
            </div>
        </div>
    </div>
    </Link>
    
  )
}
export default Post