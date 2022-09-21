import { useState } from 'react'
import { useCookies } from 'react-cookie'
import BottomNavigationBar from '../components/BottomNavigationBar'
import GoogleMaps from '../components/GoogleMaps'
import SignDetail from '../components/SignDetail'
import TopBar from '../components/TopBar'
import { useMapPageInfoQuery } from '../graphql/generated'

function Map() {
  const [displaySignDetail, setDisplaySignDetail] = useState(false)
  const [signIndex, setSignIndex] = useState(0)
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
        <SignDetail
          data={mapPageInfo.data}
          index={signIndex}
          onClickCloseButton={() => setDisplaySignDetail(false)}
        />
      ) : (
        <>
          <GoogleMaps
            data={mapPageInfo.data}
            showSignDetail={(index) => {
              setDisplaySignDetail(true)
              setSignIndex(index)
            }}
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
