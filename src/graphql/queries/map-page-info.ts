import { gql } from '@apollo/client'

export default gql`
  query MapPageInfo {
    mapInfo {
      signs {
        id
        imagePath
        baseSignTypes
        group
        maxHitPoint
        hitPoint
        items {
          effect
          id
          level
          name
          value
        }
        coordinate {
          latitude
          longitude
        }
      }
      polygons {
        group
        coordinates {
          latitude
          longitude
        }
      }
      links {
        group
        otherCoordinate {
          latitude
          longitude
        }
        oneCoordinate {
          latitude
          longitude
        }
      }
    }
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
    requiredExp
  }
`
