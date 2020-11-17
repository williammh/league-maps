import { makeStyles } from '@material-ui/core';
import { nbaRed, nbaBlue } from '../../Util'

export const useSettingsPanelStyles = makeStyles({
  root: {
    '& .MuiCheckbox-root.Mui-checked': {
      color: nbaRed
    }
  }
})