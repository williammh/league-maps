import { makeStyles } from '@material-ui/core/styles';

export const chartCardPadding = 6
export const chartCardMargin = 6;

export const useBarChartStyles = makeStyles({
  root: {
    height: `calc(22.5vh - ${chartCardPadding * 2}px - ${chartCardMargin}px)`,
    width: `calc(100% - ${chartCardPadding * 2}px - ${chartCardMargin * 2}px)`,
    marginTop: 0,
    marginRight: chartCardMargin,
    marginBottom: chartCardMargin,
    marginLeft: chartCardMargin,
    padding: chartCardPadding,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textTransform: 'uppercase',
      margin: 0
    },
    '& svg' : {
      overflow: 'visible',
      marginBottom: 20,
      backgroundColor: '#dddddd'
    },
    '& rect' : {
      outline: '1px solid #dddddd'
    },
    '& rect:nth-child(odd)': {
      // fill: '#444444',
    },
    '& rect:nth-child(even)': {
      // fill: '#666666',
    },
    '& rect:hover': {
      opacity: 1 
    },
    '& .player-name-label': {
      fill: '#fff'
    },
    '& svg div': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'right',
      height: '100%',
      padding: '0px 6px',
    }
  }
})
