import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import AttackNotify from '../components/AttackNotify'
import BottomNavigationBar from '../components/BottomNavigationBar'
import ExhumeNotify from '../components/ExhumeNotify'
import GoogleMaps from '../components/GoogleMaps'
import MyAttackItemsModal from '../components/MyAttackItemsModal'
import SignDetail from '../components/SignDetail'
import TopBar from '../components/TopBar'
import {
  AttackSignMutation,
  useAttackSignMutation,
  useCaptureSignMutation,
  useExhumeSignMutation,
  useMapPageInfoQuery,
} from '../graphql/generated'

function Map() {
  const [displaySignDetail, setDisplaySignDetail] = useState(false)
  const [signIndex, setSignIndex] = useState(0)
  const [showExhumeNotify, setShowExhumeNotify] = useState(false)
  const [showAttackNotify, setShowAttackNotify] = useState(false)
  const [showAttackSignIndex, setShowAttackSignIndex] = useState(0)
  const [showAttackSignModal, setShowAttackSignModal] = useState(false)
  const [attackResult, setAttackResult] = useState<AttackSignMutation | null>(
    null
  )
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
  const [attackSign] = useAttackSignMutation({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
  })
  const [exhumeSign, { data }] = useExhumeSignMutation({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
  })
  const [captureSign] = useCaptureSignMutation({
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

  useEffect(() => {
    if (showAttackNotify) {
      setTimeout(() => {
        setShowAttackNotify(false)
      }, 5000)
    }
  }, [showAttackNotify])

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
            onClickAttackSign={(index) => {
              setShowAttackSignIndex(index)
              setShowAttackSignModal(true)
            }}
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
            onClickGetButton={(index) => {
              void captureSign({
                variables: {
                  signId: mapPageInfo.data?.mapInfo.signs[index].id ?? '',
                },
              })
            }}
          />
          {showExhumeNotify && data ? <ExhumeNotify data={data} /> : <></>}
          {showAttackNotify && attackResult ? (
            <AttackNotify data={attackResult} />
          ) : (
            <></>
          )}
          {showAttackSignModal ? (
            <MyAttackItemsModal
              doAttack={(selectedItemId) => {
                void attackSign({
                  variables: {
                    signId:
                      mapPageInfo.data?.mapInfo.signs[showAttackSignIndex].id ??
                      '',
                    itemId: selectedItemId,
                  },
                }).then((result) => {
                  if (result.data) {
                    setAttackResult(result.data)
                    setShowAttackSignModal(false)
                    setShowAttackNotify(true)
                  }
                })
              }}
              closeModal={() => setShowAttackSignModal(false)}
            />
          ) : (
            <></>
          )}
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
