import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from './SharedStyles/SharedStyles';
import { nbaBlue } from './Util';

export const useAppGridStyles = makeStyles({
	root: {
		backgroundColor: nbaBlue,
		...getScrollBarStyles('.sidebar-scrollbar', 8),
		...getScrollBarStyles('.visualizations-container', 8),
	}
})