import { signInWithPopup, UserCredential } from 'firebase/auth'
import { useState } from 'react'
import { auth, provider } from '../firebase'

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
    <>
      {user ? <></> : <button onClick={handleLogin}>Google Login</button>}
      <ul>
        <li>displayName: {user?.user.displayName}</li>
        <li>uid: {user?.user.uid}</li>
      </ul>
    </>
  )
}

export default Login
