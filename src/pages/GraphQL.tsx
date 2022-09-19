import { gql, useQuery } from '@apollo/client'

const TEST_QUERY = gql`
  {
    me {
      id
      level
      group
    }
  }
`

function GraphQL() {
  const data = useQuery(TEST_QUERY)
  console.log(data)

  return <p>see console</p>
}

export default GraphQL
