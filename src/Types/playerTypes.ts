export interface IPlayerSearchResult {
	firstName: string;
	lastName: string;
	personId: string;
	isActive?: boolean;
}

export interface IStatSearchResult {
	latest: { [key: string]: string };
}

export interface IPlayer extends IPlayerSearchResult {
	stats: IStatSearchResult;
}
