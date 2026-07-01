import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function MeetOurTeam() {

  const teamMembers = [
    {
      id: 1,
      name: 'Gökhan Özdemir',
      profession: 'Project Manager',
      imgSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500', 
    },
    {
      id: 2,
      name: 'Kübra Eser',
      profession: 'Full Stack Developer',
      imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500', 
    },
    {
      id: 3,
      name: 'Username',
      profession: 'Profession',
      imgSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500', 
    },
  ];

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1050px] mx-auto px-6 md:px-24 flex flex-col items-center">
        

        <div className="flex flex-col items-center text-center  mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-wide mb-4">
            Meet Our Team
          </h2>
          <p className="text-sm text-gray-light leading-relaxed font-medium">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
          
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="mx-auto flex w-[330px] max-w-full shrink-0 flex-col overflow-hidden bg-white shadow-sm transition-shadow duration-300 hover:shadow-md md:mx-0 md:w-auto md:flex-1"
            >
              <div className="h-[231px] w-full bg-gray-100">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="flex flex-col items-center p-6 text-center">
                <h3 className="text-base font-bold text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-bold text-gray-light mb-4">
                  {member.profession}
                </p>

                <div className="flex items-center gap-4">
                  <a href="#" className="text-secondary hover:text-disabled transition-colors" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-secondary hover:text-disabled transition-colors" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-secondary hover:text-disabled transition-colors" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}