import styled from 'styled-components'
import { AttackSignMutation } from '../graphql/generated'

const AttackNotifyContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  background-color: rgba(170, 170, 170, 0.7);
  padding: 20px;
  border-radius: 10px;
  color: black;
`

const AttackNotifyExpText = styled.span`
  color: red;
`

type AttackNotify = {
  data: AttackSignMutation
}

function AttackNotify(props: AttackNotify) {
  const { data } = props

  return (
    <AttackNotifyContainer>
      <AttackNotifyExpText>EXP +{data.attackSign.expPoint}</AttackNotifyExpText>
      <p>与ダメージ {data.attackSign.hitPointDiff}</p>
    </AttackNotifyContainer>
  )
}

export default AttackNotify
