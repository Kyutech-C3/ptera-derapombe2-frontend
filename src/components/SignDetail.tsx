import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import styled from 'styled-components'
import { Color, ItemEffect, MapPageInfoQuery } from '../graphql/generated'

const Container = styled.div<{ color: Color }>`
  width: 100vw;
  height: 90vh;
  background-color: ${(props) =>
    props.color == Color.Red ? '#ffe7e7' : '#eaffe7'};
`

const PhotoImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 30vh;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
  &:before {
    content: '';
    background: inherit;
    filter: blur(2px);
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
  }
`

const PhotoImageDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

const SignLatLngTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SignLatLngText = styled.span`
  color: black;
`

const SignImage = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 5px;
`

const ColorIcon = styled.img`
  height: 20vh;
  padding: 1vh;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  position: fixed;
  top: 20vh;
  inset: 0;
  margin: 19vh auto;
`

const SignInfoContainer = styled.div`
  padding: 20px;
  color: black;
  font-size: 14px;
`

const SignInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-left: 1px solid;
  border-right: 1px solid;
`

const SignInfoTextContent = styled.span`
  width: 50%;
  text-align: center;
`

const SignInfoText = styled.span`
  margin-left: 2px;
  font-weight: 600;
`

const SignInfoAddText = styled(SignInfoText)`
  color: red;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #999999;
  margin-top: 2vh;
  margin-bottom: 5vh;
  border-radius: 20px;
`
const ProgressDegree = styled.div<{ ratio: number; color: Color }>`
  width: ${(props) => `${100 * props.ratio}%`};
  height: 20px;
  background-color: ${(props) => (props.color === Color.Red ? 'red' : 'green')};
  border-radius: 20px 0 0 20px;
  color: white;
  text-align: center;
  line-height: normal;
`

const ResistanceItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ResistanceItemContent = styled.div`
  width: 33.3333%;
  text-align: center;
  margin-bottom: 10px;
  font-size: 12px;
`

const ResistanceItem = styled.div<{ imagePath: string }>`
  margin: auto;
  width: 60px;
  height: 60px;
  border: 1px dotted;
  border-radius: 5px;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-size: cover;
`

const CloseButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(27 27 27 / 70%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
`

type SignDetail = {
  data: MapPageInfoQuery
  index: number
  onClickCloseButton: () => void
}

function SignDetail(props: SignDetail) {
  const { data, index, onClickCloseButton } = props
  const targetData = data.mapInfo.signs[index]
  const [resistanceValueSum, setResistanceValueSum] = useState(0)
  const [enduranceValueSum, setEnduranceValueSum] = useState(0)

  useEffect(() => {
    let resistance = 1
    let endurance = 0
    data.mapInfo.signs[index].items?.map((item) => {
      if (item.effect === ItemEffect.Resistance) {
        resistance *= item.value
      } else {
        endurance += item.value
      }
    })
    setResistanceValueSum(resistance)
    setEnduranceValueSum(endurance)
  }, [])

  return (
    <Container color={targetData.group ?? Color.Red}>
      <PhotoImage imageUrl={targetData.imagePath}>
        <PhotoImageDetail>
          <SignLatLngTextContainer>
            <SignLatLngText>
              緯度: {targetData.coordinate.latitude}
            </SignLatLngText>
            <SignLatLngText>
              経度: {targetData.coordinate.longitude}
            </SignLatLngText>
          </SignLatLngTextContainer>
          <div>
            {targetData.baseSigns.map((baseSign) => {
              const convertedId: string =
                String(baseSign.type).length !== 1
                  ? baseSign.type.toString()
                  : `0${baseSign.type.toString()}`
              return (
                <SignImage
                  src={`https://sign-gress-server.azurewebsites.net/static/${convertedId}rds_0${convertedId}_r.png`}
                  alt={`${convertedId}rds_0${convertedId}_r`}
                  key={baseSign.id}
                />
              )
            })}
          </div>
        </PhotoImageDetail>
        <ColorIcon
          src={
            targetData.group === Color.Red
              ? '/images/icon-kitsune.png'
              : '/images/icon-tanuki.png'
          }
          alt={targetData.group === Color.Red ? 'icon-kitsune' : 'icon-tanuki'}
        />
      </PhotoImage>
      <CloseButton onClick={onClickCloseButton}>
        <IoCloseOutline color="white" size="40" />
      </CloseButton>
      <SignInfoContainer>
        <SignInfo>
          <SignInfoTextContent>
            耐久値:
            <SignInfoText>
              {targetData.hitPoint}
              <SignInfoAddText>+{enduranceValueSum}</SignInfoAddText>
            </SignInfoText>
          </SignInfoTextContent>
          {/* <SignInfoTextContent>
            経験値:<SignInfoText>20~40</SignInfoText> EXP
          </SignInfoTextContent> */}
          <SignInfoTextContent>
            攻撃耐性値:
            <SignInfoText>
              1<SignInfoAddText>x{resistanceValueSum}</SignInfoAddText>
            </SignInfoText>
          </SignInfoTextContent>
          <SignInfoTextContent>
            リンク数:<SignInfoText>{targetData.linkNum}/2</SignInfoText>
          </SignInfoTextContent>
        </SignInfo>
        <ProgressBar>
          {targetData.hitPoint ? (
            <ProgressDegree
              ratio={targetData.hitPoint / targetData.maxHitPoint}
              color={Color.Red}
            >
              <span>
                {(targetData.hitPoint / targetData.maxHitPoint) * 100}%
              </span>
            </ProgressDegree>
          ) : (
            <></>
          )}
        </ProgressBar>
        <ResistanceItems>
          {targetData.items?.map((item) => {
            return (
              <ResistanceItemContent key={item.id}>
                <ResistanceItem
                  imagePath={
                    item.effect === ItemEffect.Endurance
                      ? `/images/endurance-${item.level}.png`
                      : `/images/attack-${item.level}.png`
                  }
                />
                <span>
                  {item.name} {item.effect === ItemEffect.Endurance ? '+' : 'x'}
                  {item.value}
                </span>
              </ResistanceItemContent>
            )
          })}
          {targetData.items ? (
            [...Array<string>(6 - targetData.items.length)].map((_, i) => {
              return (
                <ResistanceItemContent key={i}>
                  <ResistanceItem imagePath={''} />
                </ResistanceItemContent>
              )
            })
          ) : (
            <></>
          )}
        </ResistanceItems>
      </SignInfoContainer>
    </Container>
  )
}

export default SignDetail
