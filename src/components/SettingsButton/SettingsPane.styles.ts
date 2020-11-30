import { makeStyles } from '@material-ui/core';
import { nbaRed, nbaBlue } from '../../Util/Util'
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles'

export const useSettingsPanelStyles = makeStyles({
  root: {
    '& .MuiCheckbox-root.Mui-checked': {
      color: nbaRed
    },
    ...getScrollBarStyles('.stat-select-container', 8)
  }
})