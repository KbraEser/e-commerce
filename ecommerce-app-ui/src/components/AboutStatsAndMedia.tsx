import { FaPlay } from 'react-icons/fa'
import videoThumbnail from '../img/thumbil_video.jpg'

const stats = [
  { value: '15K', label: 'Mutlu Müşteri' },
  { value: '150K', label: 'Aylık Ziyaretçi' },
  { value: '15', label: 'Ülkede Hizmet' },
  { value: '100+', label: 'Üst Düzey Partner' },
]

const AboutStatsAndMedia = () => {
  return (
    <section className="w-full bg-white  font-sans">
      <div className="mx-auto max-w-[1050px] px-6 md:px-9">
        <div className="flex flex-col gap-24">
          <div className="grid grid-cols-1 gap-x-16 gap-y-[60px] py-20 text-center md:py-0 lg:grid-cols-2 lg:items-start lg:text-left">
            <span className="text-sm font-semibold tracking-wide text-red">
              Neler Yapıyoruz
            </span>
            <div className="hidden lg:block" aria-hidden />
            <h2 className="mx-auto max-w-[400px] text-2xl font-bold leading-8 text-primary lg:mx-0">
              Kaliteli ürünler ve güvenilir hizmetle her zaman yanınızdayız.
            </h2>
            <p className="mx-auto max-w-[530px] text-sm leading-5 text-gray-light lg:mx-0">
              Klasik fiziğin iki büyük alanı olan Newton mekaniği arasındaki
              çelişkiyi çözmeye çalışırken ortaya çıkan sorunlar
            </p>
          </div>

          <div className="flex flex-col items-center gap-10 py-6 text-center md:flex-row md:justify-between md:gap-x-16 lg:gap-x-20">
            {stats.map((stat) => (
              <div key={stat.label} className="flex w-full flex-col gap-2 px-2 md:w-auto md:flex-1">
                <span className="text-[58px] leading-[80px] font-bold tracking-tight text-primary">
                  {stat.value}
                </span>
                <span className="text-base font-bold text-gray-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-[81px] h-[316px] w-[307px] md:mt-[112px] md:h-auto md:w-full md:max-w-[989px]">
          <div className="group relative h-[316px] w-[307px] cursor-pointer overflow-hidden rounded-[20px] shadow-2xl md:h-[540px] md:w-full md:max-w-[989px]">
            <img
              src={videoThumbnail}
              alt="Şirket Video Küçük Resmi"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Videoyu oynat"
                className="flex h-[98px] w-[98px] cursor-pointer items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1a85c2]"
              >
                <FaPlay className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutStatsAndMedia
