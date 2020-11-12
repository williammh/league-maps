import { makeStyles } from '@material-ui/core/styles';

const padding = 30;
const margin = 6;

export const useBarChartStyles = makeStyles({
  root: {
    width: `calc(100% - ${margin * 2}px - ${padding * 2}px)`,
    margin,
    padding,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h4': {
      textTransform: 'uppercase',
      margin: 0
    },
    '& svg' : {
      overflow: 'visible'
    },
    '& rect': {
      maxHeight: '40px',
      fill: 'lightgray',
      transitionDuration: '1s'
    },
    '& rect.best': {
      fill: 'lime'
    }
  }
})
