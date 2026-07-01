import contact_img from '../img/main-page.jpg'


const Contact = () => {
  return (
    <section
      className="relative min-h-screen w-full text-white overflow-hidden font-sans flex items-center py-16 px-6 sm:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 28, 42, 0.95) 0%, rgba(0, 61, 77, 0.88) 28%, rgba(0, 102, 128, 0.55) 48%, rgba(0, 163, 201, 0.2) 62%, transparent 78%), url(${contact_img})`,
      }}
    >
    <div className="container mb-10 md:mb-0  mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
      
      <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-wider uppercase">
          Contact Us
        </h1>
        <p className="text-sm md:text-base text-gray-200 max-w-md leading-relaxed font-light">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
        <button className="bg-[#23a6f0] hover:bg-[#1a8cd0] text-white font-bold text-sm tracking-wide px-10 py-4 rounded-md transition duration-300 shadow-md uppercase">
          Contact Us
        </button>
      </div>
  
      <div className="px-10 md:px-0 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 lg:pl-12">
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Paris</h3>
          <p className="text-sm font-medium tracking-wide">1901 Thorn ridge Cir.</p>
          <div className="w-12 h-[2px] bg-[#23a6f0]"></div>
          <div className="text-xs space-y-2 pt-1 font-medium text-gray-200">
            <p>75000 Paris</p>
            <p>Phone : +451 215 215</p>
            <p>Fax : +451 215 215</p>
          </div>
        </div>
  
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold">New York</h3>
          <p className="text-sm font-medium tracking-wide">2715 Ash Dr. San Jose,</p>
          <div className="w-12 h-[2px] bg-[#23a6f0]"></div>
          <div className="text-xs space-y-2 pt-1 font-medium text-gray-200">
            <p>75000 Paris</p>
            <p>Phone : +451 215 215</p>
            <p>Fax : +451 215 215</p>
          </div>
        </div>
  
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Berlin</h3>
          <p className="text-sm font-medium tracking-wide">4140 Parker Rd.</p>
          <div className="w-12 h-[2px] bg-[#23a6f0]"></div>
          <div className="text-xs space-y-2 pt-1 font-medium text-gray-200">
            <p>75000 Paris</p>
            <p>Phone : +451 215 215</p>
            <p>Fax : +451 215 215</p>
          </div>
        </div>
  
        <div className="space-y-3">
          <h3 className="text-xl font-bold">London</h3>
          <p className="text-sm font-medium tracking-wide">3157 W. Gray St. Utica,</p>
          <div className="w-12 h-[2px] bg-[#23a6f0]"></div>
          <div className="text-xs space-y-2 pt-1 font-medium text-gray-200">
            <p>75000 Paris</p>
            <p>Phone : +451 215 215</p>
            <p>Fax : +451 215 215</p>
          </div>

        </div>
  
      </div>
  
    </div>
  </section>
  )
}

export default Contact