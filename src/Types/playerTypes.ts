export interface IPlayerSearchResult {
	firstName: string;
	lastName: string;
	personId: string;
	isActive?: boolean;
}

export interface IStatSearchResult {
	stats: {
		latest: { [key: string]: string };
		regularSeason: {
			season: Array<{
				total: { [key: string ]: string};
				seasonYear: number
			}>
		}
	}
}

export type Player = IPlayerSearchResult & IStatSearchResult;