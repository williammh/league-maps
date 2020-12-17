import React, {
	useState,
	ChangeEvent,
	MouseEvent,
	KeyboardEvent,
	useEffect,
	useRef
} from 'react';
import { List, ListItem, TextField} from '@material-ui/core'
import { Player, IPlayerSearchResult } from '../../Types/types';
import { SignalCellularNull } from '@material-ui/icons';
import LazyLoad from 'react-lazy-load';

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
	const [ searchResults, setSearchResults ] = useState(allPlayers);
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	const rosterIds: Array<string> | undefined = roster?.map(player => player.personId);

	const resultsContainerRef = useRef<HTMLUListElement>(null);

	const lazyLoadHeight = 40;

	useEffect(() => {
		setSearchResults(allPlayers.filter(({ firstName, lastName, isActive }) => isMatching(firstName, lastName) && isActive));
		setSelectedIndex(0);
	}, [searchString])

	const handleChange = ({target}: ChangeEvent<{value: string}>) => {
		const { value } = target;
		setSearchString(value);
	}

	const handleClick = ({currentTarget}: MouseEvent<HTMLElement>): void => {
		const { personId } = currentTarget.dataset;
		addPlayer(personId!, allPlayers);
		setSearchString('');
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		event.stopPropagation();
		const { key } = event;
		if (key === 'Enter' && searchResults.length) {
			const { personId } = searchResults[selectedIndex];
			if (!rosterIds?.includes(personId)) {
				addPlayer(personId, allPlayers);
				setSearchString('');
			}
		} else if (key === 'ArrowDown') {
			setSelectedIndex(selectedIndex < searchResults.length - 1 ? selectedIndex + 1 : searchResults.length - 1);
			resultsContainerRef.current!.scrollTop = selectedIndex * lazyLoadHeight + lazyLoadHeight
		} else if (key === 'ArrowUp') {
			setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0);
			resultsContainerRef.current!.scrollTop = selectedIndex * lazyLoadHeight - lazyLoadHeight
		}
	}

	const isMatching = (firstName: string, lastName: string): boolean => {
		const searchStringLower = searchString.toLowerCase();
		const firstNameLower = firstName.toLowerCase();
		const lastNameLower = lastName.toLowerCase();
		return (
			firstNameLower.startsWith(searchStringLower) ||
			lastNameLower.startsWith(searchStringLower) ||
			`${firstNameLower} ${lastNameLower}`.startsWith(searchStringLower)
		);
	};

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
				ref={resultsContainerRef}
			>
				{searchResults.map(({ personId, firstName, lastName }, i) => (
					<LazyLoad
						key={`lazyload-${teamId}-${personId}`}
						height={lazyLoadHeight}
						offsetTop={lazyLoadHeight * i}
						/* way more performant than CSS nth-child selector */
						className={i % 2 ? 'odd' : 'even'}
					>
						<ListItem
							button
							onClick={handleClick}
							data-person-id={personId}
							selected={selectedIndex === i && !rosterIds?.includes(personId)}
							disabled={rosterIds?.includes(personId)}
						>
							{firstName} {lastName}
						</ListItem>
					</LazyLoad>
				))}
			</List>
		</div>
	)
}