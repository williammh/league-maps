export interface ITeam {
	id: number;
	name?: string;
	roster: Array<Player>;
	color?: string;
	stats: IStatDictionary;
	categoryLeads?: number;
}

export interface IStatDictionary {
	[category: string]: number;
}

export interface ILeagueStats {
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

export interface IFantasyPoints {
	fantasyPoints: number;
}

export type Player = IPlayerSearchResult & IStatSearchResult;