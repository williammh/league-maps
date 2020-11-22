import React, {
	FocusEvent,
	useState,
	ChangeEvent,
	MouseEvent,
	KeyboardEvent,
	useEffect,
	useRef
} from 'react';
import { List, ListItem, ListItemText, Popover, TextField, Card } from '@material-ui/core'
import { Player, IPlayerSearchResult } from '../../Types/types';
import { SignalCellularNull } from '@material-ui/icons';
import LazyLoad from 'react-lazy-load';
import { maxTeamSize } from '../../Util'

export interface IPlayerSelectProps {
	teamId?: number;
	roster?: Array<Player>;
	addPlayer: (personId: string, allPlayers: Array<IPlayerSearchResult>) => Promise<void>;
	selectedYear: number;
	allPlayers: Array<IPlayerSearchResult>
}

export const PlayerSelect = (props: IPlayerSelectProps): JSX.Element => {
	const { teamId, roster, addPlayer, allPlayers } = props;
	
	const [ searchString, setSearchString ] = useState('');
	const [ isFocused, setHasFocus ] = useState(false);
	const [ searchResults, setSearchResults ] = useState(allPlayers)
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	const rosterIds: Array<string> | undefined = roster?.map(player => player.personId);

	const resultsContainerRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		setSearchResults(allPlayers.filter(({firstName, lastName, isActive}) => {
			return isMatchingSearchString(firstName, lastName) && isActive !== false
		}));
		setSelectedIndex(0);
	}, [searchString])

	useEffect(() => {
		setSelectedIndex(0);
	}, [isFocused])

	const handleChange = ({target}: ChangeEvent<{value: string}>) => {
		const { value } = target;
		value.length > 0 && setHasFocus(true);
		setSearchString(value);
	}

	const handleClick = ({currentTarget}: MouseEvent<HTMLElement>): void => {
		const { personId } = currentTarget.dataset;
		addPlayer(personId!, allPlayers);
		setSearchString('');
	}

	const handleKeyDown = ({key}: KeyboardEvent<HTMLDivElement>): void => {
		if (key === 'Enter' && searchResults.length) {
			const { personId } = searchResults[selectedIndex];
			if (!rosterIds?.includes(personId)) {
				addPlayer(personId, allPlayers);
				setSearchString('');
				setHasFocus(false);
			}
		} else if (key === 'ArrowDown') {
			setSelectedIndex(selectedIndex < searchResults.length - 1 ? selectedIndex + 1 : searchResults.length - 1);
			resultsContainerRef.current!.scrollTop = selectedIndex * 40 + 40
		} else if (key === 'ArrowUp') {
			setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0);
			resultsContainerRef.current!.scrollTop = selectedIndex * 40 - 40
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

	return (
		<div>
			<TextField
				type="search"
				variant="outlined"
				label="Draft Player"
				value={searchString}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				autoFocus
				focused
			/>
			<List
				disablePadding={true}
				className='resultsList'
				ref={resultsContainerRef}
			>
				{searchResults.map(({ personId, firstName, lastName }, i) => {
					return (
						<LazyLoad height={40} offsetTop={40 * i}>
							<ListItem
								onClick={handleClick}
								button
								data-person-id={personId}
								data-first-name={firstName}
								data-last-name={lastName}
								selected={selectedIndex === i && !rosterIds?.includes(personId)}
								disabled={rosterIds?.includes(personId) || roster!.length >= maxTeamSize}
								key={`select-${teamId}-${personId}`}
							>
								{firstName} {lastName}
							</ListItem>
						</LazyLoad>
					)
				})}
			</List>
		</div>
	)
}