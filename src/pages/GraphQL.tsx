import { Color, useMeQuery, useUserAddMutation } from '../graphql/generated'

function GraphQL() {
  const data = useMeQuery()
  console.log(data)
  const [userAdd] = useUserAddMutation()

  return (
    <>
      <p>see console</p>
      <button
        onClick={() => {
          void userAdd({
            variables: {
              params: {
                name: 'hogehoge',
                group: Color.Green,
                avatarNumber: 1,
              },
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
