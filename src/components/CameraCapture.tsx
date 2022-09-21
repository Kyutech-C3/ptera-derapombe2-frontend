import styled from 'styled-components'
import Webcam from 'react-webcam'
import { useNavigate } from 'react-router-dom'
import { TbArrowBigLeft } from 'react-icons/tb'
import { BiInfoCircle } from 'react-icons/bi'

const CameraToolBar = styled.div`
  width: 100%;
  height: 12.5vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CaptureButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border: 1px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CaptureButtonLayer = styled.div`
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
`

const CameraToolBarIcon = styled.div`
  padding: 0 30px;
`

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

type CameraCapture = {
  webcamRef: React.LegacyRef<Webcam> | undefined
  onCapture: () => void
}

function CameraCapture(props: CameraCapture) {
  const { webcamRef, onCapture } = props
  const navigate = useNavigate()

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <CameraToolBar>
        <CameraToolBarIcon onClick={() => navigate('/map')}>
          <TbArrowBigLeft color="white" size="45" />
        </CameraToolBarIcon>
        <CaptureButton onClick={onCapture}>
          <CaptureButtonLayer />
        </CaptureButton>
        <CameraToolBarIcon>
          <BiInfoCircle color="white" size="45" />
        </CameraToolBarIcon>
      </CameraToolBar>
    </>
  )
}

export default CameraCapture
