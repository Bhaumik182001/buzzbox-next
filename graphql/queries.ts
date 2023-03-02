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
`;