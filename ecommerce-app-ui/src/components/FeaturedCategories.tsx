import sport from '../img/featuredCategory/sport.jpg'
import women from '../img/featuredCategory/women.jpg'
import pijamas from '../img/featuredCategory/pijamas.jpg'
import shoes from '../img/featuredCategory/shoes.jpg'
import accessory from '../img/featuredCategory/ accessory.jpg'

export default function FeaturedCategories() {
  const categories = [
    { id: 1, name: 'Sport', itemsCount: 12, imgSrc: sport },
    { id: 2, name: 'Women', itemsCount: 8, imgSrc: women },
    { id: 3, name: 'Pijamas', itemsCount: 15, imgSrc: pijamas },
    { id: 4, name: 'Shoes', itemsCount: 24, imgSrc: shoes },
    { id: 5, name: 'Accessory', itemsCount: 6, imgSrc: accessory },
  ];

  return (
   
    <div className="w-full bg-text-gray py-8">
      
  
      <div className="max-w-[1250px] mx-auto px-6 md:px-24">
        
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative flex flex-col justify-center items-center w-full md:flex-1 h-[250px] overflow-hidden group cursor-pointer"
            >
          
              <img
                src={category.imgSrc}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              
              <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/45" />

              <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
            
                <h3 className="text-base font-bold tracking-wide uppercase mb-1">
                  {category.name}
                </h3>
             
                <p className="text-xs font-medium opacity-90">
                  {category.itemsCount} Items
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}