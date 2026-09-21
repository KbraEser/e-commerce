import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import editorsPick from '../img/editors-pick.jpg'
import editorsPickWomen from '../img/editors-pick-women.jpg'
import accessories from '../img/editors-pick-acc.jpg'
import kids from '../img/editors-pick-kids.jpg'
import type { RootState } from '../store'
import { getCategoryPath } from '../utils/categoryUtils'

const Category = () => {
  const categories = useSelector((state: RootState) => state.product.categories)

  const menCategory = categories.find((category) => category.gender === 'e')
  const womenCategory = categories.find((category) => category.gender === 'k')
  const shoesCategory = categories.find(
    (category) => category.gender === 'k' && category.title.toLocaleLowerCase('tr-TR').includes('ayakkab')
  )

  const menPath = menCategory ? getCategoryPath(menCategory) : '/shop'
  const womenPath = womenCategory ? getCategoryPath(womenCategory) : '/shop'
  const accessoriesPath = shoesCategory ? getCategoryPath(shoesCategory) : '/shop'

  return (
    <section className='editors-pick w-full bg-text-gray'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-20 sm:px-6 md:px-12'>
        <div className='text-center'>
          <h2 className='mb-3 text-2xl font-bold text-primary'>EDİTÖRÜN SEÇİMİ</h2>
          <p className='flex h-10 w-50 items-center justify-center text-center text-sm font-light text-gray-light'>
            Sizin için özenle seçilen ürünler
          </p>
        </div>

        <div className='mx-auto flex w-full max-w-[1044px] flex-col items-center gap-4 md:h-[600px] md:flex-row md:items-stretch'>
          <Link
            to={menPath}
            className='group relative block h-[500px] w-[324px] overflow-hidden md:h-full md:w-1/2'
          >
            <img
              className='h-full w-full object-cover'
              src={editorsPick}
              alt='Erkek koleksiyonu'
            />
            <div className='absolute bottom-6 left-6'>
              <span className='cursor-pointer rounded-sm bg-white px-16 py-2 font-bold uppercase'>
                Erkek
              </span>
            </div>
          </Link>

          <Link
            to={womenPath}
            className='group relative block h-[500px] w-[324px] overflow-hidden md:h-full md:w-1/4'
          >
            <img
              className='h-full w-full object-cover'
              src={editorsPickWomen}
              alt='Kadın koleksiyonu'
            />
            <div className='absolute bottom-6 left-6'>
              <span className='cursor-pointer rounded-sm bg-white px-10 py-3 font-bold uppercase'>
                Kadın
              </span>
            </div>
          </Link>

          <div className='flex w-[325px] flex-col gap-4 md:h-full md:w-1/4'>
            <Link
              to={accessoriesPath}
              className='relative block h-[250px] w-[325px] overflow-hidden md:h-auto md:w-full md:flex-1'
            >
              <img
                src={accessories}
                alt='Aksesuarlar'
                className='h-full w-full object-cover'
              />
              <div className='absolute bottom-6 left-6'>
                <span className='cursor-pointer bg-white px-6 py-3 font-bold uppercase'>
                  Aksesuarlar
                </span>
              </div>
            </Link>

            <Link
              to='/shop'
              className='group relative block h-[250px] w-[325px] overflow-hidden md:h-auto md:w-full md:flex-1'
            >
              <img
                src={kids}
                alt='Çocuk'
                className='h-full w-full object-cover'
              />
              <div className='absolute bottom-6 left-6'>
                <span className='cursor-pointer bg-white px-8 py-3 font-bold uppercase'>
                  Çocuk
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Category
