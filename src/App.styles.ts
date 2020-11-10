import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from './SharedStyles/SharedStyles';

export const useAppGridStyles = makeStyles({
	root: {
		backgroundColor: '#222222',
    height: '100vh',
		width: '100vw',
		overflow: 'hidden',
		'& .sidebar': {
			height: '100vh'
		},
		...getScrollBarStyles('.sidebar-scrollbar', 8),
		// '& .visualizations-container' : {
		// 	height: '90vh'
		// },
		...getScrollBarStyles('.visualizations-container', 8),
	}
})