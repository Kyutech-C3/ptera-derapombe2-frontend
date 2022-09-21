import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { GoSync } from 'react-icons/go'

const ResultImage = styled.img`
  width: 100vw;
`

const Title = styled.p`
  font-size: 25px;
  font-weight: 500;
`

const ResultContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`

const ResultContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  border-bottom: 1px solid;
  padding: 10px;
`

const ResultSignDetail = styled.div`
  display: flex;
  align-items: center;
`

const ResultSignDetailText = styled.span`
  margin-left: 10px;
  font-size: 20px;
`

const ActionButtonContainer = styled.div`
  margin: 10px 0;
`

const ActionButton = styled.button`
  margin: 0 20px;
`

type CameraResult = {
  imageSource: string
  onClickRecapture: () => void
}

function CameraResult(props: CameraResult) {
  const { imageSource, onClickRecapture } = props
  const navigate = useNavigate()

  return (
    <>
      <ResultImage src={imageSource} alt="result-image" />
      <Title>判定結果</Title>
      <ResultContainer>
        <ResultContent>
          <ResultSignDetail>
            <img
              src="https://freesozai.jp/sozai/roadsign/rds_020.svg"
              width="50"
            />
            <ResultSignDetailText>名前</ResultSignDetailText>
          </ResultSignDetail>
          <div>
            <GoSync color="white" size={30} />
          </div>
        </ResultContent>
        <ResultContent>
          <ResultSignDetail>
            <img
              src="https://freesozai.jp/sozai/roadsign/rds_020.svg"
              width="50"
            />
            <ResultSignDetailText>名前</ResultSignDetailText>
          </ResultSignDetail>
          <div>
            <GoSync color="white" size={30} />
          </div>
        </ResultContent>
      </ResultContainer>
      <ActionButtonContainer>
        <ActionButton onClick={onClickRecapture}>再撮影</ActionButton>
        <ActionButton onClick={() => navigate('/map')}>確定</ActionButton>
      </ActionButtonContainer>
    </>
  )
}

export default CameraResult
