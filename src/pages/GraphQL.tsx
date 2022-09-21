import {
  Color,
  useAddUserMutation,
  useUserInfoQuery,
} from '../graphql/generated'

function GraphQL() {
  const userInfo = useUserInfoQuery
  console.log(userInfo)
  const [addUser] = useAddUserMutation()

  return (
    <>
      <p>see console</p>
      <button
        onClick={() => {
          void addUser({
            variables: {
              name: 'hogehoge',
              group: Color.Green,
              avatarUrl: '',
            },
          })
            .then((value) => console.log(value))
            .catch((error) => {
              console.error(error)
            })
        }}
      >
        userAdd
      </button>
    </>
  )
}

export default GraphQL
