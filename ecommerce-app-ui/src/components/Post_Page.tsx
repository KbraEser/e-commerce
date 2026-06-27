import { AlarmClock, AreaChart, ArrowRight, ChevronRight, Clock4 } from 'lucide-react'
import post_1 from '../img/post_img.jpg'

const posts = [
    {
      "id": 1,
      "imageUrl": post_1, 
      "isNew": true,
      "tags": ["Google", "Trending", "New"],
      "title": "Loudest à la Madison #1 (L'integral)",
      "description": "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      "date": "22 April 2021",
      "commentCount": 10,
      "link": "/posts/1"
    },
    {
      "id": 2,
      "imageUrl": post_1,
      "isNew": true,
      "tags": ["Google", "Trending", "New"],
      "title": "Loudest à la Madison #2 (L'integral)",
      "description": "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      "date": "22 April 2021",
      "commentCount": 10,
      "link": "/posts/2"
    },
    {
      "id": 3,
      "imageUrl": post_1,
      "isNew": true,
      "tags": ["Google", "Trending", "New"],
      "title": "Loudest à la Madison #3 (L'integral)",
      "description": "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      "date": "22 April 2021",
      "commentCount": 10,
      "link": "/posts/3"
    }
  ]

const Post_Page = () => {
  return (
    <section className='w-full bg-white'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-20 sm:px-6 md:px-12'>
        <div className='h-48 w-72 text-center'>
          <h6 className='pb-2 text-sm font-bold text-secondary'>Practice Advice</h6>
          <h3 className='pb-3 text-4xl font-bold text-primary'>Featured Products</h3>
          <p className='text-sm font-normal text-gray-light'>
            Problems trying to resolve the conflict between the two major
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-7'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='flex h-[606px] w-80 flex-col items-center justify-between overflow-hidden rounded-lg bg-white shadow-sm'
            >
              <div className='relative'>
                <img
                  className='h-75 object-cover'
                  src={post.imageUrl}
                  alt='Post Title'
                />
                <span className='absolute left-4 top-4 rounded bg-red px-3 py-1 text-xs font-bold uppercase text-white'>
                  {post.isNew ? 'New' : ''}
                </span>
              </div>

              <div className='px-6 mb-5 flex flex-col gap-2.5'>
                <div className=' flex gap-4 text-xs text-gray-light font-normal'>
                  {post.tags.map((tag) =>
                    tag === 'Google' ? (
                      <span key={tag} className='cursor-pointer text-disabled'>
                        Google
                      </span>
                    ) : (
                      <span key={tag} className='cursor-pointer text-gray-light'>
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <h3 className='mb-3  cursor-pointer text-xl font-normal text-primary hover:text-secondary'>
                  {post.title}
                </h3>

                <p className='mb-4 line-clamp-3 text-sm text-gray-light font-normal'>
                  {post.description}
                </p>

                <div className='mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-xs text-gray-500'>
                  <div className='flex items-center gap-1'>
                  <AlarmClock  className='h-4 w-4 text-secondary' />
                    <span className='text-gray-light font-normal'>{post.date}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                  <AreaChart className='h-4 w-4 text-green-background' />
                    <span className='text-gray-light font-normal'>{post.commentCount} comments</span>
                  </div>
                </div>

                <a
                  href={post.link}
                  className='inline-flex items-center gap-1 text-sm font-bold text-gray-light transition-colors hover:text-blue-500'
                >
                  Learn More
                
                  <ChevronRight className='h-4 w-4 text-secondary' />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Post_Page