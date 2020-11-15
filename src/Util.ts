import { ITeamTotalStats, IStatCategory, IRelativeStats, IRelativeStatsV2, ITeam } from './Types/teamTypes';
import { IPlayerSearchResult, IStatSearchResult, Player } from './Types/playerTypes'
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

export const getCurrentNbaYear = async () => {
    let currentYear = (new Date()).getFullYear();
    let playerListResponse;
    while(playerListResponse === undefined || !playerListResponse.ok) {
        playerListResponse = await fetch(`https://data.nba.net/prod/v1/${currentYear}/players.json`);
        if(!playerListResponse.ok) {
            currentYear--;
        }
    }
    return currentYear;
}

export const getAllPlayers = async (): Promise<Array<IPlayerSearchResult>> => {
    let year = await getCurrentNbaYear();
    let playerListResponse = await fetch(`https://data.nba.net/prod/v1/${year}/players.json`);
	let playerList = await playerListResponse.json();
    return playerList.league.standard;
}

export const getPlayerStats = async (personId: string, year: number = 2019): Promise<IStatSearchResult> => {
    const playerStatsResponse = await fetch(`https://data.nba.net/prod/v1/${year}/players/${personId}_profile.json`)
    const playerStatsJson = await playerStatsResponse.json();
    return playerStatsJson.league.standard;
}

export const calcTotalStats = (roster: Array<Player>, season?: number): ITeamTotalStats => {
    const result: ITeamTotalStats = {};
    statCategories
        .filter(category => !excludeCategories.includes(category))
        .forEach(category => result[category] = 0);
    roster.forEach((player: Player) => {
        const { total: stats } = player.stats.regularSeason.season[0];
        for(let category in result) {
            result[category] += parseFloat(stats[category]) >= 0 ? parseFloat(stats[category]) : 0;
        }
    })
    return result;
}

export const calcTotalStatsArray = (statsObject: ITeamTotalStats, settings?: ISettings): Array<IStatCategory> => {
	const result: Array<IStatCategory> = [];
	for (let key in statsObject) {
		if(settings && !settings.visibleStats[key]) { continue }
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

    console.log(allTotalStats);
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
        teamList.forEach(team => result[category].push(team.totalStats[category]))
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

export const getDefaultSettings = (): ISettings => {
	const result: ISettings = { visibleStats: {} };
	const allCategories = [
		...defaultCategories,
		...statCategories,
		...calculatedCategories,
	];
	allCategories
		/** remove duplicates, seasonStageId, and seasonYear */ 
		.filter((category, index) => (
			allCategories.indexOf(category) === index && !excludeCategories.includes(category)
		))
		.forEach(category => (
			result.visibleStats[category] = defaultCategories.includes(category)
		))
	return result;
}