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
      baseSign {
        id
        name
        type
      }
      sign {
        baseSigns {
          id
          name
          type
        }
        coordinate {
          latitude
          longitude
        }
        createdAt
        id
        imagePath
        maxHitPoint
        maxItemSlot
        maxLinkSlot
      }
    }
  }
`
