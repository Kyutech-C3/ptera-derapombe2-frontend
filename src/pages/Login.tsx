import { signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { FcGoogle } from 'react-icons/fc'
import { useUserInfoQuery } from '../graphql/generated'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../assets/images/bg-login.png');
  background-position: center;
  background-size: cover;
  background-color: #eaffe7;
`

const Icon = styled.img`
  width: 100vw;
  margin-top: 10vh;
  margin-bottom: 20vh;
`

const LoginButton = styled.button`
  display: flex;
  align-items: center;
`

const Text = styled.span`
  margin-left: 5px;
`

function Login() {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies<
    'accessToken',
    {
      accessToken?: string
    }
  >(['accessToken'])
  const result = useUserInfoQuery({
    context: {
      headers: {
        Authorization: `Bearer ${cookies.accessToken ?? ''}`,
      },
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken()
        setCookie('accessToken', token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (cookies.accessToken !== undefined) {
      if (result.data === undefined) {
        navigate('/team-select')
      } else {
        navigate('/map')
      }
    }
  }, [cookies.accessToken, result])

  return (
    <Container>
      <Icon src="../assets/images/icon-login.png" alt="icon-login" />
      <LoginButton onClick={handleLogin}>
        <FcGoogle size="25" />
        <Text>Googleでログイン</Text>
      </LoginButton>
      {/* <ul>
        <li>displayName: {user?.user.displayName}</li>
        <li>uid: {user?.user.uid}</li>
      </ul> */}
    </Container>
  )
}

export default Login
