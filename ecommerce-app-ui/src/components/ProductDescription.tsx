import React, { useState } from 'react';

export default function ProductDescriptionTabs() {
 
  const [activeTab, setActiveTab] = useState('additional');

 
  const listGroup1 = Array(4).fill('the quick fox jumps over the lazy dog');
  const listGroup2 = Array(3).fill('the quick fox jumps over the lazy dog');

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-[1040px] mx-auto px-9">
      
        <div className="flex justify-center items-center gap-6 md:gap-12 border-b border-[#E8E8E8] pb-6 mb-12">
          <button 
            onClick={() => setActiveTab('description')}
            className={`text-sm cursor-pointer font-bold transition-colors ${activeTab === 'description' ? 'text-primary underline decoration-2 underline-offset-8' : 'text-gray-light hover:text-primary'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('additional')}
            className={`text-sm cursor-pointer font-bold transition-colors ${activeTab === 'additional' ? 'text-primary underline decoration-2 underline-offset-8' : 'text-gray-light hover:text-primary'}`}
          >
            Additional Information
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`text-sm cursor-pointer font-bold transition-colors ${activeTab === 'reviews' ? 'text-primary underline decoration-2 underline-offset-8' : 'text-gray-light hover:text-primary'}`}
          >
            Reviews <span className="text-[#2DC071]">(0)</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 w-full">
          
       
          <div className="flex w-full md:w-[35%] justify-center">
            <div className="w-full h-[380px] rounded-lg overflow-hidden shadow-md bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600" 
                alt="Product Detail Feature" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

         
          <div className="flex flex-col w-full md:w-[35%] gap-6">
            <h3 className="text-xl font-bold text-primary tracking-wide">
              the quick fox jumps over
            </h3>
            <div className="flex flex-col gap-4 text-sm font-normal text-gray-light leading-relaxed">
              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
                consequent sent nostrum met.
              </p>
              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
                consequent sent nostrum met.
              </p>
              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. 
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial 
                consequent sent nostrum met.
              </p>
            </div>
          </div>

          {/* SÜTUN 3: Sağ Taraf - Başlıklı İkonlu Listeler */}
          <div className="flex flex-col w-full md:w-[30%] gap-6">
            
            {/* Liste Grubu 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-primary ">
                the quick fox jumps over
              </h3>
              <div className="flex flex-col gap-3">
                {listGroup1.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-light">
                    <span className="text-gray-light text-xs font-normal">&#10095;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

           
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-primary ">
                the quick fox jumps over
              </h3>
              <div className="flex flex-col gap-3">
                {listGroup2.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-light">
                    <span className="text-gray-light text-xs font-normal">&#10095;</span>
                    <span >{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}