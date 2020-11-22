export interface ITeam {
    id: number;
    name?: string;
    roster: Array<Player>;
    color?: string;
    teamStats: ITeamStats;
    allPlayers: Array<IPlayerSearchResult>
}

export interface ITeamStats {
    [key: string]: number;
}

export interface IStatCategory {
    label: string;
    total: number;
}

export interface IRelativeStats {
    [key: string]: {
        min: number,
        median: number,
        max: number
    }
}

export interface IRelativeStatsV2 {
    min: {
        [category: string]: number
    };
    median:  {
        [category: string]: number
    };
    max:  {
        [category: string]: number
    };
}

export interface IPlayerSearchResult {
	firstName: string;
	lastName: string;
	personId: string;
	isActive?: boolean;
}

export interface IStatSearchResult {
	stats: {
		latest: { 
			[key: string]: number,
		};
		regularSeason: {
			season: Array<{
				total: { [key: string ]: number};
				seasonYear: number
			}>
		}
	}
}

export type Player = IPlayerSearchResult & IStatSearchResult;