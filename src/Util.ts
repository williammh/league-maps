import {
	ITeamStats,
	IStatCategory,
	IRelativeStats,
	IRelativeStatsV2,
	ITeam,
	IPlayerSearchResult,
	IStatSearchResult,
	Player
} from './Types/types';

import { ISettings, IVisibleStats } from './Contexts/SettingsContext';

export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const maxTeamSize = 15;

export const statCategories: Array<string> = [
	/** points per game */
	'ppg',
	/** rebounds per game */
	'rpg',
	/** assists per game */
	'apg', 
	/** minutes per game */
	'mpg', 
	/** turnovers per game */
	'topg', 
	/** steals per game */
	'spg', 
	/** blocks per game */
	'bpg',
		/** three point percentage */
	'tpp', 
	/** free throw percentage */
	'ftp', 
	/** field goal percentage */
	'fgp', 

	'assists',

	'blocks',

	'steals',

	'turnovers',

	'offReb',

	'defReb',

	'totReb',

	/** field goals made */
	'fgm',
	/** field goals attempted */
	'fga',
	/** three pointers made */ 
	'tpm',
	/** three pointers attemped */
	'tpa',
	/** free throws made */
	'ftm',
	/** free throws attempted */
	'fta',
	/** personal fouls */
	'pFouls',

	'points',

	'gamesPlayed',

	'gamesStarted',

	'plusMinus',

	'min',

	'dd2',

	'td3',

	'seasonYear',

	'seasonStageId'
];

export const percentageCategories = [
	/** three point percentage */
	'tpp',
	/** free throw percentage */
	'ftp',
	/** field goal percentage */
	'fgp'
];

export const calculatedCategories = [
	/** field goals made per game */
	'fgmpg',
	/** field goals attempted per game */
	'fgapg',
	/** three pointers made per game */
	'tpmpg',
	/** three pointers attempted per game */
	'tpapg',
	/** free throws made per game */
	'ftmpg',
	/** free throws attempted per game */
	'ftapg',
	/** personal fouls per game */
	'pfpg'
];

export const invertedCategories = [
	'topg',
	'turnovers',
	'pFouls',
	'pfpg',
];

export const excludeCategories = [
	'seasonStageId',
	'seasonYear',
];

export const defaultCategories = [
	'ppg',
	'rpg',
	'apg',
	'topg',
	'bpg',
	'spg',
	'fgm',
	'tpm',
	'ftm'
];

export const nbaRed = '#c8102e';
export const nbaBlue = '#1d428a';

export const getAllPlayers = async (year: number = (new Date()).getFullYear()): Promise<Array<IPlayerSearchResult>> => {
	let playerListResponse = await fetch(`https://data.nba.net/prod/v1/${year}/players.json`);
	let playerList = await playerListResponse.json();
	console.log(playerList.league.standard);
	return playerList.league.standard;
}

export const getPlayerStats = async (personId: string): Promise<IStatSearchResult | any> => {
	let currentYear = (new Date()).getFullYear();
	let playerStatsResponse;

	while (!playerStatsResponse || !playerStatsResponse.ok) {
		playerStatsResponse = await fetch(`https://data.nba.net/prod/v1/${currentYear}/players/${personId}_profile.json`)
		if (!playerStatsResponse.ok) {
			currentYear--;
		}
	}
	
	const playerStatsJson = await playerStatsResponse.json();
	return playerStatsJson.league?.standard ??
	{
		stats: {
			regularSeason: {
				season: [{
					total: { min: 0 }
				}]
			}
		}
	};
}

export const calcTotalStats = (roster: Array<Player>, selectedYear: number = 2019): ITeamStats => {
	const result: ITeamStats = {};
	statCategories
		.filter(category => !excludeCategories.includes(category))
		.forEach(category => result[category] = 0);
	roster.forEach((player): void => {
		const selectedSeasonStats = getSeasonStats(player, selectedYear)
		for(let category in result) {
			result[category] += selectedSeasonStats![category] as number >= 0 ? selectedSeasonStats![category] as number : 0;
		}
	})
	return result;
}

