import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import styled from 'styled-components'
import { Color } from '../graphql/generated'

const SetHome = styled(AiOutlineHome)<{
  borderColor: Color
  isAction: boolean
}>`
  position: absolute;
  margin: 0;
  padding: 10px;
  width: 40px;
  height: 40px;
  color: black;
  box-shadow: 0px 3px 3px #8a939c;
  background-color: white;
  border-radius: 100%;
  border: 3px solid
    ${(props) => (props.borderColor == Color.Red ? '#ff8f8f' : '#96ff89')};
  top: 85%;
  left: 50%;
  transform: translateY(-15%);
  transform: translateX(-50%);
`
const HomeLink = styled(Link)`
  z-index: 5;
`

function HomeBtn() {
  const [inventoryBtn, setInventoryBtn] = useState(true)

  return (
    <HomeLink to="/map">
      <SetHome
        onClick={() => setInventoryBtn(true)}
        isAction={inventoryBtn}
        borderColor={Color.Green}
      />
    </HomeLink>
  )
}

export default HomeBtn
