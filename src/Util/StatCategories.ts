export const providedCategories: Array<string> = [
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

export const percentageCategories = [
	/** three point percentage */
	'tpp',
	/** free throw percentage */
	'ftp',
	/** field goal percentage */
	'fgp'
];

export const invertedCategories = [
	'topg',
	'turnovers',
	'pFouls',
	'pfpg',
];

export const excludedCategories = [
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