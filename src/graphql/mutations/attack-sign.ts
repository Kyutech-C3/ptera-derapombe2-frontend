import { gql } from '@apollo/client'

export default gql`
  mutation attackSign($itemId: String!, $signId: String!) {
    attackSign(itemId: $itemId, signId: $signId) {
      expPoint
      hitPointDiff
    }
  }
`
