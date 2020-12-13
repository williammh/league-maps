import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from './SharedStyles/SharedStyles';
import { nbaBlue } from './Util/Util';

export const useAppGridStyles = makeStyles({
	root: {
		cursor: 'default',
		backgroundColor: 'lightgray',
		...getScrollBarStyles('.sidebar-scrollbar', 8),
		...getScrollBarStyles('.visualizations-container', 8),
		'& .top-bar' : {
			height: '10vh',
			padding: 6
		},
		'& h1' : {
			color: nbaBlue,
			margin: '0px 12px 0px 0px'
		}
	}
})