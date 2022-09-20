import { gql } from '@apollo/client'

export default gql`
  query userInfo {
    user {
      id
      level
      group
    }
  }
`
