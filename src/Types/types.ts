export interface ITeam {
	id: number;
	name?: string;
	roster: Array<Player>;
	color?: string;
	teamStats: IStatDictionary;
	allPlayers: Array<IPlayerSearchResult>
}

export interface IStatDictionary {
	[category: string]: number;
}

export interface IRelativeStatsV2 {
	min: IStatDictionary;
	median: IStatDictionary;
	max: IStatDictionary;
}

export interface IPlayerSearchResult {
	firstName: string;
	lastName: string;
	personId: string;
	isActive?: boolean;
}

export interface IStatSearchResult {
	stats: {
		latest: IStatDictionary;
		regularSeason: {
			season: Array<{seasonYear: number; total: IStatDictionary}>
		}
	}
}

export type Player = IPlayerSearchResult & IStatSearchResult;