import { makeStyles } from '@material-ui/core/styles';
import { nbaBlue } from '../../Util';

const padding = 6
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
      overflow: 'visible',
      marginBottom: 20
    },
    '& rect:nth-child(odd)': {
      fill: 'lightgray',
    },
    '& rect:nth-child(even)': {
      fill: '#bbbbbb',
    },
    '& rect:hover': {
      opacity: 1 
    },
    '& .player-name-label': {
      opacity: .25
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
    },
    '& .best .player-name-label' : {
      fill: 'white'
    }
  }
})
