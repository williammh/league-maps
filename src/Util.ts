import {
	IStatDictionary,
	IStat,
	IRelativeStatsV2,
	ITeam,
	IPlayerSearchResult,
	IStatSearchResult,
	Player
} from './Types/types';

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
	'fgmpg',
	'tpmpg',
	'ftmpg'
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
	return playerStatsJson.league.standard ??
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

export const getSeasonStats = (player: Player, selectedYear: number = 2019): IStatDictionary => {
	const selectedStats = player.stats.regularSeason.season
		.find((season) => season.seasonYear === selectedYear)?.total;
	return selectedStats ?? { min: 0 };
}

export const calcTeamStats = (roster: Array<Player>, selectedYear: number = 2019): IStatDictionary => {
	const result: IStatDictionary = {};

	const allStatCategories = [...statCategories, ...calculatedCategories];

	allStatCategories
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

export const calcStatsArray = (statsObject: IStatDictionary): Array<IStat> => {
	const result: Array<IStat> = [];
	for (let category in statsObject) {
		result.push({category, value: statsObject[category]})
	}
	return result;
}

export const calcRelativeStatsV2 = (teamList: Array<ITeam>): IRelativeStatsV2 => {
	const result: IRelativeStatsV2 = {
		min: {},
		median: {},
		max: {}
	};
	const allTotalStats: {[key: string]: Array<number>} = calcAllTotalStats(teamList);

	for(let category in allTotalStats) {
		result.min[category] = calcMin(allTotalStats[category])
		result.median[category] = calcMedian(allTotalStats[category])
		result.max[category] = calcMax(allTotalStats[category])
	}

	return result;
};

export const calcAllTotalStats = (teamList: Array<ITeam>): {[key: string]: Array<number>} => {
	const result: {[key: string]: Array<number>} = {};

	const categories = Object.keys(teamList[0].teamStats)

	console.log(categories)

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
	if (value === 0 && !invertedCategories.includes(category)) {
		return false
	}
	else if (invertedCategories.includes(category)) {
		return value === best.min[category];
	} else {
		return value === best.max[category];
	}
}

/**
 * For whatever reason, data.nba.net provides statistics as strings instead of numbers.
 * This function takes a player's stat object, and returns a new object with all
 * strings converted into numbers. 
 */ 
export const convertStatStringsToNumbers = ({ latest, regularSeason }: any): any => {
	const latestCopy = { ...latest };
	const regularSeasonCopy = { ...regularSeason };
	const { season } = regularSeasonCopy;

	for (const stat in latestCopy) {
		if (typeof latestCopy[stat] === 'string') {
			latestCopy[stat] = latestCopy[stat] !== '-1' ? parseFloat(latestCopy[stat] as string) : 0
		} 
	}
	
	for (const year in season) {
		for (const category in season[year].total) {
			const stat = season[year].total[category];
			if (typeof stat === 'string') {
				season[year].total[category] = stat !== '-1' ? parseFloat(stat) : 0
			}
		}
	}

	const result = { latest: latestCopy, regularSeason: regularSeasonCopy };
	return result;
}

export const addCalculatedStats = ({latest, regularSeason}: any): any => {

	latest.fgmpg = latest.fgm / latest.gamesPlayed;
	latest.fgapg = latest.fga / latest.gamesPlayed;
	latest.tpmpg = latest.tpm / latest.gamesPlayed;
	latest.tpapg = latest.tpa / latest.gamesPlayed;
	latest.ftmpg = latest.ftm / latest.gamesPlayed;
	latest.ftapg = latest.fta / latest.gamesPlayed;
	latest.pfpg = latest.pFouls / latest.gamesPlayed;

	const { season } = regularSeason;

	for (const year in season) {
		season[year].total.fgmpg = season[year].total.fgm / season[year].total.gamesPlayed;
		season[year].total.fgapg = season[year].total.fga / season[year].total.gamesPlayed;
		season[year].total.tpmpg = season[year].total.tpm / season[year].total.gamesPlayed;
		season[year].total.tpapg = season[year].total.tpa / season[year].total.gamesPlayed;
		season[year].total.ftmpg = season[year].total.ftm / season[year].total.gamesPlayed;
		season[year].total.ftapg = season[year].total.fta / season[year].total.gamesPlayed;
		season[year].total.pfpg = season[year].total.pFouls / season[year].total.gamesPlayed;
	}

	const result = { latest, regularSeason };
	return result;
}