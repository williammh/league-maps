import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from './SharedStyles/SharedStyles';

export const useAppGridStyles = makeStyles({
	root: {
		backgroundColor: '#222222',
		...getScrollBarStyles('.sidebar-scrollbar', 8),
		// '& .visualizations-container' : {
		// 	height: '90vh'
		// },
		...getScrollBarStyles('.visualizations-container', 8),
	}
})