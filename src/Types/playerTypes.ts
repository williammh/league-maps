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