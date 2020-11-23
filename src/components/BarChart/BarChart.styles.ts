import { makeStyles } from '@material-ui/core/styles';
import { nbaBlue } from '../../Util';

export const chartCardPadding = 6
export const chartCardMargin = 6;

export const useBarChartStyles = makeStyles({
  root: {
    width: `calc(100% - ${chartCardMargin * 2}px - ${chartCardPadding * 2}px)`,
    marginTop: 0,
    marginRight: chartCardMargin,
    marginBottom: chartCardMargin,
    marginLeft: chartCardMargin,
    padding: chartCardPadding,
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
