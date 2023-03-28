import { gql } from '@apollo/client';

// mutation to add Discussion/Space
export const ADD_DISCUSSION = gql`
mutation myMutation($topic: String!){
    insertDiscussion(topic: $topic){
        id
        topic
        created_at
    }
}
`

// mutation to add vote to a post
export const ADD_VOTE  = gql`
mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!){
    insertVote(post_id: $post_id, username: $username, upvote: $upvote, ){
        id
        post_id
        created_at
        upvote
        username
    }
}
`
//mutation to add comment to a post
export const ADD_COMMENT = gql`
mutation myMutation($username: String!, $post_id: ID!, $text: String!){
    insertComment(username: $username, post_id: $post_id, text: $text){
        id
        post_id
        text
        username
    }
}
`

//mutation to rePost
export const MAKE_REPOST  = gql`
    mutation myMutation(
            $title: String!
            $body: String!
            $discussion_id: ID!
            $username: String!
            $image: String!
            $repost: Boolean!
            $reposted_from: String!
        ){
            rePost(
            body: $body
            title: $title
            username: $username
            discussion_id: $discussion_id
            image: $image
            repost: $repost
            reposted_from: $reposted_from
        ){
            title
            body
            username
            discussion_id
            image 
            created_at
            id
        }
    }
`

//mutation to Update/Edit post
export const UPDATE_POST  = gql`
mutation myMutation(
    $id: ID!
    $body: String!
    $discussion_id: ID!
    $image: String!
    $title: String!
    $username: String!
    
){
updatePost(
    id: $id
    body: $body
    discussion_id: $discussion_id
    image: $image
    title: $title
    username: $username
){
    title
    body
    username
    discussion_id
    image 
    created_at
    id
}
}
`

// mutation to add new post
export const ADD_POST  = gql`
mutation myMutation(
    $title: String!
    $body: String!
    $discussion_id: ID!
    $username: String!
    $image: String!
){
insertPost(
    body: $body
    title: $title
    username: $username
    discussion_id: $discussion_id
    image: $image
){
    title
    body
    username
    discussion_id
    image 
    created_at
    id
}
}
`
// mutation to delete post
export const DELETE_POST  = gql`
mutation myMutation(
    $id: ID!
){
deletePost(
    id: $id
){
    title
    body
    username
    discussion_id
    image 
    created_at
    id
}
}
`
// mutation to delete all comments linked to post
export const DELETE_COMMENTS  = gql`
mutation myMutation(
    $post_id: ID!
){
deleteCommentWithId(
    post_id: $post_id
){
   id
   text
   username
}
}
`

// mutation to delete all votes linked to post
export const DELETE_VOTES  = gql`
mutation myMutation(
    $post_id: ID!
){
deleteVoteWithId(
    post_id: $post_id
){
   id
   upvote
   username
}
}
`