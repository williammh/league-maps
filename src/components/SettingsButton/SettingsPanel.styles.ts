import { makeStyles } from '@material-ui/core';
import { nbaRed, nbaBlue } from '../../Util/Util'
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles'

export const useSettingsPanelStyles = makeStyles({
  popper: {
    ...getScrollBarStyles('.MuiTooltip-tooltip'),
  },
  tooltip: {
    overflowY: 'scroll',
    color: '#000',
    maxHeight: '50vh',
    backgroundColor: 'white',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  }
})