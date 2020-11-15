import { Player } from './playerTypes';

export interface ITeam {
    id: number;
    name?: string;
    roster: Array<Player>;
    color?: string;
    totalStats: ITeamTotalStats;
}

export interface ITeamTotalStats {
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