import { gql } from '@apollo/client'

export default gql`
  mutation registSign(
    $baseSignTypes: [Int!]!
    $imagePath: String!
    $coordinate: CoordinateInput!
  ) {
    registSign(
      registSignInput: {
        baseSignTypes: $baseSignTypes
        coordinate: $coordinate
        imagePath: $imagePath
      }
    ) {
      coordinate {
        latitude
        longitude
      }
      id
      baseSigns {
        id
        name
        type
      }
    }
  }
`
