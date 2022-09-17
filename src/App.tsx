import { useState } from 'react'
import reactLogo from './assets/react.svg'
import styled, { keyframes } from 'styled-components'

import { FaGithub } from 'react-icons/fa'
import { SiZenn } from 'react-icons/si'

const AppStyle = styled.div`
  width: 100vw;
  margin: 0 auto;
  text-align: center;
`

const LogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  animation: ${LogoSpin} infinite 0.1s linear;
`

const ReactLogo = styled(Logo)`
  &:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`

const Card = styled.div`
  padding: 2em;
`

const ReactTheDocs = styled.p`
  color: #888;
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppStyle>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo src="/vite.svg" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <ReactLogo src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <div>
        <FaGithub className="icon" size="2rem" />
        <SiZenn size="2rem" />
      </div>
      <ReactTheDocs>
        Click on the Vite and React logos to learn more
      </ReactTheDocs>
    </AppStyle>
  )
}

export default App
