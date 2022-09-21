import { gql } from '@apollo/client'

export default gql`
  mutation predictImage($file: String!) {
    predictImage(file: $file) {
      scores {
        score
        signType
        signName
      }
      status
    }
  }
`
