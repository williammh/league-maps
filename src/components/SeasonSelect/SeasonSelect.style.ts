import { makeStyles } from '@material-ui/core'
import { nbaRed, nbaBlue } from '../../Util'

export const useSeasonSelectStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    borderRadius: 4,
    '& .MuiFormLabel-root.Mui-focused': {
      color: nbaRed,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline' : {
      borderColor: nbaRed
    }
  }
})