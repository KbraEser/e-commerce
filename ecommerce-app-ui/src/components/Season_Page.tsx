import season_page from '../img/season_page.png'

const Season_Page = () => {
  return (
  <div className="flex flex-col h-[999px] md:h-[682px] md:flex-row-reverse items-center justify-around p-6 md:p-20 gap-8">
  
  <div className="flex flex-col h-[476px]  md:h-[326px] items-center md:items-start gap-7 text-center md:text-left space-y-">
      <span className="text-xs uppercase tracking-wider text-light">Yaz 2026</span>
      <h2 className="text-4xl w-72 md:text-4xl md:w-96 font-bold text-primary ">Sınırsız Evrenin Bir Parçası</h2>
      <p className="text-gray-light w-63 font-normal text-xl md:w-96 ">Büyük nesnelerin nasıl davranacağını biliyoruz, ama küçük ölçekteki şeyler farklı.</p>

      <div className ="py-6 flex flex-col md:flex-row gap-2.5">
        <button className="cursor-pointer bg-secondary md:bg-button text-white px-10 py-4 rounded">HEMEN AL</button>
        <button className="cursor-pointer border border-secondary md:border-button text-secondary md:text-button px-10 py-4 rounded">
          <span className="block md:hidden">Devamını Oku</span>
          <span className="hidden md:block">DEVAMINI OKU</span>
        </button>
      </div>
  </div>

  <div className="w-full md:w-1/2">
    <img src={season_page} alt="Çift" className="w-full h-auto md:w-[704px] md:h-[682px] md: object-cover" />
  </div>

</div>
  )
}

export default Season_Page