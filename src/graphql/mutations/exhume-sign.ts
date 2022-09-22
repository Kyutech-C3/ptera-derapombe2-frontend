import { gql } from '@apollo/client'

export default gql`
  mutation exhumeSign($signId: String!) {
    exhumeSign(signId: $signId) {
      items {
        effect
        id
        level
      }
      expPoint
    }
  }
`
