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

type Props = {
    post: Post
   }


function Post({post}: Props) {

    const { data: session} = useSession();
   
  return (
    <div className="rounded-md flex cursor-pointer border border-gray-600 bg-zinc-900 shadow-sm hover:border hover:border-gray-300">
        <div className="flex items-center flex-col justify-start space-y-1 rounded-l-md bg-zinc-900 p-4 text-gray-400">
            <ArrowUpIcon  className={`voteButtons hover:text-red-400 `}/>
            <p className="text-xs font-bold text-white">0</p>
            <ArrowDownIcon className={`voteButtons hover:text-blue-400 `}/>
        </div>
        <div className="p-3 pb-1 ">
            {/* Header */}
            <div className="flex space-x-2 items-center">
            <Avatar seed={"space"} />
            <p className="text-xs text-gray-400">
                <Link href={`/subreddit/space`}>
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
  )
}
export default Post