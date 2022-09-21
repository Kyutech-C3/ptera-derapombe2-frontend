import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'
import CameraCapture from '../components/CameraCapture'
import CameraResult from '../components/CameraResult'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  video {
    width: 100vw;
    height: 87.5vh;
  }
`

function Camera() {
  const [image, setImage] = useState<string | undefined>(undefined)
  const webcamRef = useRef<Webcam>(null)
  const onCapture = useCallback(() => {
    const screenShot = webcamRef.current?.getScreenshot()
    if (screenShot) {
      setImage(screenShot)
    }
  }, [webcamRef])

  return (
    <Container>
      {image === undefined ? (
        <CameraCapture webcamRef={webcamRef} onCapture={onCapture} />
      ) : (
        <CameraResult
          imageSource={image}
          onClickRecapture={() => setImage(undefined)}
        />
      )}
    </Container>
  )
}

export default Camera
