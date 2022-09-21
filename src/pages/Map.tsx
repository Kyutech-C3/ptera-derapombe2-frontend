import { useState } from 'react'
import BottomNavigationBar from '../components/BottomNavigationBar'
import GoogleMaps from '../components/GoogleMaps'
import SignDetail from '../components/SignDetail'
import TopBar from '../components/TopBar'

function Map() {
  const [displaySignDetail, setDisplaySignDetail] = useState(false)

  return (
    <>
      {displaySignDetail ? (
        <SignDetail id="hogefuga" />
      ) : (
        <>
          <GoogleMaps showSignDetail={() => setDisplaySignDetail(true)} />
          <TopBar />
        </>
      )}
      <BottomNavigationBar displaySignDetail={displaySignDetail} />
    </>
  )
}

export default Map
