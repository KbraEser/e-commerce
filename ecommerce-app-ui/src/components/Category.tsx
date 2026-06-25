import editorsPick from '../img/editors-pick.jpg'
import editorsPickWomen from '../img/editors-pick-women.jpg'
import accessories from '../img/editors-pick-acc.jpg'
import kids from '../img/editors-pick-kids.jpg'

const Category = () => {
  return (
    <section className='editors-pick w-full bg-text-gray'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-20 sm:px-6 md:px-12'>
        <div className='text-center'>
          <h2 className='mb-3 text-2xl font-bold text-primary'>EDITOR'S PICK</h2>
          <p className='flex h-10 w-50 items-center justify-center text-center text-sm font-light text-gray-light'>
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className='mx-auto flex w-full max-w-[1044px] flex-col items-center gap-4 md:h-[600px] md:flex-row md:items-stretch'>
          <div className='group relative h-[500px] w-[324px] overflow-hidden md:h-full md:w-1/2'>
            <img
              className='h-full w-full object-cover'
              src={editorsPick}
              alt='Men collection'
            />
            <div className='absolute bottom-6 left-6'>
              <button className='rounded-sm bg-white px-16 py-2 font-bold uppercase'>
                Men
              </button>
            </div>
          </div>

          <div className='group relative h-[500px] w-[324px] overflow-hidden md:h-full md:w-1/4'>
            <img
              className='h-full w-full object-cover'
              src={editorsPickWomen}
              alt='Women collection'
            />
            <div className='absolute bottom-6 left-6'>
              <button className='rounded-sm bg-white px-10 py-3 font-bold uppercase'>
                Women
              </button>
            </div>
          </div>

          <div className='flex w-[325px] flex-col gap-4 md:h-full md:w-1/4'>
            <div className='relative h-[250px] w-[325px] overflow-hidden md:h-auto md:w-full md:flex-1'>
              <img
                src={accessories}
                alt='Accessories'
                className='h-full w-full object-cover'
              />
              <div className='absolute bottom-6 left-6'>
                <button className='bg-white px-6 py-3 font-bold uppercase'>
                  Accessories
                </button>
              </div>
            </div>

            <div className='group relative h-[250px] w-[325px] overflow-hidden md:h-auto md:w-full md:flex-1'>
              <img
                src={kids}
                alt='Kids'
                className='h-full w-full object-cover'
              />
              <div className='absolute bottom-6 left-6'>
                <button className='bg-white px-8 py-3 font-bold uppercase'>
                  Kids
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Category
