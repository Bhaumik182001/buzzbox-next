import type { NextPage } from 'next'
import PostBox from '../components/PostBox'
import Feed from '../components/Feed'

const Home: NextPage = () => {
  return (
    <div className='max-w-2xl lg:max-w-5xl my-7 mx-auto'>
      {/* PostBox */}
      <PostBox />

      {/* Feed */}
      <Feed />
    </div>
   
  )
}

export default Home
