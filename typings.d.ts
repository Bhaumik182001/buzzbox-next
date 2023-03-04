type Post = {
    body: string
    created_at: string
    id: number
    image: string
    discussion: Discussion
    title: string
    username: string
    vote: Vote[]
    comment: Comments[]
    discussion: Discussion
}

type Comments = {
    created_at: string
    id: number
    post_id: number
    text: string
    username: string
}

type Vote = {
    created_at: string
    id: number
    post_id: number
    upvote: boolean
    username: string
}

type Discussion = {
    created_at: string
    id: number
    topic: string
}