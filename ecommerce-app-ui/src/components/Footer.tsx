import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

type FooterProps = {
  whiteTopBar?: boolean
}

const Footer = ({ whiteTopBar = false }: FooterProps) => {
  const containerClass = whiteTopBar
    ? 'mx-auto w-full max-w-[1050px] px-9'
    : 'mx-auto w-full max-w-[1440px] px-11 md:px-24'

  return (
    <footer className="w-full bg-white font-sans text-gray-600">
      <div className={whiteTopBar ? 'bg-white' : 'bg-text-gray'}>
      <div
        className={`flex flex-col items-start justify-between gap-4 border-b border-[#E6E6E6] py-15 md:flex-row md:items-center ${containerClass}`}
      >
        <h2 className="text-2xl font-bold text-primary">Bandage</h2>
        <div className="flex items-center gap-5 text-secondary">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </div>
    
  
   
    <div className="bg-white">
      <div
        className={`flex flex-col gap-8 py-16 md:flex-row ${containerClass}`}
      >
        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Şirket Bilgisi</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">Hakkımızda</a>
            <a href="#" className="hover:text-primary">Kariyer</a>
            <a href="#" className="hover:text-primary">İşe Alım Yapıyoruz</a>
            <a href="#" className="hover:text-primary">Blog</a>
          </div>
        </div>


        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Yasal</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">Hakkımızda</a>
            <a href="#" className="hover:text-primary">Kariyer</a>
            <a href="#" className="hover:text-primary">İşe Alım Yapıyoruz</a>
            <a href="#" className="hover:text-primary">Blog</a>
          </div>
        </div>


        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Özellikler</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">İşletme Pazarlama</a>
            <a href="#" className="hover:text-primary">Kullanıcı Analitiği</a>
            <a href="#" className="hover:text-primary">Canlı Destek</a>
            <a href="#" className="hover:text-primary">Sınırsız Destek</a>
          </div>
        </div>


        <div className="md:flex-[2]">
          <h5 className="mb-5 text-base font-bold text-primary">Kaynaklar</h5>
          <div className="flex flex-col gap-3 text-sm font-bold text-gray-light">
            <a href="#" className="hover:text-primary">IOS & Android</a>
            <a href="#" className="hover:text-primary">Demo İzleyin</a>
            <a href="#" className="hover:text-primary">Müşteriler</a>
            <a href="#" className="hover:text-primary">API</a>
          </div>
        </div>

        <div className="md:flex-[4]">
          <h5 className="mb-5 text-base font-bold text-primary">Bize Ulaşın</h5>
          <form className="mb-2 flex max-w-full">
            <input
              type="email"
              placeholder="E-posta Adresiniz"
              className="w-full rounded-l-md border border-[#E6E6E6] bg-[#F9F9F9] px-4 py-4 text-sm text-gray-light focus:border-secondary focus:outline-none"
                required
            />
            <button
              type="submit"
              className="cursor-pointer whitespace-nowrap rounded-r-md bg-secondary px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#1b8ecf]"
            >
              Abone Ol
            </button>
          </form>
          <p className="text-xs tracking-wide text-gray-light">Fırsatlardan haberdar olun</p>
        </div>

      </div>
    </div>
  
    
   
    <div className="bg-text-gray">
      <div
        className={`py-6 text-center md:text-left ${containerClass}`}
      >
        <p
          className={`text-sm font-bold text-gray-light  ${
            whiteTopBar ? 'text-left' : 'mx-auto text-center w-[200px]'
          }`}
        >
          Tüm Hakları Saklıdır
        </p>
      </div>
    </div> 
  
  </footer>
  )
}

export default Footer