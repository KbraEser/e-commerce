import { Mail, Phone } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

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
                <h3>michelle.rivera@example.com</h3>
            </div>
            </div>

            <div className='flex items-center '>
                <h3>Follow Us  and get a chance to win 80% off</h3>

            </div>

            <div className='flex items-center gap-2'>
                <h3>Follow Us : </h3>
                <div className='flex items-center gap-3 text-xl'>
                    <FaInstagram />
                    <FaYoutube />
                    <FaFacebook />
                    <FaTwitter />
                   
                </div>
            </div>


            
        </div>
      </div>
    </section>
  )
}

export default Navbar_Contact