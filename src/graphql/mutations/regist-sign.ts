import { gql } from '@apollo/client'

export default gql`
  mutation registSign(
    $baseSignTypes: [Int!]!
    $longitude: Float!
    $latitude: Float!
    $imagePath: String!
  ) {
    registSign(
      registSignInput: {
        baseSignTypes: $baseSignTypes
        longitude: $longitude
        latitude: $latitude
        imagePath: $imagePath
      }
    ) {
      coordinate {
        latitude
        longitude
      }
      id
      baseSignTypes
    }
  }
`
