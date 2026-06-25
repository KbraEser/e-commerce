import React from 'react'

const Shop_Hero = () => {
  return (
    <section className='shop-hero w-full h-[1230px] md:h-[709px] bg-green-background pt-28'>
           <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-20 sm:px-6 md:px-12'>
            <h5 className='font-normal text-xl text-white'>SUMMER 2026</h5>
            <h1 className='text-4xl font-bold text-white w-60 h-24 text-center'>Vita Classic Product</h1>
            <h4 className='font-normal text-xl text-white text-center w-72 h-24 leading-8'>We know how large objects will act, but things on a small scale.</h4>
             <h5 className='text-2xl font-bold text-white'>$16.48</h5>
             <button className='bg-button text-white px-10 py-4 rounded-md'><span className='text-sm font-bold'>ADD TO CART</span></button>

           </div>
     </section>   
  )
}

export default Shop_Hero