import { gql } from '@apollo/client'

export default gql`
  query MapPageInfo {
    user {
      name
      level
      expPoint
      group
      avatarUrl
    }
    powerRatio {
      green
      red
    }
  }
`
