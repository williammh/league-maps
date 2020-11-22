import { makeStyles } from '@material-ui/core/styles';
import { nbaBlue } from '../../Util';

const padding = 6
const margin = 6;

export const useBarChartStyles = makeStyles({
  root: {
    width: `calc(100% - ${margin * 2}px - ${padding * 2}px)`,
    marginTop: 0,
    marginRight: margin,
    marginBottom: margin,
    marginLeft: margin,
    padding,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h4': {
      textTransform: 'uppercase',
      margin: 0
    },
    '& svg' : {
      overflow: 'visible',
      marginBottom: 20,
      backgroundColor: '#dddddd'
    },
    '& rect:nth-child(odd)': {
      fill: '#444444',
    },
    '& rect:nth-child(even)': {
      fill: '#666666',
    },
    '& rect:hover': {
      opacity: 1 
    },
    '& .player-name-label': {
      opacity: .25,
      fill: '#fff'
    },
    '& .player-name-label:hover': {
      opacity: 1,
      cursor: 'default'
    },
    '& .best rect:nth-child(odd)': {
      fill: nbaBlue
    },
    '& .best rect:nth-child(even)' : {
      fill: '#3560b3'
    }
  }
})
