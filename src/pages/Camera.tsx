import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

function Camera() {
  const [url, setUrl] = useState<string | undefined>(undefined)
  const webcamRef = useRef<Webcam>(null)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setUrl(imageSrc)
    }
  }, [webcamRef])

  return (
    <Container>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      <button
        onClick={() => {
          setUrl(undefined)
        }}
      >
        Delete captured photo
      </button>
      <div>
        <img src={url} alt="Screenshot" />
      </div>
    </Container>
  )
}

export default Camera
