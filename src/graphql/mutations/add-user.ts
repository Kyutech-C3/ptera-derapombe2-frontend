import { gql } from '@apollo/client'

export default gql`
  mutation addUser($name: String!, $group: Color!, $avatarUrl: String!) {
    addUser(name: $name, group: $group, avatarUrl: $avatarUrl) {
      id
      name
      level
      group
      avatarUrl
    }
  }
`
