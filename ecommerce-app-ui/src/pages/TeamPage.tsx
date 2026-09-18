import { Header } from '../layout/Header'
import FooterComponent from '../layout/Footer'
import MeetOurTeam from '../components/MeetOurTeam'

const TeamPage = () => {
  return (
    <>
      <Header greenBackground={true} constrained mobileVariant="shop" />
      <MeetOurTeam />
      <FooterComponent whiteTopBar />
    </>
  )
}

export default TeamPage