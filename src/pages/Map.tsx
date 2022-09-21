import { useState } from 'react'
import { useCookies } from 'react-cookie'
import BottomNavigationBar from '../components/BottomNavigationBar'
import GoogleMaps from '../components/GoogleMaps'
import SignDetail from '../components/SignDetail'
import TopBar from '../components/TopBar'
import HomeBtn from '../components/HomeBtn'
import { useMapPageInfoQuery } from '../graphql/generated'

function Map() {
  const [displaySignDetail, setDisplaySignDetail] = useState(false)
  const [cookies] = useCookies<
    'accessToken',
    {
      accessToken?: string
    }
  >(['accessToken'])
  const mapPageInfo = useMapPageInfoQuery({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return mapPageInfo.data ? (
    <>
      {displaySignDetail ? (
        <>
          <SignDetail id="hogefuga" />
          <HomeBtn />
        </>
      ) : (
        <>
          <GoogleMaps
            data={mapPageInfo.data}
            showSignDetail={() => setDisplaySignDetail(true)}
          />
          <TopBar data={mapPageInfo.data} />
        </>
      )}
      <BottomNavigationBar
        groupColor={mapPageInfo.data.user.group}
        displaySignDetail={displaySignDetail}
      />
    </>
  ) : (
    <></>
  )
}

export default Map
