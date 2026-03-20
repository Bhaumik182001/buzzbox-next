import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import pool from '../../lib/db';

const typeDefs = `#graphql
  type Discussion {
    id: ID!
    topic: String
    created_at: String
  }

  type Comment {
    id: ID!
    post_id: ID
    text: String
    username: String
    created_at: String
  }

  type Vote {
    id: ID!
    post_id: ID
    upvote: Boolean
    username: String
    created_at: String
  }

  type Post {
    id: ID!
    title: String
    body: String
    username: String
    discussion_id: ID
    image: String
    created_at: String
    repost: Boolean
    reposted_from: String
    comment: [Comment]
    discussion: Discussion
    vote: [Vote]
  }

  type Query {
    discussionListByTopic(topic: String!): [Discussion]
    getVoteById(post_id: ID!): [Vote]
    discussionList: [Discussion]
    postListById(id: ID!): Post
    postListByTopic(topic: String!): [Post]
    postList: [Post]
  }

  type Mutation {
    insertDiscussion(topic: String!): Discussion
    insertVote(post_id: ID!, username: String!, upvote: Boolean!): Vote
    insertComment(username: String!, post_id: ID!, text: String!): Comment
    rePost(title: String!, body: String!, discussion_id: ID!, username: String!, image: String!, repost: Boolean!, reposted_from: String!): Post
    updatePost(id: ID!, body: String!, discussion_id: ID!, image: String!, title: String!, username: String!): Post
    insertPost(title: String!, body: String!, discussion_id: ID!, username: String!, image: String!): Post
    deletePost(id: ID!): Post
    deleteCommentWithId(post_id: ID!): [Comment]
    deleteVoteWithId(post_id: ID!): [Vote]
  }
`;

const resolvers = {
  Query: {
    discussionListByTopic: async (_: any, { topic }: any) => {
      const { rows } = await pool.query('SELECT * FROM "Discussion" WHERE topic = $1', [topic]);
      return rows;
    },
    getVoteById: async (_: any, { post_id }: any) => {
      const { rows } = await pool.query('SELECT * FROM "Vote" WHERE post_id = $1 ORDER BY created_at DESC', [post_id]);
      return rows;
    },
    discussionList: async () => {
      const { rows } = await pool.query('SELECT * FROM "Discussion"');
      return rows;
    },
    postListById: async (_: any, { id }: any) => {
      const { rows } = await pool.query('SELECT * FROM "Post" WHERE id = $1', [id]);
      return rows[0];
    },
    postListByTopic: async (_: any, { topic }: any) => {
      const { rows } = await pool.query(`
        SELECT "Post".* FROM "Post" 
        JOIN "Discussion" ON "Discussion".id = "Post".discussion_id 
        WHERE "Discussion".topic = $1 
        ORDER BY "Post".created_at DESC
      `, [topic]);
      return rows;
    },
    postList: async () => {
      const { rows } = await pool.query('SELECT * FROM "Post" ORDER BY created_at DESC');
      return rows;
    }
  },
  Mutation: {
    insertDiscussion: async (_: any, { topic }: any) => {
      const { rows } = await pool.query('INSERT INTO "Discussion" (topic) VALUES ($1) RETURNING *', [topic]);
      return rows[0];
    },
    insertVote: async (_: any, { post_id, username, upvote }: any) => {
      const { rows } = await pool.query('INSERT INTO "Vote" (post_id, username, upvote) VALUES ($1, $2, $3) RETURNING *', [post_id, username, upvote]);
      return rows[0];
    },
    insertComment: async (_: any, { post_id, username, text }: any) => {
      const { rows } = await pool.query('INSERT INTO "Comment" (post_id, username, text) VALUES ($1, $2, $3) RETURNING *', [post_id, username, text]);
      return rows[0];
    },
    rePost: async (_: any, { title, body, discussion_id, username, image, repost, reposted_from }: any) => {
      const { rows } = await pool.query(
        'INSERT INTO "Post" (title, body, discussion_id, username, image, repost, reposted_from) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, body, discussion_id, username, image, repost, reposted_from]
      );
      return rows[0];
    },
    updatePost: async (_: any, { id, title, body, discussion_id, username, image }: any) => {
      const { rows } = await pool.query(
        'UPDATE "Post" SET title = $2, body = $3, discussion_id = $4, username = $5, image = $6 WHERE id = $1 RETURNING *',
        [id, title, body, discussion_id, username, image]
      );
      return rows[0];
    },
    insertPost: async (_: any, { title, body, discussion_id, username, image }: any) => {
      const { rows } = await pool.query(
        'INSERT INTO "Post" (title, body, discussion_id, username, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
         [title, body, discussion_id, username, image]
      );
      return rows[0];
    },
    deletePost: async (_: any, { id }: any) => {
      const { rows } = await pool.query('DELETE FROM "Post" WHERE id = $1 RETURNING *', [id]);
      return rows[0];
    },
    deleteCommentWithId: async (_: any, { post_id }: any) => {
      const { rows } = await pool.query('DELETE FROM "Comment" WHERE post_id = $1 RETURNING *', [post_id]);
      return rows;
    },
    deleteVoteWithId: async (_: any, { post_id }: any) => {
      const { rows } = await pool.query('DELETE FROM "Vote" WHERE post_id = $1 RETURNING *', [post_id]);
      return rows;
    }
  },
  Post: {
    comment: async (parent: any) => {
      const { rows } = await pool.query('SELECT * FROM "Comment" WHERE post_id = $1', [parent.id]);
      return rows;
    },
    discussion: async (parent: any) => {
      const { rows } = await pool.query('SELECT * FROM "Discussion" WHERE id = $1', [parent.discussion_id]);
      return rows[0];
    },
    vote: async (parent: any) => {
      const { rows } = await pool.query('SELECT * FROM "Vote" WHERE post_id = $1 ORDER BY created_at DESC', [parent.id]);
      return rows;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
