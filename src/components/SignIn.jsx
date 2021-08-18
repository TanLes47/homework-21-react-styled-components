import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Flex from './StyledComponents/Flex'
import Title from './StyledComponents/Title'
import Input from './StyledComponents/Input'
import Button from './StyledComponents/Button'
import Icon from './StyledComponents/Icon'
import LOCK_ICON from '../assets/icons/padlock.svg'
import TextContent from './StyledComponents/TextContent.jsx'

export default function SignIn() {
	const DEFAULT_BORDER_COLOR = 'rgb(48, 48, 48)'
	const ERROR_BORDER_COLOR = 'red'
	const VALID_BORDER_COLOR = 'green'
	const [emailBorderColor, setEmailBorderColor] = useState(DEFAULT_BORDER_COLOR)
	const [passwordBorderColor, setPasswordBorderColor] =
		useState(DEFAULT_BORDER_COLOR)
	const [formValid, setFormValid] = useState(false)
	const [emailValid, setEmailValid] = useState(false)
	const [passwordValid, setPasswordValid] = useState(false)
	const [rememberUserCheckBox, setRememberUserCheckBox] = useState(false)
	const [signedIn, setSignedIn] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displaySignInError, setDisplaySignInError] = useState('none')

	const emailInputHandler = e => {
		setEmail(e.target.value)
		const re = /^\S{3,}@\S{2,}\.\D{2,}/

		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailBorderColor(ERROR_BORDER_COLOR)
		} else {
			setEmailBorderColor(VALID_BORDER_COLOR)
		}
	}

	const passwordInputHandler = e => {
		setPassword(e.target.value)
		const re = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/
		if (!re.test(String(e.target.value))) {
			setPasswordBorderColor(ERROR_BORDER_COLOR)
		} else {
			setPasswordBorderColor(VALID_BORDER_COLOR)
		}
	}

	useEffect(() => {
		const userEmail = localStorage.getItem('email')

		if (email !== userEmail) {
			setEmailValid(false)
		} else {
			setEmailValid(true)
		}

		const userPassword = localStorage.getItem('password')
		if (password !== userPassword) {
			setPasswordValid(false)
		} else {
			setPasswordValid(true)
		}
	}, [email, password])

	useEffect(() => {
		if (emailValid && passwordValid) {
			setFormValid(true)
			console.log('from =', formValid)
		} else {
			setFormValid(false)
			console.log('from =', formValid)
		}
	}, [emailValid, passwordValid, formValid])

	const signUpLinkHandler = () => {
		localStorage.removeItem('firstName')
		localStorage.removeItem('lastName')
		localStorage.removeItem('email')
		localStorage.removeItem('password')
		localStorage.removeItem('registered')
		localStorage.removeItem('signedIn')
		localStorage.removeItem('remembered')
	}

	const rememberUserCheckBoxHandler = e => {
		setRememberUserCheckBox(e.target.checked)
	}

	useEffect(() => {
		const remembered = JSON.parse(localStorage.getItem('remembered'))

		if (remembered === true) {
			setRememberUserCheckBox(remembered)
			setEmail(localStorage.getItem('email'))
			setPassword(localStorage.getItem('password'))
		}
	}, [])

	const authorized = JSON.parse(localStorage.getItem('signedIn'))

	if (authorized) {
		return <Redirect to="/Cursor-React--StyledComponents/home" />
	}
	if (signedIn) {
		localStorage.setItem('signedIn', signedIn)
		return <Redirect to="/Cursor-React--StyledComponents/home" />
	}

	const signInButtonHandler = () => {
		if (formValid) {
			setSignedIn(true)

			localStorage.setItem('remembered', rememberUserCheckBox)
		} else {
			setDisplaySignInError('inline')
			setEmail('')
			setPassword('')
			setRememberUserCheckBox(false)
			setEmailBorderColor(DEFAULT_BORDER_COLOR)
			setPasswordBorderColor(DEFAULT_BORDER_COLOR)
		}
	}

	return (
		<Flex width="400px" align="center" margin="15%  auto" direction="column">
			<Icon
				padding="10px"
				background="rgb(244,	143,	177	)"
				radius="50%"
				width="13%"
				src={LOCK_ICON}
			/>
			<Title>Sign in</Title>
			<TextContent
				display={displaySignInError}
				margin="10px auto"
				textAlign="center"
				color="red"
				fSize="1.4em"
			>
				🧐 Incorrect email or password 🧐
			</TextContent>
			<Flex
				margin="14px"
				height="110px"
				justify="space-around"
				direction="column"
			>
				<Input
					onChange={e => emailInputHandler(e)}
					value={email}
					type="text"
					placeholder="Email Address *"
					borderColor={emailBorderColor}
					width="100%"
				/>
				<Input
					onChange={e => passwordInputHandler(e)}
					value={password}
					type="password"
					placeholder="Password *"
					borderColor={passwordBorderColor}
					width="100%"
				/>
			</Flex>

			<Flex justify="flex-start" align="center" margin="0 0 15px 0">
				<Input
					checked={rememberUserCheckBox}
					onChange={e => rememberUserCheckBoxHandler(e)}
					width="15px"
					type="checkbox"
				/>
				<TextContent
					color="rgb(215,	215,	215	)"
					width="75%"
					margin="0 0 0 10px"
					fSize=".8em"
				>
					Remember me
				</TextContent>
			</Flex>

			<Button
				// disabled={!formValid}
				onClick={() => {
					signInButtonHandler()
				}}
				width="100%"
			>
				Sign in
			</Button>

			<Flex justify="space-between" margin="10px 0 0 0">
				<TextContent
					color="rgb(125,	175, 216	)"
					fSize=".8em"
					width="50%"
					cursor="pointer"
				>
					Forgot password?
				</TextContent>
				<Link
					to="/Cursor-React--StyledComponents/sign-up"
					onClick={() => {
						signUpLinkHandler()
					}}
					style={{ textDecoration: 'none' }}
				>
					<TextContent color="rgb(125,	175, 216	)" fSize=".8em" width="50%">
						Don't have account? Sign Up
					</TextContent>
				</Link>
			</Flex>
			<TextContent
				color="rgb(126,	126,	126	)"
				fSize=".7em"
				textAlign="center"
				margin="20px auto"
			>
				Copyright © Your Website 2021.
			</TextContent>
		</Flex>
	)
}