import { gql } from '@apollo/client'

export default gql`
  query MyItems {
    items {
      id
      effect
      level
      name
      value
    }
  }
`
