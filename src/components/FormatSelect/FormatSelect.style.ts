import { makeStyles } from '@material-ui/core';
import { nbaRed, nbaBlue } from '../../Util/Util';

export const useFormatSelectStyles = makeStyles({
  root: {
    marginRight: 6,
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