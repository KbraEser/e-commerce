import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

type FooterProps = {
  whiteTopBar?: boolean
}

const Footer = ({ whiteTopBar = false }: FooterProps) => {
  return (
    <footer className="w-full bg-white font-sans text-gray-600">
      <div className={whiteTopBar ? 'bg-white' : 'bg-text-gray'}>
      <div className="max-w-[1440px] mx-auto px-11 md:px-24 py-15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E6E6E6]">
        <h2 className="text-2xl font-bold text-primary">Bandage</h2>
        <div className="flex items-center gap-5 text-secondary">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </div>
    
  
   
    <div className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-11 py-16 md:flex-row md:px-24">
        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Company Info</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">About Us</a>
            <a href="#" className="hover:text-primary">Carrier</a>
            <a href="#" className="hover:text-primary">We are hiring</a>
            <a href="#" className="hover:text-primary">Blog</a>
          </div>
        </div>
  
        
        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Legal</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">About Us</a>
            <a href="#" className="hover:text-primary">Carrier</a>
            <a href="#" className="hover:text-primary">We are hiring</a>
            <a href="#" className="hover:text-primary">Blog</a>
          </div>
        </div>
  
       
        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Features</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">Business Marketing</a>
            <a href="#" className="hover:text-primary">User Analytic</a>
            <a href="#" className="hover:text-primary">Live Chat</a>
            <a href="#" className="hover:text-primary">Unlimited Support</a>
          </div>
        </div>
  
       
        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Resources</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">IOS & Android</a>
            <a href="#" className="hover:text-primary">Watch a Demo</a>
            <a href="#" className="hover:text-primary">Customers</a>
            <a href="#" className="hover:text-primary">API</a>
          </div>
        </div>

        <div className="md:flex-[4]">
          <h5 className="mb-5 text-base font-bold text-primary">Get In Touch</h5>
          <form className="mb-2 flex max-w-full">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full rounded-l-md border border-[#E6E6E6] bg-[#F9F9F9] px-4 py-4 text-sm text-gray-light focus:border-secondary focus:outline-none"
                required
            />
            <button 
              type="submit" 
              className="whitespace-nowrap rounded-r-md bg-secondary px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#1b8ecf]"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs tracking-wide text-gray-light">Lore imp sum dolor Amit</p>
        </div>

      </div>
    </div>
  
   
    <div className="bg-text-gray">
      <div className="max-w-[1440px] mx-auto px-6 md:px-24 py-6 text-center md:text-left">
        <p className="text-sm font-bold text-center text-gray-light w-[200px] mx-auto">Made With Love By Finland All Right Reserved</p>
      </div>
    </div>
  
  </footer>
  )
}

export default Footer