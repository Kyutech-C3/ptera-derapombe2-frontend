import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { GoSync } from 'react-icons/go'
import { useRegistSignMutation } from '../graphql/generated'
import { useCookies } from 'react-cookie'

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
  predictResult: {
    scores: {
      score: number
      signType: number
      signName: string
    }[][]
    url: string
    latitude: number
    longitude: number
  }
  onClickRecapture: () => void
}

function CameraResult(props: CameraResult) {
  // const [scoreIndex, setScoreIndex] = useState<number[]>([])
  const [cookies] = useCookies<
    'accessToken',
    {
      accessToken?: string
    }
  >(['accessToken'])
  const { predictResult, onClickRecapture } = props
  const navigate = useNavigate()
  const [registSign] = useRegistSignMutation()

  return (
    <>
      <ResultImage src={predictResult.url} alt="result-image" />
      <Title>判定結果</Title>
      <ResultContainer>
        {predictResult.scores.map((score, index) => (
          <ResultContent key={index}>
            <ResultSignDetail>
              <img
                src={`https://sign-gress-server.azurewebsites.net/static/${(
                  '0' + score[index].signType
                ).slice(-2)}rds_0${('0' + score[index].signType).slice(
                  -2
                )}_r.png`}
                width="50"
              />
              <ResultSignDetailText>
                {score[index].signName}
              </ResultSignDetailText>
            </ResultSignDetail>
            {/* <div
              onClick={() => {
                scoreIndex[index]++
                setScoreIndex(scoreIndex)
              }}
            >
              <GoSync color="white" size={30} />
            </div> */}
          </ResultContent>
        ))}
      </ResultContainer>
      <ActionButtonContainer>
        <ActionButton onClick={onClickRecapture}>再撮影</ActionButton>
        <ActionButton
          onClick={() => {
            console.log(cookies)
            let signTypes: number[] = []
            predictResult.scores.map((score) => {
              signTypes.push(score[0].signType)
            })
            registSign({
              variables: {
                baseSignTypes: signTypes,
                longitude: predictResult.longitude,
                latitude: predictResult.latitude,
                imagePath: predictResult.url,
              },
              context: {
                headers: {
                  Authorization: `Bearer ${cookies.accessToken ?? ''}`,
                },
              },
              onError: (error) => {
                console.error(error)
              },
            }).then((value) => {
              console.log(value.data?.registSign)
              navigate('/map')
            })
          }}
        >
          確定
        </ActionButton>
      </ActionButtonContainer>
    </>
  )
}

export default CameraResult
