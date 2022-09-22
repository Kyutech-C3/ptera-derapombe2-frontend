import { gql } from '@apollo/client'

export default gql`
  query MapPageInfo {
    mapInfo {
      signs {
        id
        imagePath
        group
        maxHitPoint
        hitPoint
        linkNum
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
        baseSigns {
          id
          type
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
