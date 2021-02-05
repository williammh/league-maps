import {
	invertedCategories,
	allStatCategories
} from './StatCategories';

import {
	IStatDictionary,
	ILeagueStats,
	ITeam,
	IPlayerSearchResult,
	IStatSearchResult,
	Player
} from '../Types/types';

export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const maxTeamSize = 15;

export const nbaRed = '#c8102e';
export const nbaBlue = '#1d428a';

export const generateEmptyStats = (): IStatDictionary => {
	const result: IStatDictionary = {};
	allStatCategories.forEach(category => result[category] = 0);
	return result;
}

export const getAllPlayers = async (year: number = (new Date()).getFullYear()): Promise<Array<IPlayerSearchResult>> => {
	let playerListResponse = await fetch(`https://data.nba.net/prod/v1/${year}/players.json`);
	let playerList = await playerListResponse.json();
	return playerList.league?.standard;
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
	console.log(playerStatsJson.league.standard)
	return playerStatsJson.league.standard ??
	{
		stats: {
			regularSeason: {
				season: [{
					total: generateEmptyStats()
				}]
			}
		}
	};
}

export const getSeasonStats = (player: Player, selectedYear: number | Promise<number>): IStatDictionary => {
	const selectedStats = player.stats.regularSeason.season
		.find((season) => season.seasonYear === selectedYear)?.total;
	return selectedStats ?? generateEmptyStats();
}

export const calcTeamStats = (roster: Array<Player>, selectedYear: number | Promise<number>): IStatDictionary => {
	if (!roster.length) { return generateEmptyStats() };
	const result: IStatDictionary = {};
	allStatCategories.forEach(category => {
		result[category] = roster
			.map(player => getSeasonStats(player, selectedYear)[category])
			.reduce((acc, cur) => acc + cur);
	});
	return result;
}

export const calcLeagueStats = (teamList: Array<ITeam>): ILeagueStats => {
	const result: ILeagueStats = {
		min: {},
		median: {},
		max: {}
	};

	allStatCategories.forEach(category => {
		result.min[category] = calcMin(teamList.map(team => team.stats[category]));
		result.median[category] = calcMedian(teamList.map(team => team.stats[category]));
		result.max[category] = calcMax(teamList.map(team => team.stats[category]));
	})

	return result;
};

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

export const isBestInCategory = (value: number, category: string, best: ILeagueStats): boolean => {
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
export const convertStatStringsToNumbers = (input: any): any => {
	const result = JSON.parse(JSON.stringify(input));
	const { latest, regularSeason } = result;
	const { season } = regularSeason;

	for (const stat in latest) {
		if (typeof latest[stat] === 'string') {
			latest[stat] = latest[stat] !== '-1' ? parseFloat(latest[stat]) : 0
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
	return result;
}

export const addCalculatedStats = (input: IStatDictionary): IStatDictionary => {
	return { 
		...input,
		fgmpg: input.fgm / input.gamesPlayed,
		fgapg: input.fga / input.gamesPlayed,
		tpmpg: input.tpm / input.gamesPlayed,
		tpapg: input.tpa / input.gamesPlayed,
		ftmpg: input.ftm / input.gamesPlayed,
		ftapg: input.fta / input.gamesPlayed,
		pfpg: input.pFouls / input.gamesPlayed
	};
}