import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'
import CameraCapture from '../components/CameraCapture'
import CameraResult from '../components/CameraResult'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import { usePredictImageMutation } from '../graphql/generated'

const Container = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  video {
    width: 100vw;
    height: 87.5vh;
  }
`

const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
)

function Camera() {
  const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0])
    useLayoutEffect(() => {
      const updateSize = (): void => {
        setSize([window.innerWidth, window.innerHeight])
      }

      window.addEventListener('resize', updateSize)
      updateSize()

      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
  }
  const [width, height] = useWindowSize()

  const [nowLoading, setNowLoading] = useState<boolean>(false)
  const [isAvailable, setAvailable] = useState(false)
  const isFirstRef = useRef(true)
  let screenShot = undefined
  useEffect(() => {
    isFirstRef.current = false
    if ('geolocation' in navigator) {
      setAvailable(true)
    }
  }, [isAvailable])
  const [scores, setScores] = useState<{
    scores: {
      score: number
      signType: number
      signName: string
    }[][]
    url: string
    latitude: number
    longitude: number
  }>({ scores: [], url: '', latitude: NaN, longitude: NaN })
  const [image, setImage] = useState<string | undefined>(undefined)
  const webcamRef = useRef<Webcam>(null)
  const [predictImage] = usePredictImageMutation()
  const onCapture = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setNowLoading(true)
      screenShot = webcamRef.current?.getScreenshot()
      const { latitude, longitude } = position.coords
      console.log(latitude)
      console.log(longitude)

      const blob = atob(screenShot!.replace(/^.*,/, ''))
      let buffer = new Uint8Array(blob.length)
      for (let i = 0; i < blob.length; i++) {
        buffer[i] = blob.charCodeAt(i)
      }

      const storageRef = ref(storage, `sign_image/${uuidv4()}.jpeg`)
      uploadBytes(
        storageRef,
        new File([buffer.buffer], 'image.jpeg', { type: 'image/jpeg' })
      ).then((snapshot) => {
        console.log('Uploaded a blob or file!')
        console.log(snapshot.ref.fullPath)
        setImage(snapshot.ref.fullPath)
        const image_path = snapshot.ref.fullPath?.split('/')
        const image_url = `https://firebasestorage.googleapis.com/v0/b/sign-gress.appspot.com/o/${image_path[0]}%2F${image_path[1]}?alt=media`
        // const image_url =
        //   'https://firebasestorage.googleapis.com/v0/b/sign-gress.appspot.com/o/IMG_7011_r.jpg?alt=media'
        predictImage({
          variables: { file: image_url },
        }).then((value) => {
          value.data?.predictImage.scores &&
            setScores({
              scores: value.data?.predictImage.scores,
              url: image_url,
              latitude: latitude,
              longitude: longitude,
            })
          // scores.map((_, i) => {
          //   let oldScoreIndex = scoreIndex
          //   oldScoreIndex[i] = 0
          //   setScoreIndex(oldScoreIndex)
          // })
        })
      })
    })
  }, [webcamRef])

  if (isFirstRef.current) return <div className="App">Loading...</div>

  return (
    <Container style={{ height: height + 'px' }}>
      {!isFirstRef && !isAvailable && <ErrorText />}
      {image === undefined && screenShot === undefined ? (
        <CameraCapture
          cameraProp={{ webcamRef: webcamRef, nowLoading: nowLoading }}
          onCapture={onCapture}
        />
      ) : (
        <CameraResult
          predictResult={scores}
          onClickRecapture={() => {
            setScores({ scores: [], url: '', latitude: NaN, longitude: NaN })
            setImage(undefined)
            setNowLoading(false)
            screenShot = undefined
          }}
        />
      )}
    </Container>
  )
}

export default Camera
