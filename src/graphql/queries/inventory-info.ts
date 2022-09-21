import { gql } from '@apollo/client'

export default gql`
  query InventoryInfo {
    items {
      effect
      id
      level
      name
      value
    }
    galleries {
      baseSignType
    }
  }
`
