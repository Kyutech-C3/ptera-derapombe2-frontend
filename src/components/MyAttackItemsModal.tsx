import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { ItemEffect, useMyItemsQuery } from '../graphql/generated'

const Container = styled.div`
  width: 80vw;
  height: fit-content;
  position: absolute;
  inset: 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  color: black;
  background: white;
  border: 1px solid;
  border-radius: 20px;
  padding: 20px 10px;
`

const AttackItemContent = styled.div`
  width: 33.3333%;
  text-align: center;
  margin-bottom: 10px;
  font-size: 12px;
`

const AttackItem = styled.div<{ imagePath: string }>`
  margin: auto;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-size: cover;
`

const CloseButton = styled.button`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`

type MyAttackItemsModal = {
  doAttack: (itemId: string) => void
  closeModal: () => void
}

function MyAttackItemsModal(props: MyAttackItemsModal) {
  const { doAttack, closeModal } = props
  const [cookies] = useCookies<
    'accessToken',
    {
      accessToken?: string
    }
  >(['accessToken'])
  const myItems = useMyItemsQuery({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
  })

  return (
    <Container>
      {myItems.data?.items.map((item, i) => {
        return item.effect === ItemEffect.Attack ? (
          <AttackItemContent key={i}>
            <AttackItem
              imagePath={`/images/attack-sign-${item.level}.png`}
              onClick={() => {
                doAttack(item.id)
                void myItems.refetch()
              }}
            />
            <span>
              {item.name} -{item.value}
            </span>
          </AttackItemContent>
        ) : (
          <div key={i} />
        )
      })}
      <CloseButton onClick={closeModal}>閉じる</CloseButton>
    </Container>
  )
}

export default MyAttackItemsModal
