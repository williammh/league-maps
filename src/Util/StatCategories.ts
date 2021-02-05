// stat categories provided by data.nba.net
export const providedCategories: Array<string> = [
	'ppg',
	'rpg',
	'apg', 
	'mpg', 
	'topg', 
	'spg', 
	'bpg',
	'tpp', 
	'ftp', 
	'fgp', 
	'assists',
	'blocks',
	'steals',
	'turnovers',
	'offReb',
	'defReb',
	'totReb',
	'fgm',
	'fga',
	'tpm',
	'tpa',
	'ftm',
	'fta',
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

// categories not provided by data.nba.net
export const calculatedCategories = [
	'fgmpg',
	'fgapg',
	'tpmpg',
	'tpapg',
	'ftmpg',
	'ftapg',
	'pfpg',
	'scl' /** team stat only */
];

export const percentageCategories = [
	'tpp',
	'ftp',
	'fgp'
];

export const invertedCategories = [
	'topg',
	'turnovers',
	'pFouls',
	'pfpg',
	'fga',
	'tpa',
	'fta',
	'fgapg',
	'tpapg',
	'ftapg',
];

export const excludedCategories = [
	'seasonStageId',
	'seasonYear',
];

export const defaultCategories = [
	'scl',
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

export const allStatCategories = [...defaultCategories, ...providedCategories,...calculatedCategories]
/** remove duplicates and excluded categories */
.filter((category, index, array) => array.indexOf(category) === index && !excludedCategories.includes(category));

export const fullStatNameDictionary: { [key: string]: string } = {
	ppg: 'points per game',
	rpg: 'rebounds per game',
	apg: 'assists per game',
	mpg: 'minutes per game',
	topg: 'turnovers per game',
	spg: 'steals per game',
	bpg: 'blocks per game',
	tpp: 'three point percentage',
	ftp: 'free throw percentage',
	fgp: 'field goal percentage',
	offReb: 'offensive rebounds',
	defReb: 'defensive rebounds',
	totReb: 'total rebounds',
	fgm: 'field goals made',
	fga: 'field goals attempted',
	tpm: 'three points made',
	tpa: 'three points attempted',
	ftm: 'free throws made',
	fta: 'free throws attempted',
	pFouls: 'personal fouls',
	min: 'minutes',
	dd2: 'double doubles',
	td3: 'triple doubles',
	fgmpg: 'field goals made per game',
	fgapg: 'field goals attempted per game',
	tpmpg: 'three points made per game',
	tpapg: 'three points attempted per game',
	ftmpg: 'free throws made per game',
	ftapg: 'free throws attempted per game',
	pfpg: 'personal fouls per game',
	scl: 'stat category leads'
}