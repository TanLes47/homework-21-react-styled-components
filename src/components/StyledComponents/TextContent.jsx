import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled.span`
	color: ${({ color }) => color || 'white'};
	text-decoration: ${({ decoration }) => decoration || 'none'};
	font-size: ${({ fSize }) => fSize || '1em'};
	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || '100%'};
	margin: ${({ margin }) => margin || '0'};
	text-align: ${({ textAlign }) => textAlign || 'start'};
	cursor: ${({ cursor }) => cursor || ''};
	display: ${({ display }) => display || 'inline'};
`

export default function TextContent(props) {
	return <StyledSpan {...props} />
}