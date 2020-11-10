import React, {
	FocusEvent,
	useState,
	useContext,
	ChangeEvent,
	MouseEvent,
	KeyboardEvent,
	useEffect,
	useRef
} from 'react';
import { playerListContext } from '../../Contexts/PlayerListContext'
import { List, ListItem, ListItemText, Popover, TextField, Card } from '@material-ui/core'
import { IPlayer, IPlayerSearchResult } from '../../Types/playerTypes';
import {
	useTextFieldStyles,
	useSearchResultContainerStyles,
	useListStyles
} from './PlayerSelectV2.styles';
import { SignalCellularNull } from '@material-ui/icons';
import LazyLoad from 'react-lazy-load';
import { maxTeamSize } from '../../Util'

export interface IPlayerSelectV2Props {
	teamId?: number;
	roster?: Array<IPlayer>;
	addPlayer: (personId: string, playerList: Array<IPlayerSearchResult>) => Promise<void>;
}

export const PlayerSelect = (props: IPlayerSelectV2Props): JSX.Element => {
	const { teamId, roster, addPlayer } = props;
	const playerList = useContext(playerListContext);

	const [ searchString, setSearchString ] = useState('');
	const [ isFocused, setHasFocus ] = useState(false);
	const [ searchResults, setSearchResults ] = useState(playerList)
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	const idsInTeam: Array<string> | undefined = roster?.map(player => player.personId);

	const myRef = useRef(null)

	useEffect(() => {
		setSearchResults(playerList.filter(player => {
			return isMatchingSearchString(player.firstName, player.lastName)
		}));
		setSelectedIndex(0);
	}, [searchString])

	useEffect(() => {
		setSelectedIndex(0);
	}, [isFocused])

	const handleChange = (event: ChangeEvent<{value: string}>) => {
		const { value } = event.target;
		value.length > 0 && setHasFocus(true);
		setSearchString(value);
	}

	const handleClick = (event: MouseEvent<HTMLElement>): void => {
		const { personId } = event.currentTarget.dataset
		addPlayer(personId!, playerList);
		setSearchString('');
	}

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		setHasFocus(true)
	}

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		setTimeout(() => setHasFocus(false), 100);
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		const { key } = event
		if (key === 'Enter') {
			const { personId } = searchResults[selectedIndex];
			if (!idsInTeam?.includes(personId)) {
				addPlayer(personId, playerList);
				setSearchString('');
				setHasFocus(false);
			}
		} else if (key === 'ArrowDown') {
			if (!isFocused) {
				setHasFocus(true);
			} else {
				setSelectedIndex(selectedIndex < searchResults.length - 1 ? selectedIndex + 1 : searchResults.length - 1);
			}
		} else if (key === 'ArrowUp') {
			setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0);
		}
	}

	const isMatchingSearchString = (firstName: string, lastName: string): boolean => {
		const searchStringLower = searchString.toLowerCase()
		return (
			firstName.toLowerCase().startsWith(searchStringLower) ||
			lastName.toLowerCase().startsWith(searchStringLower) ||
			`${firstName.toLowerCase()} ${lastName.toLowerCase()}`.startsWith(searchStringLower)
		)
	}

	const textFieldClasses = useTextFieldStyles();
	const searchResultContainerClasses = useSearchResultContainerStyles();
	const listClasses = useListStyles(isFocused);

	return (
		<div>
			<TextField
				type="search"
				variant="outlined"
				label="Draft Player"
				value={searchString}
				classes={textFieldClasses}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
			/>
			<Card classes={searchResultContainerClasses}>
				<List
					classes={listClasses}
					disablePadding={true}
					className='resultsList'
					ref={myRef}
				>
					{searchResults.map((player, i) => {
						return (
							<LazyLoad height={40} offsetTop={40 * i}>
								<ListItem
									onClick={handleClick}
									button
									data-person-id={player.personId}
									data-first-name={player.firstName}
									data-last-name={player.lastName}
									selected={selectedIndex === i && !idsInTeam?.includes(player.personId)}
									disabled={idsInTeam?.includes(player.personId) || roster!.length >= maxTeamSize}
									key={`select-${teamId}-${player.personId}`}
								>
									{player.firstName} {player.lastName}
								</ListItem>
							</LazyLoad>
						)
					})}
				</List>
			</Card>
		</div>
	)
}