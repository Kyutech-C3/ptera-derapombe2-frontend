import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { Color } from '../graphql/generated'

const CloseButton = styled.div`
  width: 70px;
  height: 70px;
  background-color: rgb(27 27 27 / 70%);
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
`

const ActionButton = styled.div<{ color: Color }>`
  width: 60px;
  height: 60px;
  background-color: ${(props) =>
    props.color == Color.Red ? '#ffe7e7' : '#eaffe7'};
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`

const DigButton = styled(ActionButton)`
  top: -90px;
`

const AttackButton = styled(ActionButton)`
  left: 100px;
  top: -40px;
`

const DetailButton = styled(ActionButton)`
  right: 100px;
  top: -40px;
`

type MapActionButton = {
  onClickCloseButton: () => void
  onClickSignDetailButton: () => void
}

function MapActionButton(props: MapActionButton) {
  const { onClickCloseButton, onClickSignDetailButton } = props

  return (
    <>
      <CloseButton onClick={onClickCloseButton}>
        <IoCloseOutline color="white" size="50" />
        <DigButton color={Color.Green}>発掘</DigButton>
        <AttackButton color={Color.Green}>攻撃</AttackButton>
        <DetailButton color={Color.Green} onClick={onClickSignDetailButton}>
          付与
        </DetailButton>
      </CloseButton>
    </>
  )
}

export default MapActionButton
