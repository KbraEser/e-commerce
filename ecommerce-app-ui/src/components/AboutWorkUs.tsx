
import workUs from '../img/about-work.jpg'

const AboutWorkUs = () => {
  return (
    <div className="w-full bg-work-us text-white flex flex-col md:flex-row items-stretch justify-between overflow-hidden">
      
     
      <div className="mx-auto flex w-full max-w-[650px] flex-1 flex-col items-center justify-center px-8 py-[30px] md:py-0">
        <div className="py-10 w-full max-w-[440px] text-center md:text-left">
        <span className="text-sm font-bold tracking-widest uppercase mb-6 opacity-90">
          BİZİMLE ÇALIŞIN
        </span>


        <h2 className="text-3xl md:text-4.5xl font-bold tracking-wide mb-6 leading-tight">
          Şimdi Sizinkini Büyütelim
        </h2>


        <p className="mb-8 text-sm leading-relaxed opacity-85">
          20. yüzyılın ilk çeyreğinde atomik ve küçük ölçekli davranışlar
          hakkındaki bilgilerin kademeli birikimi
        </p>


        <button className="cursor-pointer border border-white hover:bg-white hover:text-secondary font-bold text-sm px-10 py-3.5 rounded-md transition-all duration-200">
          Buton
        </button>
        </div>
      </div>

      
      <div className="hidden md:flex w-[590px] h-[640px] shrink-0">
        <img 
          src={workUs}
          alt="Bizimle Çalışın Görseli"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 1 }}
        />
      </div>

    </div>
  )
}

export default AboutWorkUs