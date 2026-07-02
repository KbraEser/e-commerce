import { Link } from 'react-router-dom'
import aboutHeroImg from '../img/abouthero.png'
import Navbar_Mobile from './Navbar_Mobile'

const AboutHero = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-primary">
      <Navbar_Mobile variant="about" className="mt-0 mb-8 w-full md:hidden" />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <nav className="hidden h-[90px] items-center justify-between bg-white md:flex">
          <Link to="/" className="text-2xl font-bold tracking-wide text-primary">
            Bandage
          </Link>

          <ul className="hidden list-none items-center gap-[21px] md:flex">
            <li>
              <Link
                to="/"
                className="text-sm font-semibold text-gray-light transition-colors hover:text-secondary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="text-sm font-semibold text-gray-light transition-colors hover:text-secondary"
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className="text-sm font-semibold text-gray-light transition-colors hover:text-secondary"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-light transition-colors hover:text-secondary"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="hidden items-center gap-[30px] md:flex">
            <Link
              to="/login"
              className="text-sm font-bold text-secondary transition-colors hover:text-[#1a85c2]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-3.5 rounded-[5px] bg-secondary px-[25px] py-[15px] text-sm font-bold text-white transition-all hover:bg-[#1a85c2]"
            >
              Become a member
              <span className="text-base">&rarr;</span>
            </Link>
          </div>
        </nav>

        <main className="relative flex min-h-0 flex-col items-center justify-between px-2 py-10 md:min-h-[calc(100vh-90px)] md:px-0 lg:flex-row">
          <div className="z-10 mt-10 max-w-[500px] flex-1 px-2 text-center lg:mt-0 lg:px-0 lg:text-left">
            <h5 className="py-20 md:py-0 mb-[35px] hidden text-sm font-bold tracking-[0.1px] text-primary md:block">
              ABOUT COMPANY
            </h5>
            <h1 className="pb-10 md:pb-0 mb-[35px] text-[40px] font-bold leading-tight text-primary sm:text-[58px] sm:leading-[80px]">
              ABOUT US
            </h1>
            <p className="pb-10 md:pb-0 mb-[35px] text-xl font-normal leading-[30px] text-gray-light">
              We know how large objects will act,
              <br className="hidden sm:inline" />
              but things on a small scale
            </p>
            <button
              type="button"
              className=" rounded-[5px] bg-secondary px-10 py-[15px] text-sm font-bold text-white shadow-md transition-colors hover:bg-[#1a85c2]"
            >
              Get Quote Now
            </button>
          </div>

          <div className="pt-32 md:pt-0 relative flex w-full flex-1 items-end justify-center overflow-hidden md:overflow-visible lg:justify-start">
            <div className="relative aspect-[720/560] w-full max-w-[720px] overflow-hidden md:overflow-visible">
              <div className="absolute top-1/2 left-[6%] aspect-square h-[86%] -translate-y-1/2 rounded-full bg-[#FFE6E6]" />

              <div className="absolute bottom-[15%] left-[4%] z-[5] h-[15px] w-[15px] rounded-full bg-[#9B51E0]" />
              <div className="absolute top-[20%] right-[16%] z-[5] h-3 w-3 rounded-full bg-[#9B51E0]" />

              <div
                aria-hidden
                className="absolute top-[2.1%] left-[3.3%] z-0 aspect-square w-[10.75%] rounded-full bg-[#FFE9EA]"
              />
              <div
                aria-hidden
                className="absolute z-0 hidden rounded-full bg-[#FFE9EA] md:block"
                style={{
                  width: '30.25px',
                  height: '30.25px',
                  top: '247.66px',
                  left: '554.42px',
                }}
              />

              <img
                src={aboutHeroImg}
                alt="Shopping Woman"
                className="absolute bottom-0 left-1/2 z-10 h-full w-auto max-w-none -translate-x-1/2 select-none md:left-[-13%] md:translate-x-0"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AboutHero
