import React from 'react'
import Brands from './Brands'

const AboutComponies = () => {
  return (
    <>
    <div className="w-full bg-text-gray py-16">
    <div className="max-w-[1050px] mx-auto flex flex-col items-center text-center">
    <div className=" max-w-[600px] mb-12 md:mb-16">
        
          <h2 className="text-3xl md:text-4.5xl font-bold text-primary tracking-wide mb-4 leading-tight">
            Big Companies Are Here
          </h2>
       
          <p className="text-sm text-gray-light leading-relaxed font-medium px-4 md:px-0">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        </div>
        
    <Brands />
    </div>
    </>
  )
}

export default AboutComponies