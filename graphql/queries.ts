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