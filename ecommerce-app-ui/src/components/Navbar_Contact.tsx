import { Mail, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

type ContactProps = {
  greenBackground?: boolean
  constrained?: boolean
}

const Navbar_Contact = ({
  greenBackground = false,
  constrained = false,
}: ContactProps) => {
  return (
    <section
      className={`hidden lg:flex h-14 w-full items-center ${
        greenBackground ? 'bg-green-background' : 'bg-primary'
      }`}
    >
      <div
        className={`flex w-full items-center px-6 ${
          constrained ? 'mx-auto max-w-[1050px]' : ''
        }`}
      >
        <div className='flex w-full justify-between items-center gap-2 text-white'>
            
            <div className='flex items-center '>

            <div className='flex items-center gap-1 px-3'>
                <Phone className='text-gray-400 w-5' />
                <h3>(225) 555-0118</h3>
            </div>
            <div className='flex items-center gap-1 px-3'>
                <Mail className='text-gray-400 w-5' />
                <h3>kubrademirbaseser@gmail.com</h3>
            </div>
            </div>

            <div className='flex items-center '>
                <h3>Bizi takip edin, %80 indirim kazanın</h3>

            </div>

            <div className='flex items-center gap-2'>
                <h3>Bizi Takip Edin : </h3>
                <div className='flex items-center gap-3 text-xl'>
                    <a
                      href='https://www.linkedin.com/in/k%C3%BCbra-eser-612851169/'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='LinkedIn'
                      className='flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#0A66C2] hover:text-white'
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href='https://www.youtube.com/@devKubraEser'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='YouTube'
                      className='flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#FF0000] hover:text-white'
                    >
                      <FaYoutube />
                    </a>
                    <a
                      href='https://github.com/KbraEser'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='GitHub'
                      className='flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white hover:text-black'
                    >
                      <FaGithub />
                    </a>
                </div>
            </div>


            
        </div>
      </div>
    </section>
  )
}

export default Navbar_Contact