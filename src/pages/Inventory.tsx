import { useState } from 'react'
import {
  BaseSign,
  Color,
  Gallery,
  Item,
  useInventoryInfoQuery,
  useMapPageInfoQuery,
} from '../graphql/generated'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { BsBoxSeam } from 'react-icons/bs'
import { BiLibrary } from 'react-icons/bi'
import HomeBtn from '../components/HomeBtn'
// import { key } from 'localforage'

const Container = styled.div<{
  color: Color
  redImagePath: string
  greenImagePath: string
}>`
  background-image: ${(props) => `url(
    ${props.color == Color.Red ? props.redImagePath : props.greenImagePath})`};
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
  display: inline-block;
  margin: 0;
  padding: 0;
  transform: translateX(-6px);
  width: 10vw;
  height: 30vh;
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  border-radius: 0 10px 10px 0;
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
    props.color == Color.Red ? '#ffe7e7' : '#eaffe7'};
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
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 70px;
  background-color: transparent;
  align-items: center;
  text-align: center;
`
const ItemsCount = styled.div`
  position: absolute;
  margin: 0;
  padding: 3px;
  transform: translate(72px, 42px);
  width: 25px;
  height: 25px;
  color: black;
  box-shadow: 2px 2px 2px #8a939c;
  background-color: rgb(220, 220, 220);
  border-radius: 100%;
  text-align: center;
`

/*** アイテムの詳細表示関連 ***/
const ItemExWin = styled.div`
  position: absolute;
  display: flex;
  margin: 0;
  bottom: 11vh;
  width: 100vw;
  height: 30vh;
  /* font-size: 0; */
  letter-spacing: 0;
  color: black;
  box-shadow: -5px 5px 5px #8a939c;
  border-radius: 0 10px 10px 0;
  background-color: rgb(220, 220, 220);
`
const ItemDetails = styled.div`
  display: flex;
  background-color: transparent;
  width: 70vw;
`
const ItemExIcon = styled.div`
  padding: 10vh 5px;
  /* padding-left: 1vw; */
  width: 25vw;
  text-align: center;
`
const FlexColumn = styled.div`
  /* display: flex; */
  flex-direction: column;
`
const ItemExName = styled.div`
  margin: 0px;
  padding: 0 2.5vw;
  padding-top: 5vh;
  width: 50vw;
  /* height: calc(30vh / 3); */
  font-size: 20px;
  text-align: left;
  overflow-wrap: break-word;
`
const ItemExDetail = styled.div`
  margin: 0px;
  padding: 0 2.5vw;
  padding-top: 5vh;
  width: 50vw;
  /* height: calc(30vh / 3); */
  font-size: 16px;
  text-align: left;
  overflow-wrap: break-word;
`

function Inventory() {
  const [inventoryBtn, setInventoryBtn] = useState(true)
  const [visible, setVisible] = useState(true)
  const [itemIcon, setItemIcon] = useState<string>('')
  const [itemName, setItemName] = useState('')
  const [itemDetail, setItemDetail] = useState('')

  const [cookies] = useCookies<
    'accessToken',
    {
      accessToken?: string
    }
  >(['accessToken'])
  console.log(cookies)
  const inventoryInfo = useInventoryInfoQuery({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
    onError: (error) => {
      console.error(error)
    },
  })

  console.log('before grouped', inventoryInfo.data?.items)

  /*** アイテムの画像配列 ***/
  /* アイテム固有の値を格納 */
  const groupedItems: { [itemId: string]: Item[] } = {}
  inventoryInfo.data?.items.forEach((item) => {
    if (typeof groupedItems[item.id] === 'undefined') {
      groupedItems[item.id] = []
    }
    groupedItems[item.id].push(item)
    // if (typeof groupedItems[`${item.id}-${item.level}`] === 'undefined') {
    //   groupedItems[`${item.id}-${item.level}`] = []
    // }
    // groupedItems[`${item.id}-${item.level}`].push(item)
  })
  console.log('grouped', JSON.stringify(groupedItems, null, '\t'))
  // Object.values()
  // Object.keys()
  /* 各アイテムごとにグループ分け */
  const itemImages: { [itemId: string]: string } = {}
  Object.keys(groupedItems).forEach((itemId) => {
    itemImages[itemId] = `/images/${groupedItems[
      itemId
    ][0]?.effect.toLowerCase()}-${groupedItems[itemId][0]?.level}.png`
    // itemImages.push({
    //   url: `/images/${groupedItems[itemId][0]?.effect.toLowerCase()}-${
    //     groupedItems[itemId][0]?.level
    //   }.png`,
    // })
  })

  /*** コレクション ***/
  let getGallery: Gallery[] = []
  if (inventoryInfo.data?.galleries) {
    getGallery = inventoryInfo.data?.galleries
  }
  const collectionImages: string[] = []
  getGallery.map((gallery) => {
    String(gallery.baseSign).length != 1
      ? gallery.toString()
      : `0${gallery.toString()}`
    collectionImages.push(`/static/${gallery}rds_0${gallery}_r.png`)
  })
  // inventoryInfo.data?.galleries.forEach((number) => {
  // const groupedCollections: { [collectionId: string]: any } = {}
  // Object.keys(collectionImages.baseSignType).forEach((collectionId) => {
  //   groupedCollections[collectionId] = collectionImages[collectionId][0]
  // })

  /*** グループカラー(赤/緑) ***/
  const groupColor = useMapPageInfoQuery().data?.user.group
  console.log(groupColor)

  return (
    <Container
      color={groupColor}
      redImagePath="/images/bg-red.png"
      greenImagePath="/images/bg-green.png"
    >
      {inventoryBtn ? (
        <>
          <Head>アイテム</Head>
          <SubBack color={groupColor}>
            <SetContents>
              {Object.values(groupedItems).map((items: Item[], i) => {
                return (
                  <Items
                    onClick={() => {
                      setVisible(false)
                      setItemIcon(itemImages[items[0].id])
                      setItemName(items[0].name)
                      setItemDetail(items[0].effect)
                    }}
                    key={i}
                  >
                    <ItemsCount>{items.length}</ItemsCount>
                    <img src={itemImages[items[0].id]} width="70px"></img>
                  </Items>
                )
              })}
            </SetContents>
          </SubBack>
        </>
      ) : (
        <>
          <Head>コレクション</Head>
          <SubBack color={groupColor}>
            <SetContents>
              {getGallery.map((collection, i) => {
                return (
                  <Items
                    onClick={() => {
                      setVisible(false)
                      setItemIcon(collectionImages[i])
                      // setItemName(collection.)
                      // setItemDetail(collection.detail)
                    }}
                    key={i}
                  >
                    <ItemsCount>{collectionImages[i].length}</ItemsCount>
                    <img src={collectionImages[i]} width="70px"></img>
                  </Items>
                )
              })}
            </SetContents>
          </SubBack>
        </>
      )}
      {!visible && (
        <ItemExWin>
          <ItemDetails
            onClick={() => {
              setInventoryBtn(false)
            }}
            // key={i}
          >
            <ItemExIcon>
              <img src={itemIcon} width="70"></img>
            </ItemExIcon>
            <FlexColumn>
              <ItemExName>{itemName}</ItemExName>
              <ItemExDetail>{itemDetail}</ItemExDetail>
            </FlexColumn>
          </ItemDetails>
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
