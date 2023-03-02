import type { NextPage } from 'next'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className='max-w-2xl lg:max-w-5xl my-7 mx-auto'>
      <PostBox />
 <p>Body</p>
    </div>
   
  )
}

export default Home
