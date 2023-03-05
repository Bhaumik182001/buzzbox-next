import { gql } from '@apollo/client';

//query to get spaces by topic
export const GET_DISCUSSION_BY_TOPIC = gql`
  query myQuery($topic: String!) {
    discussionListByTopic(topic: $topic) {
      id
      created_at
      topic
    }
  }
`
export const GET_ALL_VOTES_BY_POST_ID = gql`
query myQuery($post_id: ID!){
    getVoteById(post_id: $post_id){
        created_at
        id
        post_id
        upvote
        username
    }
}
`

export const GET_POST_BY_POST_ID = gql`
query myQuery($id: ID!){
    postListById(id: $id) {
        body
        created_at
        id 
        image
        title
        username
        discussion_id
        username
        comment {
            created_at
            id 
            post_id
            text
            username
        }
        discussion{
            created_at
            id
            topic
        }
        vote {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
query myQuery($topic: String!){
    postListByTopic(topic: $topic) {
        body
        created_at
        id 
        image
        title
        username
        discussion_id
        username
        comment {
            created_at
            id 
            post_id
            text
            username
        }
        discussion{
            created_at
            id
            topic
        }
        vote {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_ALL_POSTS = gql`
query myQuery{
    postList {
        body
        created_at
        id 
        image
        title
        username
        discussion_id
        username
        comment {
            created_at
            id 
            post_id
            text
            username
        }
        discussion{
            created_at
            id
            topic
        }
        vote {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`