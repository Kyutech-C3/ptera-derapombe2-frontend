import { BsCamera, BsHandbag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Color } from '../graphql/generated'

const Container = styled.div<{ color: Color; showSignDetail: boolean }>`
  background-color: ${(props) => props.showSignDetail && 'white !important'};
  background-color: ${(props) =>
    props.color == Color.Red ? '#ffe7e7' : '#eaffe7'};
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const IconText = styled(Link)`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Text = styled.span`
  font-size: 11px;
  color: black;
`

type BottomNavigationBar = {
  groupColor: Color
  displaySignDetail: boolean
}

function BottomNavigationBar(props: BottomNavigationBar) {
  const { groupColor, displaySignDetail } = props

  return (
    <Container color={groupColor} showSignDetail={displaySignDetail}>
      <IconText to="/inventory">
        <BsHandbag color="black" size="30" />
        <Text>インベントリ</Text>
      </IconText>
      <IconText to="/camera">
        <BsCamera color="black" size="30" />
        <Text>標識登録</Text>
      </IconText>
    </Container>
  )
}

export default BottomNavigationBar
