import { gql } from '@apollo/client';

//query to get spaces by topic
export const GET_DISCUSSION_BY_TOPIC = gql`
  query myQuery($topic: String!) {
    discussionListByTopic(topic: $topic) {
      id
      
      topic
    }
  }
`
export const GET_ALL_VOTES_BY_POST_ID = gql`
query myQuery($post_id: ID!){
    getVoteById(post_id: $post_id){
        
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
            
            id
            topic
        }
        vote {
            
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
        repost
        reposted_from
        discussion_id
        username
        comment {
            
            id 
            post_id
            text
            username
        }
        discussion{
            
            id
            topic
        }
        vote {
            
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
        repost
        reposted_from
        comment {
            
            id 
            post_id
            text
            username
        }
        discussion{
            
            id
            topic
        }
        vote {
            
            id
            post_id
            upvote
            username
        }
    }
}
`