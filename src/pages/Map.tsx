import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import BottomNavigationBar from '../components/BottomNavigationBar'
import ExhumeNotify from '../components/ExhumeNotify'
import GoogleMaps from '../components/GoogleMaps'
import SignDetail from '../components/SignDetail'
import TopBar from '../components/TopBar'
import {
  useExhumeSignMutation,
  useMapPageInfoQuery,
} from '../graphql/generated'

function Map() {
  const [displaySignDetail, setDisplaySignDetail] = useState(false)
  const [signIndex, setSignIndex] = useState(0)
  const [showExhumeNotify, setShowExhumeNotify] = useState(false)
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
  const [exhumeSign, { data }] = useExhumeSignMutation({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
  })

  useEffect(() => {
    if (showExhumeNotify) {
      setTimeout(() => {
        setShowExhumeNotify(false)
      }, 5000)
    }
  }, [showExhumeNotify, data])

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
            onClickExhumeSign={(index) => {
              void exhumeSign({
                variables: {
                  signId: mapPageInfo.data?.mapInfo.signs[index].id ?? '',
                },
              }).then(() => {
                setShowExhumeNotify(true)
              })
            }}
            showSignDetail={(index) => {
              setDisplaySignDetail(true)
              setSignIndex(index)
            }}
          />
          {showExhumeNotify && data ? <ExhumeNotify data={data} /> : <></>}
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
