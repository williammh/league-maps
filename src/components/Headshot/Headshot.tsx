import React from 'react';;

export const Headshot = (props: {personId: string, size?: number}): JSX.Element => {
	const { personId, size = 30 } = props;
	
	const rootStyles: React.CSSProperties = {
		display: 'inline-block',
		width: `${size}px`,
		height: `${size}px`,
	}

  const headshotContainerStyles: React.CSSProperties = {
    width: '100%',
		height: '100%',
		margin: 'auto',
		overflow: 'hidden',
		borderRadius: `${size / 2}px`,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
  }

  const headshotStyles: React.CSSProperties = {
    height: '100%',
		minWidth: '100%',
		backgroundColor: 'lightgray',
  }

	return (
		<div style={rootStyles}>
			<div style={headshotContainerStyles}>
				<img
					src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`}
					style={headshotStyles}
					alt={`headshot${personId}`}
				/>
			</div>
		</div>
	)
}