import videoThumbnail from '../img/post_img.jpg'

const stats = [
  { value: '15K', label: 'Happy Customers' },
  { value: '150K', label: 'Monthly Visitors' },
  { value: '15', label: 'Countries Worldwide' },
  { value: '100+', label: 'Top Partners' },
]

const AboutStatsAndMedia = () => {
  return (
    <section className="w-full bg-white py-24 font-sans">
      <div className="mx-auto flex max-w-[1050px] flex-col gap-24 px-6 md:px-9">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-[400px] flex-1">
            <span className="mb-6 block text-sm font-semibold tracking-wide text-red">
              Problems trying
            </span>
            <h2 className="text-2xl font-bold leading-8 text-primary">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </h2>
          </div>

          <div className="max-w-[530px] flex-1 lg:pt-11">
            <p className="text-sm leading-5 text-gray-light">
              Problems trying to resolve the conflict between the two major realms
              of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 py-6 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-[58px] font-bold tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="text-base font-bold text-gray-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center">
          <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-[20px] shadow-2xl">
            <img
              src={videoThumbnail}
              alt="Company Video Thumbnail"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play video"
                className="flex h-[98px] w-[98px] items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1a85c2]"
              >
                <svg className="ml-1 h-7 w-7 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutStatsAndMedia
