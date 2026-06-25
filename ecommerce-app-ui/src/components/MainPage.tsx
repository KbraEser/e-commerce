import mainPageBg from '../img/main-page.jpg'

const MainPage = () => {
  return (
    <section
      className="flex min-h-[753px] w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${mainPageBg})` }}
    >
      <div className="flex w-full max-w-[1044px] flex-col items-center justify-center px-6 py-28 text-center text-white md:items-start md:text-left">
        <div className="flex flex-col items-center gap-7 py-12 md:items-start">
        <h2 className="text-base">SUMMER 2026</h2>
        <h1 className="max-w-60 md:max-w-none text-4xl md:text-6xl md:text-left">NEW COLLECTION</h1>
        <h4 className="max-w-55 md:max-w-70 text-text-gray font-light md:text-left">
          We know how large objects will act, but things on a small scale.
        </h4>
        <button className="bg-button text-white px-10 py-4 rounded-md">
         <span className="text-xl">SHOP NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
