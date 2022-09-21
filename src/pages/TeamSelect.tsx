import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Color, useAddUserMutation } from '../graphql/generated'
import { avatarUrl, displayName } from '../variables'

const Container = styled.div<{ imagePath: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-position: center;
  background-size: cover;
`

const LogoMark = styled.img`
  width: 70vw;
  margin: 5vh 0;
`

const Text = styled.p`
  color: black;
  text-align: center;
`

const TeamSelectAnnounceText = styled(Text)`
  font-weight: 700;
`

const TeamSelectButtonContainer = styled.div`
  display: flex;
  margin-top: 5vh;
  margin-bottom: 10vh;
`

const TeamSelectButtonContent = styled.div`
  margin: 0 15px;
`

const TeamSelectButton = styled.div<{
  color: Color
  selectedTeam: Color | null
}>`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.color === Color.Red ? '#FFA9A9' : '#B4FFA9'};
  box-shadow: ${(props) =>
    props.selectedTeam !== props.color
      ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
      : ''};
  ${(props) =>
    props.selectedTeam === props.color &&
    `
    transform: translate(0, 2px);
    border: 1px solid blue;`};
`

const DecisionButton = styled.button<{
  selectedTeam: Color | null
}>`
  ${(props) =>
    props.selectedTeam === null &&
    `
    pointer-events: none;
    opacity: 0.5;`}
`

function TeamSelect() {
  const navigate = useNavigate()
  const [selectedTeam, setSelectedTeam] = useState<Color | null>(null)
  const [cookies] = useCookies<
    'accessToken',
    {
      accessToken?: string
    }
  >(['accessToken'])
  const [addUser] = useAddUserMutation()
  const onClickDecisionButton = () => {
    const name = displayName()
    const url = avatarUrl()

    if (selectedTeam !== null) {
      addUser({
        variables: {
          name: name,
          group: selectedTeam,
          avatarUrl: url,
        },
        context: {
          headers: {
            Authorization: `Bearer ${cookies.accessToken ?? ''}`,
          },
        },
        onError: (error) => {
          console.error(error)
        },
      })
        .then(() => {
          navigate('/map')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <Container imagePath="/images/bg-login.png">
      <LogoMark src="/images/logo-mark.png" alt="logo-mark" />
      <TeamSelectAnnounceText>
        所属するチームを選んでください
      </TeamSelectAnnounceText>
      <TeamSelectButtonContainer>
        <TeamSelectButtonContent>
          <Text>緑のたぬき</Text>
          <TeamSelectButton
            color={Color.Green}
            selectedTeam={selectedTeam}
            onClick={() => setSelectedTeam(Color.Green)}
          >
            <img src="/images/pin-green.png" alt="pin-green" width="100%" />
          </TeamSelectButton>
        </TeamSelectButtonContent>
        <TeamSelectButtonContent>
          <Text>赤いきつね</Text>
          <TeamSelectButton
            color={Color.Red}
            selectedTeam={selectedTeam}
            onClick={() => setSelectedTeam(Color.Red)}
          >
            <img src="/images/pin-red.png" alt="pin-red" width="100%" />
          </TeamSelectButton>
        </TeamSelectButtonContent>
      </TeamSelectButtonContainer>
      <DecisionButton
        selectedTeam={selectedTeam}
        onClick={onClickDecisionButton}
      >
        決定
      </DecisionButton>
    </Container>
  )
}

export default TeamSelect
