
import brand_1 from '../img/fa-brands-1.png'
import brand_2 from '../img/fa-brands-2.png'
import brand_3 from '../img/fa-brands-3.png'
import brand_4 from '../img/fa-brands-4.png'
import brand_5 from '../img/fa-brands-5.png'
import brand_6 from '../img/fa-brands-6.png'

export default function BrandLogos() {

  const brands = [
    { id: 1, name: 'Hooli', src: brand_1 },
    { id: 2, name: 'Lyft', src: brand_2 },
    { id: 3, name: 'Robinhood', src: brand_3 },
    { id: 4, name: 'Stripe', src: brand_4 },
    { id: 5, name: 'AWS', src: brand_5 },
    { id: 6, name: 'Reddit', src: brand_6 },
  ];

  return (
   
    <div className="w-full bg-[#FAFAFA] py-16">
      
     
      <div className="max-w-[1050px] mx-auto px-6 md:px-24">
        

        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-14  md:gap-5 lg:gap-8">
          
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="flex h-6 min-w-[70px] max-w-[140px] items-center justify-center transition-opacity duration-300 hover:opacity-80"
            >
              <img 
                src={brand.src} 
                alt={`${brand.name} logo`} 
                className="max-h-10 lg:max-h-14 max-w-full object-contain transition-all duration-300 hover:opacity-100" 
              />
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}