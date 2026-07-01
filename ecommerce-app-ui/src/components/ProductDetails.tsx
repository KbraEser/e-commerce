import { Eye, Heart, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

export default function ProductDetails() {

  const colors = ['#23A6F0', '#2DC071', '#E77C40', '#252B42'];
  const [selectedColor, setSelectedColor] = useState('#23A6F0');

 
  const images = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600',
  ];
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="w-full bg-text-gray  ">
     
      <div className="max-w-[1040px] mx-auto px-9 ">
        
       
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 w-full py-10">
          
       
          <div className="flex flex-col gap-4 w-full md:flex-1">
          
            <div className="relative w-full h-[450px] bg-light overflow-hidden">
              <img 
                src={activeImage} 
                alt="Product Large" 
                className="w-[506px] h-[450px] object-cover"
              />
              
           
              <button className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 text-white text-2xl">
                &#10094;
              </button>
             
              <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 text-white text-2xl">
                &#10095;
              </button>
            </div>

        
            <div className="flex items-center gap-4">
              {images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-secondary' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-25 h-19 object-cover" />
                </button>
              ))}
            </div>
          </div>

         
          <div className="flex flex-col w-full md:flex-1 py-2">
        
            <h2 className="text-xl font-medium text-primary mb-3">
              Cozy Winter Jacket
            </h2>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-xl text-[#F3CD03] gap-0.5">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span className="text-gray-300">&#9733;</span> 
              </div>
              <span className="text-sm font-bold text-gray-light">10 Reviews</span>
            </div>

           
            <div className="text-2xl font-bold text-primary mb-1">
              $1,139.33
            </div>

          
            <div className="text-sm font-bold text-gray-light mb-8">
              Availability : <span className="text-secondary">In Stock</span>
            </div>

     
            <p className="text-sm text-gray-dark font-normal leading-relaxed mb-6 max-w-[450px]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
              RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
              consequent sent nostrum met.
            </p>

           
            <div className="w-full h-[1px] bg-light-open-gray mb-6 max-w-[450px]" />

           
            <div className="flex items-center gap-2.5 mb-12">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    selectedColor === color ? 'scale-110 ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>

           
            <div className="flex items-center gap-3 flex-wrap">
             
              <button className="flex items-center justify-center bg-secondary hover:bg-[#1b8ecc] text-white font-bold text-sm px-6 py-3.5 rounded-md shadow-sm transition-colors">
                Select Options
              </button>

             
              <button className="flex items-center justify-center w-11 h-11 bg-white border border-[#E8E8E8] rounded-full hover:bg-gray-50 text-primary transition-colors shadow-sm">
              <Heart className='w-5 h-5' />
              </button>

             
              <button className="flex items-center justify-center w-11 h-11 bg-white border border-[#E8E8E8] rounded-full hover:bg-gray-50 text-primary transition-colors shadow-sm">
                <ShoppingCart className='w-5 h-5' />
              </button>

             
              <button className="flex items-center justify-center w-11 h-11 bg-white border border-[#E8E8E8] rounded-full hover:bg-gray-50 text-primary transition-colors shadow-sm">
                
                <Eye className='w-5 h-5' />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}