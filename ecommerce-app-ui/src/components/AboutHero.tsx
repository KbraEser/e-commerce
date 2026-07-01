import { Link } from 'react-router-dom'
import aboutHeroImg from '../img/abouthero.png'

const AboutHero = () => {
  return (
    <div className="min-h-screen w-full bg-white font-sans text-primary">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <nav className="flex h-[90px] items-center justify-between">
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

          <div className="flex items-center gap-[30px]">
            <Link
              to="/login"
              className="text-sm font-bold text-secondary transition-colors hover:text-[#1a85c2]"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-3.5 rounded-[5px] bg-secondary px-[25px] py-[15px] text-sm font-bold text-white transition-all hover:bg-[#1a85c2]"
            >
              Become a member
              <span className="text-base">&rarr;</span>
            </Link>
          </div>
        </nav>

        <main className="relative flex min-h-[calc(100vh-90px)] flex-col-reverse items-center justify-between py-10 lg:flex-row">
          <div className="z-10 mt-10 max-w-[500px] flex-1 text-center lg:mt-0 lg:text-left">
            <h5 className="mb-[35px] text-sm font-bold tracking-[0.1px] text-primary">
              ABOUT COMPANY
            </h5>
            <h1 className="mb-[35px] text-[40px] font-bold leading-tight text-primary sm:text-[58px] sm:leading-[80px]">
              ABOUT US
            </h1>
            <p className="mb-[35px] text-xl font-normal leading-[30px] text-gray-light">
              We know how large objects will act,
              <br className="hidden sm:inline" />
              but things on a small scale
            </p>
            <button
              type="button"
              className="rounded-[5px] bg-secondary px-10 py-[15px] text-sm font-bold text-white shadow-md transition-colors hover:bg-[#1a85c2]"
            >
              Get Quote Now
            </button>
          </div>

          <div className="relative flex w-full flex-1 items-center justify-center overflow-visible lg:justify-start">
            <div className="relative h-[560px] w-full max-w-[720px] overflow-visible">
              <div className="absolute top-1/2 left-1/2 z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE6E6] sm:h-[480px] sm:w-[480px] lg:left-[40px] lg:translate-x-0" />

              <div className="absolute bottom-[15%] left-[15%] z-0 h-[15px] w-[15px] rounded-full bg-[#9B51E0]" />
              <div className="absolute top-[20%] right-[-6px] z-0 h-3 w-3 rounded-full bg-[#9B51E0] sm:right-[-10px]" />

              <div
                aria-hidden
                className="absolute z-0 rounded-full bg-[#FFE9EA]"
                style={{
                  width: '77.39px',
                  height: '77.39px',
                  top: '11.96px',
                  left: '52px',
                }}
              />
              <div
                aria-hidden
                className="absolute z-0 rounded-full bg-[#FFE9EA]"
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
                className="absolute bottom-0 left-1/2 z-10 h-[520px] w-auto origin-bottom -translate-x-[68%] scale-x-[1.2] select-none sm:h-[540px] sm:-translate-x-[72%] sm:scale-x-[1.25] lg:-left-24 lg:h-[560px] lg:origin-bottom-left lg:translate-x-0 lg:scale-x-[1.3]"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AboutHero
