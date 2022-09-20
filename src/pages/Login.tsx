import { signInWithPopup, UserCredential } from 'firebase/auth'
import { useState } from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { FcGoogle } from 'react-icons/fc'

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
  const [user, setUser] = useState<UserCredential | null>(null)
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        setUser(userCredential)
        console.log(userCredential)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
