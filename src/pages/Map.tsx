import BottomNavigationBar from '../components/BottomNavigationBar'
import GoogleMaps from '../components/GoogleMaps'
import TopBar from '../components/TopBar'
import HomeBtn from '../components/HomeBtn'

function Map() {
  return (
    <>
      <GoogleMaps />
      <TopBar />
      <HomeBtn />
      <BottomNavigationBar />
    </>
  )
}

export default Map
