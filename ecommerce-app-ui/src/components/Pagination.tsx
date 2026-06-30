import { useState } from 'react';

export default function Pagination() {
  // Aktif olan sayfayı takip etmek için state (Görselde 2 aktif)
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="flex items-center justify-center py-6 bg-white mb-7">
      
      <nav className="flex items-stretch bg-white border border-light-open-gray rounded-lg shadow-sm overflow-hidden select-none">
        
       
        <button 
          className="flex items-center justify-center px-6 py-6 text-sm font-bold bg-light-open-gray text-gray-light cursor-not-allowed border-r border-light-open-gray transition-colors"
          disabled
        >
          First
        </button>

     
        <button 
          onClick={() => setActivePage(1)}
          className={`flex items-center justify-center px-5 py-6 text-sm font-bold border-r border-[#DEDEDE] transition-colors ${
            activePage === 1 
              ? 'bg-secondary text-white' 
              : 'bg-white text-secondary hover:bg-gray-50'
          }`}
        >
          1
        </button>

        <button 
          onClick={() => setActivePage(2)}
          className={`flex items-center justify-center px-5 py-6 text-sm font-bold border-r border-[#DEDEDE] transition-colors ${
            activePage === 2 
              ? 'bg-secondary text-white' 
              : 'bg-white text-secondary hover:bg-gray-50'
          }`}
        >
          2
        </button>

      
        <button 
          onClick={() => setActivePage(3)}
          className={`flex items-center justify-center px-5 py-6 text-sm font-bold border-r border-[#DEDEDE] transition-colors ${
            activePage === 3 
              ? 'bg-secondary text-white' 
              : 'bg-white text-secondary hover:bg-gray-50'
          }`}
        >
          3
        </button>

        <button 
          onClick={() => setActivePage((prev) => Math.min(prev + 1, 3))}
          className="flex items-center justify-center px-6 py-6 text-sm font-bold bg-white text-secondary hover:bg-gray-50 transition-colors"
        >
          Next
        </button>

      </nav>
    </div>
  );
}