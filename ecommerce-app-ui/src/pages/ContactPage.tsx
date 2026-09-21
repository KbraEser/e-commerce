
import { useNavigate } from 'react-router-dom'
import Contact from '../components/Contact'

const ContactPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Geri dön"
        className="absolute left-6 top-6 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition-colors hover:bg-white"
      >
        &#8592;
      </button>
      <Contact />
    </div>
  )
}

export default ContactPage