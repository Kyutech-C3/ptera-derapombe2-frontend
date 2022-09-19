import { gql } from '@apollo/client'

export default gql`
  mutation userAdd($params: AddUserInput!) {
    userAdd(userInput: $params) {
      id
      name
      level
      group
    }
  }
`
