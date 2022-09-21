import styled from 'styled-components'
import { Color } from '../graphql/generated'

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
  margin-top: 11vh;
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
`

const ResistanceItem = styled.div`
  margin: auto;
  width: 60px;
  height: 60px;
  border: 1px dotted;
  border-radius: 5px;
  background-image: url('../assets/images/attack-1.png');
  background-size: cover;
`

type SignDetail = {
  id: string
}

function SignDetail(props: SignDetail) {
  const { id } = props

  return (
    <Container color={Color.Red}>
      <PhotoImage imageUrl="https://img.goo-net.com/sss/magazine/2019/09/06/cf6d1611f4852da31b6c339e10da7c0a.jpg">
        <PhotoImageDetail>
          <SignLatLngTextContainer>
            <SignLatLngText>緯度: 123.4567</SignLatLngText>
            <SignLatLngText>経度: 123.4567</SignLatLngText>
          </SignLatLngTextContainer>
          <div>
            <SignImage
              src="https://freesozai.jp/sozai/roadsign/rds_020.svg"
              alt="rds_020"
            />
            <SignImage
              src="https://freesozai.jp/sozai/roadsign/rds_020.svg"
              alt="rds_020"
            />
            <SignImage
              src="https://freesozai.jp/sozai/roadsign/rds_020.svg"
              alt="rds_020"
            />
          </div>
        </PhotoImageDetail>
        <ColorIcon src="../assets/images/icon-kitsune.png" alt="icon-kitsune" />
      </PhotoImage>
      <SignInfoContainer>
        <SignInfo>
          <SignInfoTextContent>
            耐久値:
            <SignInfoText>
              300<SignInfoAddText>+50</SignInfoAddText>
            </SignInfoText>
          </SignInfoTextContent>
          <SignInfoTextContent>
            経験値:<SignInfoText>20~40</SignInfoText> EXP
          </SignInfoTextContent>
          <SignInfoTextContent>
            攻撃耐性値:
            <SignInfoText>
              300<SignInfoAddText>+10</SignInfoAddText>
            </SignInfoText>
          </SignInfoTextContent>
          <SignInfoTextContent>
            リンク数:<SignInfoText>0/5</SignInfoText>
          </SignInfoTextContent>
        </SignInfo>
        <ProgressBar>
          <ProgressDegree ratio={0.65} color={Color.Red}>
            <span>{0.65 * 100}%</span>
          </ProgressDegree>
        </ProgressBar>
        <ResistanceItems>
          <ResistanceItemContent>
            <ResistanceItem />
            <span>攻撃耐性 +50</span>
          </ResistanceItemContent>
          <ResistanceItemContent>
            <ResistanceItem />
            <span>攻撃耐性 +50</span>
          </ResistanceItemContent>
          <ResistanceItemContent>
            <ResistanceItem />
            <span>攻撃耐性 +50</span>
          </ResistanceItemContent>
          <ResistanceItemContent>
            <ResistanceItem />
            <span>攻撃耐性 +50</span>
          </ResistanceItemContent>
          <ResistanceItemContent>
            <ResistanceItem />
            <span>攻撃耐性 +50</span>
          </ResistanceItemContent>
          <ResistanceItemContent>
            <ResistanceItem />
            <span>攻撃耐性 +50</span>
          </ResistanceItemContent>
        </ResistanceItems>
      </SignInfoContainer>
    </Container>
  )
}

export default SignDetail
