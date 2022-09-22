import { gql } from '@apollo/client'

export default gql`
  mutation CaptureSign($signId: String!) {
    captureSign(signId: $signId) {
      id
    }
  }
`
