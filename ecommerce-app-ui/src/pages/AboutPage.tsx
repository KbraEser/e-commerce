import AboutHero from '../components/AboutHero'
import AboutStatsAndMedia from '../components/AboutStatsAndMedia'
import MeetOurTeam from '../components/MeetOurTeam'
import AboutComponies from '../components/AboutComponies'
import AboutWorkUs from '../components/AboutWorkUs'
import Footer from '../components/Footer'
const AboutPage = () => {
  return <>
  <AboutHero />
  <AboutStatsAndMedia />
  <MeetOurTeam/>
  <AboutComponies />
  <AboutWorkUs />
  <Footer whiteTopBar={true} />
  </>
}

export default AboutPage