import shop_hero_img from '../img/shop_hero_img.png'

const Shop_Hero = () => {
  return (
    <section className='shop-hero relative h-[1230px] w-full overflow-hidden bg-green-background pt-28 md:h-[709px] '>
      <div className='relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-20 sm:px-6 md:items-start md:gap-8 md:pl-32 md:pr-0'>
        <div className='flex w-[510px] max-w-full flex-col items-center gap-12 md:h-[432px] md:items-start md:gap-5 md:text-left'>
        <h5 className='text-xl font-normal text-white'>SUMMER 2026</h5>
        <h1 className='h-24 w-60 text-center text-4xl font-bold text-white md:text-left md:text-4xl'>
          Vita Classic Product
        </h1>
        <h4 className='h-24 w-72 text-center text-xl leading-8 font-normal text-white md:text-left md:w-[340px] md:text-sm'>
          We know how large objects will act, but things on a small scale.
        </h4>
        <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start'>
        <h5 className='text-2xl font-bold text-white'>$16.48</h5>
        <button className='rounded-md bg-button px-10 py-4 text-white'>
          <span className='text-sm font-bold'>ADD TO CART</span>
        </button>
        </div>
        </div>
      </div>

      <div className='absolute bottom-0 -left-12 w-full translate-y-[160px] px-8 md:translate-x-100 '>
        <img
          src={shop_hero_img}
          alt='shop_hero_img'
          className='mx-auto block w-full max-w-[1440px] md:w-[510px]'
        />
      </div>
    </section>
  )
}

export default Shop_Hero
