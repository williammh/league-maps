import { IPlayerSearchResult, Player } from './playerTypes';

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