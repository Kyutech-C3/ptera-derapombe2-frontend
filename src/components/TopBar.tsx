import styled from 'styled-components'
import { Color, MapPageInfoQuery } from '../graphql/generated'

const Container = styled.div<{ color: Color }>`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 7vh;
  background-color: ${(props) =>
    props.color == Color.Red
      ? 'rgb(255 231 231 / 70%)'
      : 'rgb(234 255 231 / 70%)'};
  z-index: 10;
`

const MainContents = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Contents = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`

const CircleAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`

const Text = styled.span`
  font-size: 12px;
  color: black;
  line-height: 15px;
`

const RatioProgressBar = styled.div`
  width: 80px;
  height: 10px;
  margin: 0 5px;
  border-radius: 3px;
  background-color: #00c62b;
`

const RatioProgressRedDegree = styled.div<{ ratio: number }>`
  width: ${(props) => `${props.ratio}%`};
  height: 10px;
  border-radius: 3px 0 0 3px;
  background-color: #ff0000;
`

const ExpProgressBar = styled.div`
  width: 100vw;
  height: 3px;
  background-color: #999999;
`
const ExpProgressDegree = styled.div<{ ratio: number }>`
  width: ${(props) => `${100 * props.ratio}%`};
  height: 3px;
  background-color: #3a4eff;
`

type TopBar = {
  data: MapPageInfoQuery
}

function TopBar(props: TopBar) {
  const { data } = props

  return (
    <Container color={data.user.group}>
      <MainContents>
        <Contents>
          <CircleAvatar src={data.user.avatarUrl} />
          <UserInfo>
            <Text>{data.user.name}</Text>
            <Text>Lv. {data.user.level}</Text>
          </UserInfo>
        </Contents>
        <Contents>
          <img src="/images/icon-kitsune.png" height="30" />
          <RatioProgressBar>
            <RatioProgressRedDegree ratio={data.powerRatio.red} />
          </RatioProgressBar>
          <img src="/images/icon-tanuki.png" height="30" />
        </Contents>
      </MainContents>
      <ExpProgressBar>
        <ExpProgressDegree ratio={0.24} />
      </ExpProgressBar>
    </Container>
  )
}

export default TopBar
