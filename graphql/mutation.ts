import { gql } from '@apollo/client';

// mutation to add Discussion Space
export const ADD_DISCUSSION = gql`
mutation myMutation($topic: String!){
    insertDiscussion(topic: $topic){
        id
        topic
        created_at
    }
}
`
//mutation to add Post
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