import React, { useState, useEffect } from 'react'
import Flex from './StyledComponents/Flex'
import Title from './StyledComponents/Title'
import Input from './StyledComponents/Input'
import Button from './StyledComponents/Button'
import { Link, Redirect } from 'react-router-dom'
import Icon from './StyledComponents/Icon'
import LOCK_ICON from '../assets/icons/padlock.svg'
import TextContent from './StyledComponents/TextContent.jsx'

export default function SignUp() {
	const DEFAULT_BORDER_COLOR = 'rgb(48, 48, 48)'
	const ERROR_BORDER_COLOR = 'red'
	const VALID_BORDER_COLOR = 'green'

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const [emailBorderColor, setEmailBorderColor] = useState(DEFAULT_BORDER_COLOR)
	const [passwordBorderColor, setPasswordBorderColor] =
		useState(DEFAULT_BORDER_COLOR)
	const [firstNameBorderColor, setFirstNameBorderColor] =
		useState(DEFAULT_BORDER_COLOR)
	const [lastNameBorderColor, setLastNameBorderColor] =
		useState(DEFAULT_BORDER_COLOR)

	const [formValid, setFormValid] = useState(false)
	const [registered, setRegistered] = useState(false)
	const [signedIn, setSignedIn] = useState(false)

	useEffect(() => {
		if (
			emailBorderColor !== VALID_BORDER_COLOR ||
			passwordBorderColor !== VALID_BORDER_COLOR ||
			firstNameBorderColor !== VALID_BORDER_COLOR ||
			lastNameBorderColor !== VALID_BORDER_COLOR
		) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [
		emailBorderColor,
		passwordBorderColor,
		firstNameBorderColor,
		lastNameBorderColor,
	])

	const emailHandler = e => {
		const re = /^\S{3,}@\S{2,}\.\D{2,}/

		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailBorderColor(ERROR_BORDER_COLOR)
			setEmail('')
		} else {
			setEmailBorderColor(VALID_BORDER_COLOR)
			setEmail(e.target.value)
		}
	}

	const passwordHandler = e => {
		const re = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/
		if (!re.test(String(e.target.value))) {
			setPasswordBorderColor(ERROR_BORDER_COLOR)
			setPassword('')
		} else {
			setPasswordBorderColor(VALID_BORDER_COLOR)
			setPassword(e.target.value)
		}
	}

	const firstNameHandler = e => {
		const re = /^.{3,}$/

		if (!re.test(String(e.target.value))) {
			setFirstNameBorderColor(ERROR_BORDER_COLOR)
			setFirstName('')
		} else {
			setFirstNameBorderColor(VALID_BORDER_COLOR)
			setFirstName(e.target.value)
		}
	}

	const lastNameHandler = e => {
		const re = /^.{3,}$/

		if (!re.test(String(e.target.value))) {
			setLastNameBorderColor(ERROR_BORDER_COLOR)
			setLastName('')
		} else {
			setLastNameBorderColor(VALID_BORDER_COLOR)
			setLastName(e.target.value)
		}
	}

	const signUpButtonHandler = () => {
		localStorage.setItem('firstName', firstName)
		localStorage.setItem('lastName', lastName)
		localStorage.setItem('email', email)
		localStorage.setItem('password', password)
	}

	const authorized = JSON.parse(localStorage.getItem('signedIn'))

	if (authorized) {
		return <Redirect to="/Cursor-React--StyledComponents/home" />
	}

	if (registered && signedIn) {
		localStorage.setItem('registered', registered)
		localStorage.setItem('signedIn', signedIn)
		return <Redirect to="/Cursor-React--StyledComponents/home" />
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
			<Title>Sign up</Title>

			<Flex margin="14px" justify="space-between">
				<Input
					width="49%"
					onChange={e => firstNameHandler(e)}
					type="text"
					placeholder="First Name *"
					borderColor={firstNameBorderColor}
				/>
				<Input
					width="47%"
					onChange={e => lastNameHandler(e)}
					type="text"
					placeholder="Last Name *"
					borderColor={lastNameBorderColor}
				/>
			</Flex>

			<Flex justify="space-around" direction="column">
				<Input
					onChange={e => emailHandler(e)}
					borderColor={emailBorderColor}
					name="email"
					type="text"
					placeholder="Email Address *"
					width="100%"
				/>

				<Input
					onChange={e => passwordHandler(e)}
					name="password"
					margin="14px 0 14px"
					type="password"
					placeholder="Password *"
					borderColor={passwordBorderColor}
					width="100%"
				/>
			</Flex>

			<Flex justify="flex-start" margin=" 0px  0px 15px">
				<Input width="15px" background="black" type="checkbox" />
				<TextContent
					fSize=".8em"
					width="75%"
					margin="0 0 0 10px"
					color="rgb(215,	215,	215	)"
				>
					I want to receive inspiration, marketing promotion and updates via
					email.
				</TextContent>
			</Flex>

			<Button
				disabled={!formValid}
				width="100%"
				type={'submit'}
				onClick={() => {
					signUpButtonHandler()
					setRegistered(true)
					setSignedIn(true)
				}}
			>
				Sign up
			</Button>
			<Flex justify="flex-end" margin="15px 0px">
				<Link
					to="/Cursor-React--StyledComponents/sign-in"
					style={{ textDecoration: 'none' }}
				>
					<TextContent color="rgb(125,	175, 216	)" fSize=".8em">
						Already have an account? Sign in
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