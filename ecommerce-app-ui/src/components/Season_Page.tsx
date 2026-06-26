import season_page from '../img/season_page.png'

const Season_Page = () => {
  return (
  <div className="flex flex-col h-[999px] md:h-[682px] md:flex-row-reverse items-center justify-around p-6 md:p-20 gap-8">
  
  <div className="flex flex-col h-[476px]  md:h-[326px] items-center md:items-start gap-7 text-center md:text-left space-y-">
      <span className="text-xs uppercase tracking-wider text-light">Summer 2026</span>
      <h2 className="text-4xl w-72 md:text-4xl md:w-96 font-bold text-primary ">Part of the Neural Universe</h2>
      <p className="text-gray-light w-63 font-normal text-xl md:w-96 ">We know how large objects will act, but things on a small scale.</p>
      
      <div className ="flex flex-col md:flex-row gap-4">
        <button className="bg-secondary md:bg-button text-white px-10 py-4 rounded">BUY NOW</button>
        <button className="border border-secondary md:border-button text-secondary md:text-button px-10 py-4 rounded">
          <span className="block md:hidden">Learn More</span>
          <span className="hidden md:block">READ MORE</span>
        </button>
      </div>
  </div>

  <div className="w-full md:w-1/2">
    <img src={season_page} alt="Couple" className="w-full h-auto md:w-[704px] md:h-[682px] md: object-cover" />
  </div>

</div>
  )
}

export default Season_Page