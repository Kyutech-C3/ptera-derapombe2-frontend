import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ExhumeSignMutation, ItemEffect } from '../graphql/generated'

const ExhumeNotifyContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  background-color: rgba(170, 170, 170, 0.7);
  padding: 20px;
  border-radius: 10px;
  color: black;
`

const ExhumeNotifyExpText = styled.span`
  color: red;
`

const ExhumeNotifySign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
`

type ExhumeNotify = {
  data: ExhumeSignMutation
}

const signNames = ['attack-sign', 'endurance', 'heal', 'attack']

function ExhumeNotify(props: ExhumeNotify) {
  const { data } = props
  const [signsCount, setSignsCount] = useState(Array(12).fill(0))

  useEffect(() => {
    const signsCountArray = Array(12).fill(0)
    data.exhumeSign.items.map((item) => {
      switch (item.effect) {
        case ItemEffect.Attack: {
          signsCountArray[0 + item.level - 1] += 1
          break
        }
        case ItemEffect.Endurance: {
          signsCountArray[3 + item.level - 1] += 1
          break
        }
        case ItemEffect.Heal: {
          signsCountArray[6 + item.level - 1] += 1
          break
        }
        case ItemEffect.Resistance: {
          signsCountArray[9 + item.level - 1] += 1
          break
        }
      }
    })
    setSignsCount(signsCountArray)
  }, [])

  return (
    <ExhumeNotifyContainer>
      <ExhumeNotifyExpText>EXP +{data.exhumeSign.expPoint}</ExhumeNotifyExpText>
      {signsCount.map((signCount, i) => {
        return signCount !== 0 ? (
          <ExhumeNotifySign key={`sign-${i}`}>
            <img
              src={`/images/${signNames[Math.floor(i / 3)]}-${
                ((i + 3) % 3) + 1
              }.png`}
              alt="sign-image"
              width={30}
            />
            <span>x{signCount}</span>
          </ExhumeNotifySign>
        ) : (
          <div key={`sign-${i}`}></div>
        )
      })}
    </ExhumeNotifyContainer>
  )
}

export default ExhumeNotify
