import styled from 'styled-components'
import { BsBoxSeam } from 'react-icons/bs'
import { BiLibrary } from 'react-icons/bi'
import { AiOutlineHome } from 'react-icons/ai'
import { useState } from 'react'
import { Color } from '../graphql/generated'

const Container = styled.div<{ color: Color }>`
  background-color: ${(props) =>
    props.color == Color.Red ? '#ffe7e7' : '#eaffe7'};
  background-image: ${(props) => `url(
    ${
      props.color == Color.Red
        ? '../assets/images/bg-red.png'
        : '../assets/images/bg-green.png'
    })`};
  color: black;
  display: grid;
  justify-content: space-around;
  align-items: center;
`

const Head = styled.h2`
  margin: 0 auto;
  max-height: 10px;
  padding: 10px;
  text-align: center;
`

const Foot = styled.footer`
  margin: 0;
  display: flex;
  width: 100vw;
  min-height: 80px;
`

const SubBack = styled.article<{ color: Color }>`
  margin: 20px auto;
  padding: 20px 0px;
  width: 90%;
  height: 70vh;
  background-color: rgb(255, 255, 255, 0.8);
  border: 3px solid;
  border-color: ${(props) =>
    props.color == Color.Red ? '#ff8f8f' : '#96ff89'};
  border-radius: 20px;
`

const SetContents = styled.section`
  margin: 0 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc((100%) / 4));
  grid-row-gap: 20px;
  row-gap: 20px;
  grid-column-gap: 20px;
  -moz-column-gap: 20px;
  column-gap: 20px;
  justify-items: center;
  justify-content: center;
  /* padding-top: 20px;
  padding-bottom: 40px;
  display: flex;
  height: 20;
  justify-content: space-around; */
`

//後で書き換える
// const HomeLink = styled.a`
//   background: transparent;
// `

const Btn = styled.button`
  border-radius: 0;
  align-items: center;
`

const SetHome = styled(AiOutlineHome)`
  display: flex;
  margin: auto;
  margin-top: -10px;
  margin-bottom: -25px;
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 100%;
  z-index: 2;
`

const SetBtn = styled(Btn)`
  display: flex;
  margin: -10px 0 0;
  width: 100vw;
  height: 60px;
  justify-content: space-around;
`
const InventoryBox = styled(SetBtn)<{ isAction: boolean }>`
  background: ${(props) => (props.isAction ? 'transparent' : 'white')};
`

const CollectBox = styled(SetBtn)<{ isAction: boolean }>`
  background: ${(props) => (props.isAction ? 'white' : 'transparent')};
`

const Items = styled.button`
  margin: 0;
  width: 100%;
  height: 70px;
  background-color: #5893e0;
  align-items: center;
  text-align: center;
`

const ItemEx = styled.div`
  margin-top: -50vh;
  width: 100%;
  min-height: 30vh;
  color: white;
  background-color: rgb(100, 100, 100, 0.9);
`

const items = ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B']
const itemExplanation = [
  { name: 'aiueo', id: 't78uiyt678yyt' },
  { name: 'oeuia', id: 't78uiyt678yyt' },
  { name: 'aioeu', id: 't78uiyt678yyt' },
]

function Inventory() {
  const [inventoryBtn, setInventoryBtn] = useState(true)
  const [visible, setVisible] = useState(true)

  return (
    <Container color={Color.Red}>
      {inventoryBtn ? (
        <>
          <Head>ITEM</Head>
          <SubBack color={Color.Red}>
            <SetContents>
              {items.map((item, i) => {
                return (
                  <Items onClick={() => setVisible(false)} key={i}>
                    {item}
                  </Items>
                )
              })}
            </SetContents>
          </SubBack>
        </>
      ) : (
        <>
          <Head>COLLECTION</Head>
          <SubBack color={Color.Red}>
            <SetContents>
              {items.map((item, i) => {
                return (
                  <Items onClick={() => setVisible(false)} key={i}>
                    {item}
                  </Items>
                )
              })}
            </SetContents>
          </SubBack>
        </>
      )}
      {!visible && (
        <ItemEx>
          {itemExplanation.map((item, i) => {
            return (
              <div onClick={() => setVisible(false)} key={i}>
                {item.name} : {item.id}
              </div>
            )
          })}
        </ItemEx>
      )}
      <SetHome href="/map">
        <AiOutlineHome color="black" />
      </SetHome>
      <Foot>
        <InventoryBox
          onClick={() => setInventoryBtn(true)}
          isAction={inventoryBtn}
        >
          <BsBoxSeam color="black" size="40" />
        </InventoryBox>
        <CollectBox
          onClick={() => setInventoryBtn(false)}
          isAction={inventoryBtn}
        >
          <BiLibrary color="black" size="40" />
        </CollectBox>
      </Foot>
    </Container>
  )
}

export default Inventory
