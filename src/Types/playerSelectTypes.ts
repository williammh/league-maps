import { IPlayerSearchResult } from "./playerTypes";

export interface IPlayerSelectProps {
	teamId?: number;
	fetchPlayer?: (event: React.ChangeEvent<{name?: string; value: unknown}>) => Promise<void>;
	playerList?: Array<IPlayerSearchResult>;
}