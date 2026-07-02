import { AlarmClock, AreaChart } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { posts } from '../data/posts'
import { Header } from '../layout/Header'
import FooterComponent from '../layout/Footer'

const PostDetailPage = () => {
  const { id } = useParams()
  const post = posts.find((item) => item.id === Number(id))

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Header />
      <article className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-[1050px] flex-col gap-8 px-6 py-16 md:px-9">
          <Link to="/" className="text-sm font-bold text-secondary">
            ← Back to Home
          </Link>

          <div className="relative overflow-hidden rounded-lg">
            <img
              className="h-[420px] w-full object-cover"
              src={post.imageUrl}
              alt={post.title}
            />
            {post.isNew && (
              <span className="absolute left-4 top-4 rounded bg-red px-3 py-1 text-xs font-bold uppercase text-white">
                New
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-normal text-gray-light">
            {post.tags.map((tag) => (
              <span key={tag} className={tag === 'Google' ? 'text-disabled' : ''}>
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-primary md:text-4xl">{post.title}</h1>
          <p className="max-w-3xl text-base font-normal leading-7 text-gray-light">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 border-t border-gray-100 pt-6 text-sm text-gray-light">
            <div className="flex items-center gap-2">
              <AlarmClock className="h-4 w-4 text-secondary" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <AreaChart className="h-4 w-4 text-green-background" />
              <span>{post.commentCount} comments</span>
            </div>
          </div>
        </div>
      </article>
      <FooterComponent />
    </>
  )
}

export default PostDetailPage
