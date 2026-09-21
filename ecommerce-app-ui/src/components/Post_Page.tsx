import { Link } from 'react-router-dom'
import { AlarmClock, AreaChart, ChevronRight, ChevronLeft } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { posts } from '../data/posts'

const Post_Page = () => {
  return (
    <section className='w-full bg-white'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-20 sm:px-6 md:px-12'>
        <div className='h-48 w-72 text-center'>
          <h6 className='pb-2 text-sm font-bold text-secondary'>Uygulama Önerisi</h6>
          <h3 className='pb-3 text-4xl font-bold text-primary'>Öne Çıkan Ürünler</h3>
          <p className='text-sm font-normal text-gray-light'>
            Klasik fiziğin iki büyük alanı arasındaki çelişkiyi çözmeye çalışırken
          </p>
        </div>

        <div className='post-slider relative mx-auto w-full max-w-[1016px]'>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: '.post-slider-prev',
              nextEl: '.post-slider-next',
            }}
            pagination={{ clickable: true }}
            spaceBetween={28}
            slidesPerView='auto'
            centeredSlides={false}
            className='!pb-12'
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className='!w-80 !h-auto'>
                <div className='flex h-[606px] w-80 flex-col items-center justify-between overflow-hidden rounded-lg bg-white shadow-sm'>
                  <div className='relative w-full'>
                    <img
                      className='h-75 w-full object-cover object-top'
                      src={post.imageUrl}
                      alt='Gönderi Görseli'
                    />
                    {post.isNew && (
                      <span className='absolute left-4 top-4 rounded bg-red px-3 py-1 text-xs font-bold uppercase text-white'>
                        Yeni
                      </span>
                    )}
                  </div>

                  <div className='px-6 mb-5 flex w-full flex-col gap-2.5'>
                    <div className=' flex gap-4 text-xs text-gray-light font-normal'>
                      {post.tags.map((tag) =>
                        tag === 'Trend' ? (
                          <span key={tag} className='cursor-pointer text-disabled'>
                            {tag}
                          </span>
                        ) : (
                          <span key={tag} className='cursor-pointer text-gray-light'>
                            {tag}
                          </span>
                        )
                      )}
                    </div>

                    <Link to={`/posts/${post.id}`}>
                      <h3 className='mb-3  cursor-pointer text-xl font-normal text-primary hover:text-secondary'>
                        {post.title}
                      </h3>
                    </Link>

                    <p className='mb-4 line-clamp-3 text-sm text-gray-light font-normal'>
                      {post.description}
                    </p>

                    <div className='mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-xs text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <AlarmClock className='h-4 w-4 text-secondary' />
                        <span className='text-gray-light font-normal'>{post.date}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <AreaChart className='h-4 w-4 text-green-background' />
                        <span className='text-gray-light font-normal'>{post.commentCount} yorum</span>
                      </div>
                    </div>

                    <Link
                      to={`/posts/${post.id}`}
                      className='inline-flex items-center gap-1 text-sm font-bold text-gray-light transition-colors hover:text-blue-500'
                    >
                      Devamını Oku
                      <ChevronRight className='h-4 w-4 text-secondary' />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type='button'
            aria-label='Önceki yazılar'
            className='post-slider-prev absolute left-0 top-[280px] z-10 flex h-10 w-10 -translate-x-4 items-center justify-center rounded-full border border-light-open-gray bg-white text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            aria-label='Sonraki yazılar'
            className='post-slider-next absolute right-0 top-[280px] z-10 flex h-10 w-10 translate-x-4 items-center justify-center rounded-full border border-light-open-gray bg-white text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>
    </section>
  )
}
export default Post_Page
