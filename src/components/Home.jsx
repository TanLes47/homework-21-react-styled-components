import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Button from './StyledComponents/Button'

const StyledHomePageWrapper = styled.div`
	@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap');
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 100vh;
	font-family: 'DM Serif Text', serif;
	font-size: 5rem;
	color: rgb(252, 245, 244);
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`

function Home() {
	const userFirstName = localStorage.getItem('firstName')
	const signedInValue = JSON.parse(localStorage.getItem('signedIn'))
	const registered = JSON.parse(localStorage.getItem('registered'))
	const [signedIn, setSignedIn] = useState(signedInValue)

	if (registered && signedIn) {
		return (
			<StyledHomePageWrapper>
				Welcome, {userFirstName}!
				<Button onClick={() => setSignedIn(false)} width={'100px'}>
					Log out
				</Button>
			</StyledHomePageWrapper>
		)
	} else if (!signedIn) {
		localStorage.setItem('signedIn', false)
		return <Redirect to="/Cursor-React--StyledComponents/sign-in" />
	}
}

export default Home