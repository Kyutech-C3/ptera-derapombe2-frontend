import { useState } from 'react'
import { Color } from '../graphql/generated'
import styled from 'styled-components'
import { BsBoxSeam } from 'react-icons/bs'
import { BiLibrary } from 'react-icons/bi'
import HomeBtn from '../components/HomeBtn'

const Container = styled.div<{ color: Color }>`
  background-image: ${(props) => `url(
    ${
      props.color == Color.Red
        ? '../assets/images/bg-red.png'
        : '../assets/images/bg-green.png'
    })`};
  position: relative;
  color: black;
  display: grid;
  width: 100vw;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
`
/*** ヘッダー ***/
const Head = styled.h2`
  margin: 0;
  padding: 2vh 0;
  width: 100%;
  height: 6vh;
  text-align: center;
  transform: translateY(calc(100% / 6));
`
/*** フッター ***/
const Foot = styled.footer`
  margin: 0;
  padding: 0;
  display: flex;
  width: 100vw;
  height: 100%;
`

/*** ボタン ***/
const Btn = styled.button`
  margin: 0;
  border-radius: 0;
  text-align: center;
`
const SetBtn = styled(Btn)`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100vw;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`
const Text = styled.span`
  font-size: 11px;
  color: black;
`
const CloseBtn = styled.button`
  width: 20vw;
  height: 30vh;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 0 8px 8px 0;
`

/*** アイテム表示場所 ***/
const SubBack = styled.article<{ color: Color }>`
  margin: 10vh auto;
  margin-top: 0;
  padding: 20px 0px;
  width: 80%;
  height: 60vh;
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
`

/*** インベントリ中のアイテム ***/
const ItemBox = styled(SetBtn)<{ isAction: boolean }>`
  background: ${(props) => (props.isAction ? 'transparent' : 'white')};
`
const CollectBox = styled(SetBtn)<{ isAction: boolean }>`
  background: ${(props) => (props.isAction ? 'white' : 'transparent')};
`
const Items = styled.button`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 70px;
  background-color: transparent;
  align-items: center;
  text-align: center;
`

/*** アイテムの詳細表示関連 ***/
const ItemExWin = styled.div`
  display: flex;
  margin: 0;
  margin-top: -50vh;
  width: 100%;
  height: 30vh;
  color: white;
  border-radius: 0 8px 8px 0;
  background-color: rgb(100, 100, 100, 0.9);
`
const ItemDetails = styled.div`
  display: flex;
  background-color: transparent;
  width: 80vw;
`
const ItemExIcon = styled.div`
  padding: 10vh 0;
  /* padding-left: 1vw; */
  width: 25vw;
  text-align: center;
`
const FlexColumn = styled.div`
  /* display: flex; */
  flex-direction: column;
`
const ItemEx = styled.div`
  margin: 0px;
  padding: 0 2.5vw;
  padding-top: 5vh;
  width: 50vw;
  /* height: calc(30vh / 3); */
  font-size: 20px;
  text-align: left;
  overflow-wrap: break-word;
`

const items = [
  '../assets/images/attack-1.png',
  '../assets/images/attack-2.png',
  '../assets/images/attack-3.png',
  '../assets/images/attack-sign-1.png',
  '../assets/images/attack-sign-2.png',
  '../assets/images/attack-sign-3.png',
  '../assets/images/endurance-1.png',
  '../assets/images/endurance-2.png',
]
const colloects = [
  '../assets/images/endurance-1.png',
  '../assets/images/endurance-2.png',
  '../assets/images/endurance-3.png',
  '../assets/images/attack-1.png',
  '../assets/images/attack-2.png',
  '../assets/images/attack-3.png',
  '../assets/images/attack-sign-2.png',
  '../assets/images/attack-sign-3.png',
]
const itemExplanation = [
  {
    icon: '../assets/images/attack-1.png',
    name: 'Name',
    detail: 'apoiargavfnakuhjeujnrfdxcf',
  },
]

function Inventory() {
  const [inventoryBtn, setInventoryBtn] = useState(true)
  const [visible, setVisible] = useState(true)

  return (
    <Container color={Color.Green}>
      {inventoryBtn ? (
        <>
          <Head>ITEM</Head>
          <SubBack color={Color.Green}>
            <SetContents>
              {items.map((item, i) => {
                return (
                  <Items
                    onClick={() => {
                      setVisible(false)
                    }}
                    key={i}
                  >
                    <img src={item} width="70px"></img>
                  </Items>
                )
              })}
            </SetContents>
          </SubBack>
        </>
      ) : (
        <>
          <Head>COLLECTION</Head>
          <SubBack color={Color.Green}>
            <SetContents>
              {colloects.map((item, i) => {
                return (
                  <Items onClick={() => setVisible(false)} key={i}>
                    <img src={item} width="70px"></img>
                  </Items>
                )
              })}
            </SetContents>
          </SubBack>
        </>
      )}
      {!visible && (
        <ItemExWin>
          {itemExplanation.map((item, i) => {
            return (
              <ItemDetails
                onClick={() => {
                  setInventoryBtn(false)
                }}
                key={i}
              >
                <ItemExIcon>
                  <img src={item.icon} width="70"></img>
                </ItemExIcon>
                <FlexColumn>
                  <ItemEx>{item.name}</ItemEx>
                  <ItemEx>{item.detail}</ItemEx>
                </FlexColumn>
              </ItemDetails>
            )
          })}
          <CloseBtn onClick={() => setVisible(true)}>close</CloseBtn>
        </ItemExWin>
      )}
      <HomeBtn />
      <Foot>
        <ItemBox
          onClick={() => {
            setInventoryBtn(true)
            setVisible(true)
          }}
          isAction={inventoryBtn}
        >
          <BsBoxSeam color="black" size="30" />
          <Text>アイテム</Text>
        </ItemBox>
        <CollectBox
          onClick={() => {
            setInventoryBtn(false)
            setVisible(true)
          }}
          isAction={inventoryBtn}
        >
          <BiLibrary color="black" size="30" />
          <Text>コレクション</Text>
        </CollectBox>
      </Foot>
    </Container>
  )
}

export default Inventory
