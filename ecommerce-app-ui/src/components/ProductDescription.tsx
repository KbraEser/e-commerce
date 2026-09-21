import { useState } from 'react'
import type { Product } from '../store/types'

type ProductDescriptionTabsProps = {
  product: Product
}

export default function ProductDescriptionTabs({ product }: ProductDescriptionTabsProps) {
  const [activeTab, setActiveTab] = useState('additional')

  const listGroup1 = Array(4).fill('Çevik tilki tembel köpeğin üzerinden atlar')
  const listGroup2 = Array(3).fill('Çevik tilki tembel köpeğin üzerinden atlar')

  return (
    <div className="w-full bg-white py-12">
      <div className="mx-auto max-w-[1040px] px-9">
        <div className="mb-12 flex items-center justify-center gap-6 border-b border-[#E8E8E8] pb-6 md:gap-12">
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            className={`cursor-pointer text-sm font-bold transition-colors ${
              activeTab === 'description'
                ? 'text-primary underline decoration-2 underline-offset-8'
                : 'text-gray-light hover:text-primary'
            }`}
          >
            Açıklama
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('additional')}
            className={`cursor-pointer text-sm font-bold transition-colors ${
              activeTab === 'additional'
                ? 'text-primary underline decoration-2 underline-offset-8'
                : 'text-gray-light hover:text-primary'
            }`}
          >
            Ek Bilgiler
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`cursor-pointer text-sm font-bold transition-colors ${
              activeTab === 'reviews'
                ? 'text-primary underline decoration-2 underline-offset-8'
                : 'text-gray-light hover:text-primary'
            }`}
          >
            Yorumlar <span className="text-[#2DC071]">(0)</span>
          </button>
        </div>

        <div className="flex w-full flex-col items-stretch gap-8 md:flex-row md:gap-12">
          <div className="flex w-full justify-center md:w-[35%]">
            <div className="h-[380px] w-full overflow-hidden rounded-lg bg-gray-100 shadow-md">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 md:w-[35%]">
            <h3 className="text-xl font-bold tracking-wide text-primary">
              {product.name}
            </h3>
            <div className="flex flex-col gap-4 text-sm font-normal leading-relaxed text-gray-light">
              <p>{product.description}</p>
              <p>
                Kaliteli malzemeler ve özenli işçilikle üretilen bu ürün, günlük
                kullanımda uzun ömürlü ve konforlu bir deneyim sunar.
              </p>
              <p>
                Kaliteli malzemeler ve özenli işçilikle üretilen bu ürün, günlük
                kullanımda uzun ömürlü ve konforlu bir deneyim sunar.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 md:w-[30%]">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-primary">
                Ek Özellikler
              </h3>
              <div className="flex flex-col gap-3">
                {listGroup1.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-light">
                    <span className="text-xs font-normal text-gray-light">&#10095;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-primary">
                Ek Özellikler
              </h3>
              <div className="flex flex-col gap-3">
                {listGroup2.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm font-bold text-gray-light">
                    <span className="text-xs font-normal text-gray-light">&#10095;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