export const calcTotalStatsArray = (statsObject: ITeamStats, visibleStats?: any): Array<IStatCategory> => {
	const result: Array<IStatCategory> = [];
	for (let key in statsObject) {
		if(visibleStats && !visibleStats[key]) { continue }
		result.push({label: key, total: statsObject[key]})
	}
	return result;
}

export const calcRelativeStats = (teamList: Array<ITeam>, categories: Array<string> = statCategories): IRelativeStats => {
	const result: IRelativeStats = {};
	const allTotalStats = calcAllTotalStats(teamList, categories);
	
	categories.forEach(category => {
		result[category] = {
			min: 0,
			median: 0,
			max: 0
		}
	});
	
	for(let category in allTotalStats) {
		result[category].min = calcMin(allTotalStats[category])
		result[category].max = calcMax(allTotalStats[category])
		result[category].median = calcMedian(allTotalStats[category])
	}
	return result;
}

export const calcRelativeStatsV2 = (teamList: Array<ITeam>, categories: Array<string> = statCategories): IRelativeStatsV2 => {
	const result: IRelativeStatsV2 = {
		min: {},
		median: {},
		max: {}
	};
	const allTotalStats: {[key: string]: Array<number>} = calcAllTotalStats(teamList, categories);

	for(let category in allTotalStats) {
		result.min[category] = calcMin(allTotalStats[category])
		result.median[category] = calcMedian(allTotalStats[category])
		result.max[category] = calcMax(allTotalStats[category])
	}

	return result;
};

export const calcAllTotalStats = (teamList: Array<ITeam>, categories: Array<string>): {[key: string]: Array<number>} => {
	const result: {[key: string]: Array<number>} = {};

	categories.forEach(category => {
		result[category] = [];
	});

	for(let category in result) {
		teamList.forEach(team => result[category].push(team.teamStats[category]))
	}

	return result;
}

export const calcMin = (arr: Array<number>): number => {
  return arr.reduce((acc, cur) => acc < cur ? acc : cur);
}

export const calcMax = (arr: Array<number>): number => {
  return arr.reduce((acc, cur) =>  acc > cur ? acc : cur);
}

export const calcMedian = (arr: Array<number>): number => {
	arr.sort((a, b) => a - b);
	return (
		arr.length % 2 ?
		arr[(arr.length - 1) / 2] :
		calcMean([arr[arr.length / 2], arr[(arr.length / 2) - 1]])
	);
}

export const calcMean = (arr: Array<number>): number => {
  return arr.reduce((acc, cur) => acc + cur) / arr.length ;
}

export const isBestInCategory = (value: number, category: string, best: IRelativeStatsV2): boolean => {
	if (invertedCategories.includes(category)) {
		return value === best.min[category];
	} else {
		return value === best.max[category];
	}
}

export const getSeasonStats = (player: Player, selectedYear: number = 2019): {[key: string]: number} => {
	const selectedStats = player.stats.regularSeason.season
		.find((season) => season.seasonYear === selectedYear)?.total;
	return selectedStats ?? { min: 0 };
}

export const convertStatsToNumbers = (input: any): IStatSearchResult => {
	const { latest, regularSeason } = input
	const result = {}
	for (const stat in latest) {
		if (typeof latest[stat] === 'string') {
			latest[stat] = latest[stat] !== '-1' ? parseFloat(latest[stat] as string) : 0
		} 
	}

	const { season } = regularSeason;
	for (const year in season) {
		for (const category in season[year].total) {
			const stat = season[year].total[category];
			if (typeof stat === 'string') {
				season[year].total[category] = stat !== '-1' ? parseFloat(stat) : 0
			}
		}
	}

	return result as any;
}