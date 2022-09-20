import { gql } from '@apollo/client'

export default gql`
  mutation addUser($name: String!, $group: Color!) {
    addUser(name: $name, group: $group) {
      id
      name
      level
      group
    }
  }
`
