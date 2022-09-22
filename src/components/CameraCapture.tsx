import styled from 'styled-components'
import Webcam from 'react-webcam'
import { useNavigate } from 'react-router-dom'
import { TbArrowBigLeft } from 'react-icons/tb'
import { BiInfoCircle } from 'react-icons/bi'
import { useState } from 'react'

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

const Loader = styled.div`
  position: absolute;
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  ::before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    opacity: 0;
  }
  ::after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment',
}

type CameraCapture = {
  cameraProp: {
    webcamRef: React.LegacyRef<Webcam> | undefined
    nowLoading: boolean
  }
  onCapture: () => void
}

function CameraCapture(props: CameraCapture) {
  const { cameraProp, onCapture } = props
  const navigate = useNavigate()

  return (
    <>
      <Webcam
        audio={false}
        ref={cameraProp.webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <CameraToolBar>
        <CameraToolBarIcon onClick={() => navigate('/map')}>
          <TbArrowBigLeft color="white" size="45" />
        </CameraToolBarIcon>
        <CaptureButton onClick={onCapture}>
          {cameraProp.nowLoading ? <Loader /> : <CaptureButtonLayer />}
        </CaptureButton>
        <CameraToolBarIcon>
          <BiInfoCircle color="white" size="45" />
        </CameraToolBarIcon>
      </CameraToolBar>
    </>
  )
}

export default CameraCapture
